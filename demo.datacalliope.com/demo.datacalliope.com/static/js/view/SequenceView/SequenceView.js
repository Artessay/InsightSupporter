import React, { Component } from 'react';
import { Slider, Layout } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import uuidv4 from 'uuid/v4';
import EventView from './EventView';
import AddFact from './AddFact';
import GenerationPanel from './GenerationPanel';
import UploadDataModal from './UploadDataModal';
import uploadData from '../../network/uploadData';
import * as d3 from 'd3';
import './sequenceview.css';

const { Sider, Content } = Layout;

const getListStyle = isDraggingOver => ({
    // background: isDraggingOver ? 'lightblue' : 'lightgrey',
    display: 'flex',
    overflow: 'auto',
});

export default class SequenceView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            confirmLoading: false,
        }
    }

    clickUploadData = () => {
        // showModal
        this.setState({
            visible: true,
        });
    }

    onDragStart = (result) => {
        //this.props.selectFact(result.source.index)
    }

    onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }
        this.props.orderFacts(result.source.index, result.destination.index);
    }

    process = (schema, fileURL) => {
        return new Promise((resolve, reject) => {
            let numericalFields = []
            let numerical = schema.filter(d => d.type === "numerical")
            numericalFields = numerical.map(d => d.field)
            d3.csv(fileURL)
                .then(function (data) {
                    data.forEach((d, i) => {
                        for (let key in d) {
                            if (numericalFields.indexOf(key) !== -1) {
                                d[key] = parseFloat(d[key])
                            }
                        }
                    })
                    resolve(data);
                }).catch(function (error) {
                    reject(error);
                })
        });
    }

    upload = async (file) => {
        // upload data to backend
        let formData = new FormData();
        formData.append("file", file);
        const response = await uploadData(formData)
        let fileName = response.data.file_name
        let schema = response.data.schema.fields
        if (fileName) {
            this.setState({
                confirmLoading: false,
                visible: false
            });
        }
        // process data according to schema
        const fileURL = URL.createObjectURL(file);
        this.process(schema, fileURL)
            .then((data) => {
                this.props.uploadData(fileName, schema, data)
            }).catch((reason) => {
                console.log(reason);
            });
    }

    handleOk = (tabValue, file) => {
        // const { storyParameter } = this.props;
        if (tabValue === "CHANGE_DATA") {
            this.setState({
                visible: false,
            });
            // CHANGE_DATA AND GENERATE_STORY
            this.props.changeData(file);

        } else {
            this.setState({
                confirmLoading: true,
            });
            // UPLOAD_DATA AND GENERATE_STORY
            this.upload(file)
        }
    };

    handleCancel = () => {
        this.setState({
            visible: false,
            confirmLoading: false,
        });
    };

    onChangeAggregation = (value) => {
        this.props.setAggregationLevel(value / 100);
    }

    render() {
        const { facts, relations, aggregationLevel } = this.props;
        let isDragDisabled = aggregationLevel > 0;
        let events = facts.map(function (x, i) {
            return {
                id: uuidv4(),
                index: i,
                fact: x,
                relation: relations[i]
            }
        });
        events = events.filter(e => {
            if (!e.fact.aggregated) {
                return true
            } else {
                return e.fact.aggregated && e.fact.aggregatedFact
            }
        })
        return (
            <div id='sequenceview' className='pane'>
                <div className='header'>
                    <Layout style={{ backgroundColor: 'transparent' }}>
                        <Sider width={230} style={{ backgroundColor: 'transparent' }}>Story</Sider>
                        <Layout style={{ backgroundColor: 'transparent' }}>
                            <Sider width={110} style={{ backgroundColor: 'transparent' }}>Aggregation:</Sider>
                            <Content>
                                <div style={{ width: 200, marginTop: -8, marginLeft: 8 }}>
                                    <Slider defaultValue={0} onChange={this.onChangeAggregation} tooltipVisible={false} />
                                </div>
                            </Content>
                        </Layout>
                    </Layout>

                </div>
                <div id="storyline">
                    <GenerationPanel clickUploadData={this.clickUploadData} {...this.props} />
                    <UploadDataModal
                        visible={this.state.visible}
                        confirmLoading={this.state.confirmLoading}
                        handleOk={this.handleOk}
                        handleCancel={this.handleCancel}
                    />
                    <DragDropContext onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>
                        <Droppable droppableId="storyline" direction="horizontal">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    style={getListStyle(snapshot.isDraggingOver)}
                                >
                                    {events.map(function (event, index) {
                                        if (event.fact) {
                                            return <Draggable key={index} index={index} draggableId={event.id} isDragDisabled={isDragDisabled}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <EventView key={event.id} index={event.index} uuid={event.id} fact={event.fact} isSelected={this.props.selectedFactIndex === event.index} {...this.props} />
                                                    </div>
                                                )}
                                            </Draggable>
                                        }
                                    }.bind(this))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                    <AddFact {...this.props}/>
                </div>
            </div>
        )
    }
}
