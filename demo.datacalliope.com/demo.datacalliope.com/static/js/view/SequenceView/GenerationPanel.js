import React, { Component } from 'react';
import { Button, Slider, Row, Col, Tabs, Checkbox, message } from 'antd';
import Color from '../../constant/Color';
import Fact from '../../model/fact';
import generateStory from '../../network/generateStory';
import Draggable from 'react-draggable';
import './generation-panel.css';
import { getFactChartType } from '../../tool/fact2vis';

const { TabPane } = Tabs;
const areaRadius = 66;
const pointRadius = 15;

// const methodOptions = [
//     { label: 'yes', value: 'sig' },
//     { label: 'no', value: 'nosig' },
// ];

function lengthformatter(value) {
    return `max length: ${value} facts`;
}

function infoformatter(value) {
    return `information quantity: ${value} bits`;
}

// function dataformatter(value) {
//     return `${value}%`;
// }

function timeformatter(value) {
    return `${value} seconds per iteration`;
}

export default class GenerationPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isGenerating: false,
            cannotChangeData: false,
            x: areaRadius,
            y: areaRadius,
            logicality: 0.33,
            diversity: 0.33,
            integrity: 0.33,
        }
    }

    clickUpload = () => {
        this.props.clickUploadData();
    }

    onChangeMethod = (e) => {
        // const newMethod = e.target.value;
        // this.props.changeMethod(newMethod);
        const checked = e.target.checked;
        if (checked) {
            this.props.changeMethod('sig');
        } else {
            this.props.changeMethod('nosig');
        }
    }

    changeMaxStoryLength = (value) => {
        const { storyParameter } = this.props;
        this.props.setStoryParameter(value, storyParameter.information, storyParameter.chartDiversity, storyParameter.timeLimit);
    }

    changeInformation = (value) => {
        const { storyParameter } = this.props;
        this.props.setStoryParameter(storyParameter.maxStoryLength, value, storyParameter.chartDiversity, storyParameter.timeLimit);
    }

    changeChartDiversity = (value) => {
        const { storyParameter } = this.props;
        this.props.setStoryParameter(storyParameter.maxStoryLength, storyParameter.information, value / 100, storyParameter.timeLimit);
    }

    changeTimeLimit = (value) => {
        const { storyParameter } = this.props;
        this.props.setStoryParameter(storyParameter.maxStoryLength, storyParameter.information, storyParameter.chartDiversity, value * 1000);
    }

    onStop = (e, ui) => {
        let { logicality, diversity, integrity } = this.state;
        this.props.setRewardWeight(logicality, diversity, integrity)
    }

    onDrag = (e, ui) => {
        this.setState({
            x: ui.x + pointRadius,
            y: ui.y + pointRadius,
        })
        this.calculateWeight(ui.x + pointRadius, ui.y + pointRadius);
    }

    calculateWeight = (x, y) => {
        // Calculate Distance:
        // Logicality: (areaRadius, 0)
        // Diversity: (0.114*areaRadius, 1.5*areaRadius)
        // Integrity: (1.886*areaRadius, 1.5*areaRadius)
        let d1 = Math.sqrt(Math.pow((x - areaRadius), 2) + Math.pow((y - 0), 2));
        let d2 = Math.sqrt(Math.pow((x - 0.114 * areaRadius), 2) + Math.pow((y - 1.5 * areaRadius), 2));
        let d3 = Math.sqrt(Math.pow((x - 1.886 * areaRadius), 2) + Math.pow((y - 1.5 * areaRadius), 2));

        d1 = 1 / Math.pow(Math.E, 4 * d1 / areaRadius);
        d2 = 1 / Math.pow(Math.E, 4 * d2 / areaRadius);
        d3 = 1 / Math.pow(Math.E, 4 * d3 / areaRadius);
        let sum = d1 + d2 + d3;
        let logicality = d1 / sum;
        let diversity = d2 / sum;
        let integrity = d3 / sum;
        this.setState({
            logicality: logicality,
            diversity: diversity,
            integrity: integrity,
        })
    }

    generate = async () => {
        this.props.generateStory([], [], '')
        this.setState({
            isGenerating: true,
            cannotChangeData: true
        })
        const hide = message.loading('Generating...', 0);
        const { storyParameter, fileName, method } = this.props;
        const { rewardWeight } = this.props;
        let tempFacts = [];
        let tempRelations = [];
        let tree = []
        // let totalTime = storyParameter.timeLimit * storyParameter.maxStoryLength
        // let unitCount = (1 + storyParameter.maxStoryLength) * storyParameter.maxStoryLength / 2
        // let unitTime = totalTime / unitCount
        // for (let index = 0; index < storyParameter.maxStoryLength; index++) {
        let max_iteration = 2 * storyParameter.maxStoryLength;
        let information = 0;
        while ((tempFacts.length !== storyParameter.maxStoryLength || information < storyParameter.information) && max_iteration !== 0) {
            // let time = parseInt((storyParameter.maxStoryLength - index) * unitTime);
            let time = storyParameter.timeLimit;
            // console.log(time)
            const response = await generateStory(fileName, storyParameter.maxStoryLength, time, rewardWeight, tempFacts, tempRelations, method, tree)
            const facts = response.data.state.facts;
            tree = response.data.tree;
            tempFacts = [];
            tempRelations = [];
            // let factDict = response.data.facts[response.data.facts.length - 1]
            // console.log(response.data.facts)
            information = 0;
            for (let factDict of facts) {
                factDict = this.processDemo(factDict, fileName)
                let fact = new Fact(
                    factDict['type'],
                    factDict['measure'],
                    factDict['subspace'],
                    factDict['groupby'],
                    factDict['focus'],
                    factDict['parameter'],
                    "", // chart
                    factDict['score'],
                    factDict['information'],
                    factDict['significance']
                )
                information += factDict['information'];
                fact.chart = getFactChartType(fact, this.props.data);
                tempFacts.push(fact);
            }
            tempRelations = response.data.state.relations;
            console.log("iteration: " + max_iteration + ", length: " + tempFacts.length + ", information: " + information);
            this.props.generateStory(tempFacts.slice(), tempRelations, response.data.state.coverage)
            max_iteration -= 1
        }
        hide();
        this.setState({
            isGenerating: false,
            cannotChangeData: false
        })
    }

    processDemo = (factDict, fileName) => {
        // Process demo data
        if (fileName === 'CarSales.csv' || fileName === 'Sporty.csv' || fileName === 'Gold.csv' || fileName === 'BMW.csv') {
            for (let index = 0; index < factDict['subspace'].length; index++) {
                if (factDict['subspace'][index]['field'] === 'Year') {
                    factDict['subspace'][index]['value'] = factDict['subspace'][index]['value'].substring(0, 4)
                }
            }
            for (let index = 0; index < factDict['focus'].length; index++) {
                if (factDict['focus'][index]['field'] === 'Year') {
                    factDict['focus'][index]['value'] = factDict['focus'][index]['value'].substring(0, 4)
                }
            }
        } else if (fileName === 'deadstartup.csv') {
            for (let index = 0; index < factDict['subspace'].length; index++) {
                if (factDict['subspace'][index]['field'] === 'broken year') {
                    factDict['subspace'][index]['value'] = factDict['subspace'][index]['value'].substring(0, 4)
                }
            }
            for (let index = 0; index < factDict['focus'].length; index++) {
                if (factDict['focus'][index]['field'] === 'broken year') {
                    factDict['focus'][index]['value'] = factDict['focus'][index]['value'].substring(0, 4)
                }
            }
        }
        return factDict;
    }

    render() {
        let { manual, fileName, storyParameter } = this.props;
        if (manual) {
            return (
                <div id="panel">
                    <div id="uploaddata" style={{ height: 210 }}>
                        {fileName}
                    </div>
                    <div id="changeDataButton">
                        <Button block onClick={this.clickUpload} disabled={this.state.cannotChangeData}>Click to change dataset</Button>
                    </div>
                </div>
            )
        }
        let { x, y, logicality, diversity, integrity } = this.state;
        logicality = Math.round(logicality * 100) / 100;
        diversity = Math.round(diversity * 100) / 100;
        integrity = Math.round(integrity * 100) / 100;

        const dragHandlers = { onStop: this.onStop, onDrag: this.onDrag };
        return (
            <div id="panel">
                <div className="card-container">
                    <Tabs type="card" defaultActiveKey="3">
                        <TabPane tab="Data" key="1">
                            <div id="uploaddata" >
                                {fileName}
                            </div>
                            <div id="changeDataButton">
                                <Button block onClick={this.clickUpload} disabled={this.state.cannotChangeData}>Click to change dataset</Button>
                            </div>
                        </TabPane>
                        <TabPane tab="Goal" key="2">
                            <div>
                                <div style={{ height: 18 }} />
                                <Row>
                                    <Col span={14}>
                                        <p style={{ paddingLeft: 7, paddingTop: 9, fontSize: 12 }}>Max Length <u>{storyParameter.maxStoryLength}</u> facts</p>
                                    </Col>
                                    <Col span={10}><Slider min={2}
                                        max={12} defaultValue={storyParameter.maxStoryLength} onChange={this.changeMaxStoryLength} tipFormatter={lengthformatter} /></Col>
                                </Row>
                                <Row>
                                    <Col span={14}>
                                        <p style={{ paddingLeft: 7, paddingTop: 9, fontSize: 12 }}>Info Quantity <u>{storyParameter.information}</u> bits</p>
                                    </Col>
                                    <Col span={10}><Slider min={0}
                                        max={100} defaultValue={storyParameter.information} onChange={this.changeInformation} tipFormatter={infoformatter} /></Col>
                                </Row>
                                {/* <Row>
                                    <Col span={14}>
                                        <p style={{ paddingLeft: 7, paddingTop: 9, fontSize: 12 }}>Chart Diversity <u>{Math.round(storyParameter.chartDiversity * 100)}</u>%</p>
                                    </Col>
                                    <Col span={10}><Slider defaultValue={storyParameter.chartDiversity * 100} onChange={this.changeChartDiversity} tipFormatter={dataformatter} /></Col>
                                </Row> */}
                                <Row>
                                    <Col span={14}>
                                        <p style={{ paddingLeft: 7, paddingTop: 9, fontSize: 12 }}>Time Limit <u>{(storyParameter.timeLimit / 1000) * storyParameter.maxStoryLength * 2}</u> s</p>
                                    </Col>
                                    <Col span={10}><Slider min={2}
                                        max={10} defaultValue={storyParameter.timeLimit / 1000} onChange={this.changeTimeLimit} tipFormatter={timeformatter} /></Col>
                                </Row>
                                <Row>
                                    <Col span={14}>
                                        <p style={{ paddingLeft: 7, paddingTop: 6, fontSize: 12 }}>With Significance</p>
                                    </Col>
                                    <Col span={10}>
                                        <div style={{paddingLeft: 6, paddingTop: 4 }}>
                                            <Checkbox checked={this.props.method==='sig'} onChange={this.onChangeMethod}></Checkbox>
                                            {/* <Radio.Group options={methodOptions} onChange={this.onChangeMethod} value={this.props.method} /> */}
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </TabPane>
                        <TabPane tab="Reward" key="3">
                            <div className="drag-area-background" style={{ width: areaRadius * 2, height: areaRadius * 2, position: 'absolute', zIndex: 0 }}>
                                <div style={{ marginLeft: areaRadius - pointRadius - 14, marginTop: -pointRadius - 22, zIndex: 1, position: 'absolute' }}>
                                    Logicality
                                </div>
                                <div style={{ marginLeft: areaRadius - pointRadius, marginTop: - pointRadius, zIndex: 1, position: 'absolute' }} className="label-point">{logicality}</div>
                                <div style={{ marginLeft: 0.114 * areaRadius - pointRadius - 20, marginTop: 1.5 * areaRadius + 14, zIndex: 2, position: 'absolute' }}>
                                    Diversity
                                </div>
                                <div style={{ marginLeft: 0.114 * areaRadius - pointRadius, marginTop: 1.5 * areaRadius - pointRadius, zIndex: 2, position: 'absolute' }} className="label-point">{diversity}</div>
                                <div style={{ marginLeft: 1.886 * areaRadius - pointRadius, marginTop: 1.5 * areaRadius + 14, zIndex: 3, position: 'absolute' }}>
                                    Integrity
                                </div>
                                <div style={{ marginLeft: 1.886 * areaRadius - pointRadius, marginTop: 1.5 * areaRadius - pointRadius, zIndex: 3, position: 'absolute' }} className="label-point">{integrity}</div>

                                <svg style={{ zIndex: 0, position: 'absolute' }}>
                                    <line x1={areaRadius} y1={0} x2={x} y2={y} style={{ stroke: Color.BLUE, strokeWidth: 1 }} />
                                    <line x1={0.114 * areaRadius} y1={1.5 * areaRadius} x2={x} y2={y} style={{ stroke: Color.BLUE, strokeWidth: 1 }} />
                                    <line x1={1.886 * areaRadius} y1={1.5 * areaRadius} x2={x} y2={y} style={{ stroke: Color.BLUE, strokeWidth: 1 }} />
                                </svg>
                            </div>
                            <div className="drag-area" style={{ width: areaRadius * 2, height: areaRadius * 2, position: 'absolute', zIndex: 10 }}>
                                <Draggable bounds={{ left: -pointRadius, top: -pointRadius, right: areaRadius * 2 - pointRadius, bottom: areaRadius * 2 - pointRadius }} defaultPosition={{ x: areaRadius - pointRadius, y: areaRadius - pointRadius }} {...dragHandlers}>
                                    <div className="drag-point">S</div>
                                </Draggable>
                            </div>
                        </TabPane>
                    </Tabs>
                    <div id="generatebutton">
                        <Button block onClick={this.generate} loading={this.state.isGenerating}>Generate Story</Button>
                    </div>
                </div>


            </div>
        )
    }
}
