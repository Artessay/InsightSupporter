import React, { Component } from 'react';
import { Row, Col, Select, Button, Modal, Radio } from 'antd';
import AggregationType from '../../../constant/AggregationType';
import { getAggregatedRows, datafilter } from './helper';
import { CarSales_data } from '../../../dataset/carsales';
import { fact2visRules } from '../../../tool/fact2visRule';

const { Option } = Select;
let preAggregate = "sum",
    preMeasure = "Sales",
    preSubspace = [],
    preFilteredData = CarSales_data

export default class Rank extends Component {

    render() {
        let {handleChartChange,  getFieldValue, isDisabled, handleMeasureChange, handleAGGChange, handleFilterChange, onRadioChange, removeFilter, handleSubOk, handleSubCancel, handleGbChange, showModal } = this.props;
        let fact = this.props.selectedFact;
        let schema = this.props.schema;
        let measureList = schema.filter(key => key['type'] === "numerical")
        measureList.push({ field: "COUNT", type: "numerical" })
        const aggregationType = [],
            subspaceList = schema.filter(key => key['type'] !== "numerical"),//只能categorical, temporal
            groupbyList = schema.filter(key => key['type'] !== "numerical"),//只能categorical, temporal
            subValueList = getFieldValue(this.props.data, this.props.filterField),
            supportedChartTypes = fact2visRules.filter(x => x.fact === fact.type)
        // gbValueList = getFieldValue(this.props.data, fact.groupby)

        if (fact.measure.length && fact.groupby.length) {
            // aggregation
            let encoding = {}
            encoding['y'] = {};
            encoding['y']['field'] = fact.measure[0].field;
            encoding['y']['aggregation'] = fact.measure[0].aggregate;
            encoding['x'] = {};
            encoding['x']['field'] = fact.groupby[0];
            let filteredData = datafilter(this.props.data, fact.subspace)
            let aggregatedRows = getAggregatedRows(filteredData, encoding);
            // filter gbValueList
            // let measureField = fact.measure[0]['field'];
            let newOrder = aggregatedRows.sort(function (a, b) { return b[encoding.y.field] - a[encoding.y.field]; }).map(function (d) { return d[encoding.x.field]; })

            /***** 设默认为前3，并且更新到fact中 *****/
            let newFact = this.props.selectedFact

            let currentAggregate = newFact.measure[0].aggregate,
                currentMeasure = fact.measure[0].field,
                currentSubspace = fact.subspace,
                currentFilteredData = filteredData

            if (!newFact.focus.length || preAggregate !== currentAggregate || preMeasure !== currentMeasure || preSubspace.toString() !== currentSubspace.toString() || preFilteredData.toString() !== currentFilteredData.toString()) {
                newFact.focus = []
                newOrder.forEach((d, i) => {
                    if (i < 3) {
                        newFact.focus.push({ field: fact.groupby[0], value: d })
                    }
                });
                // newFact.focus = [
                //     { field: fact.groupby[0], value: newOrder[0] },
                //     { field: fact.groupby[0], value: newOrder[1] },
                //     { field: fact.groupby[0], value: newOrder[2] }
                // ]
                // this.props.updateScoreScript(newFact)
                preAggregate = currentAggregate
                preMeasure = currentMeasure
                preSubspace = currentSubspace
                preFilteredData = currentFilteredData
            }
        }

        let modalPosition;
        if (document.getElementById('add-subspace')) {
            modalPosition = document.getElementById('add-subspace').getBoundingClientRect()
        }

        for (let key in AggregationType) {
            if (key !== 'COUNT')
                aggregationType.push(AggregationType[key])
        }
        let measure = []
        if (!fact.measure.length) {
            measure = [{}]
        } else {
            measure = fact.measure
        }

        return (
            <div className="config-panel">
                <Row key={'chart'} className="shelf">
                    <Col span={8} className="channelName">visualization</Col>
                    <Col span={16}>
                        <Select className="select-box" id="select-chart" defaultValue={fact.chart} value={fact.chart} size='small' onChange={handleChartChange}>
                            {supportedChartTypes.map((key) => <Option key={key.chart} value={key.chart}>{key.chart}</Option>)}
                        </Select>
                    </Col>
                </Row>

                {measure.map((key, i) => <Row className={i === 0 ? 'shelf' : ''} key={'measure' + i}>
                    <Col span={8} className={i === 0 ? 'channelName' : ''}>{i === 0 ? 'measure' : ''}</Col>
                    <Col span={16} style={{ border: i === 0 ? 'none' : '1px solid black' }}>
                        <Col span={14}>
                            <Select className="select-box" id={"select-measure" + i} defaultValue={key.field} value={key.field} size='small' onChange={(value) => handleMeasureChange(value, i)}>
                                {measureList.map((key) =>
                                    <Option key={key.field} value={key.field} disabled={isDisabled(fact.measure, 'field', key.field)}>{key.field}</Option>
                                )}
                            </Select>
                        </Col>
                        <Col span={10}>
                            <Select className="select-box" id={"select-agg" + i}
                                disabled={key.field === "COUNT" ? true : false}
                                defaultValue={key.aggregate}
                                value={key.aggregate === "count" ? '' : key.aggregate}
                                size='small'
                                onChange={(value) => handleAGGChange(value, i)}
                            >
                                {aggregationType.map((key) => <Option key={key} value={key}>{key}</Option>)}
                            </Select>
                        </Col>
                    </Col>
                </Row>)}

                {fact.subspace.map((key, i) => <Row className={i === 0 ? 'shelf' : ''} key={key.field}>
                    <Col span={8} className={i === 0 ? 'channelName' : ''}>{i === 0 ? 'subspace' : ''}</Col>
                    <Col span={16} style={{ border: i === 0 ? 'none' : '1px solid black' }}>
                        <Col span={2}></Col>
                        <Col span={18} title={`${key.field} = ${key.value}`} style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{`${key.field} = ${key.value}`}</Col>
                        <Col span={4} className="channelSlot">
                            <Button shape="circle" type="link" size="small" style={{ fontSize: '12px', position: 'relative', left: 2 }} icon="close" onClick={() => removeFilter(key)} />
                        </Col>
                    </Col>
                </Row>)}

                <Row className={fact.subspace.length === 0 ? 'shelf' : ''}>
                    <Col span={8} className={fact.subspace.length === 0 ? 'channelName' : ''}>{fact.subspace.length === 0 ? 'subspace' : ''}</Col>
                    <Col span={16} style={{ border: fact.subspace.length === 0 ? 'none' : '1px solid black' }}>
                        <Button id='add-subspace' ref='addSubBtn' size='small' onClick={showModal}>
                            +
                        </Button>
                    </Col>
                </Row>

                <Modal
                    closable={false}
                    mask={false}
                    visible={this.props.subVisible}
                    onOk={handleSubOk}
                    onCancel={handleSubCancel}
                    style={{ position: "absolute", left: modalPosition ? modalPosition.left + modalPosition.width : 285, top: modalPosition ? modalPosition.top : 450 }}
                    width={290}
                >
                    <Row className="shelf">
                        <Col span={8} className="channelName">field</Col>
                        <Col span={16}>
                            <Select className="select-box" id="select-field" defaultValue='please select' value={this.props.subSelectValue} size='small' onChange={handleFilterChange}>
                                {subspaceList.map((key) => <Option key={key.field} value={key.field} disabled={isDisabled(fact.subspace, 'field', key.field)}>{key.field}</Option>)}
                            </Select>
                        </Col>
                    </Row>
                    <Row style={{ display: this.props.filterField ? 'block' : 'none' }}>
                        <Col span={8} className="channelName">value</Col>
                        <Col span={1}></Col>
                        <Col span={15} style={{ maxHeight: 165, overflow: 'scroll' }}>
                            <Radio.Group name="radiogroup" onChange={onRadioChange}>
                                {subValueList.map((key) => <Radio key={key} style={{ display: 'block' }} value={key}>{key}</Radio>)}
                            </Radio.Group>
                        </Col>
                    </Row>
                </Modal>

                <Row key={'groupby'} className="shelf">
                    <Col span={8} className="channelName">breakdown</Col>
                    <Col span={16}>
                        <Select className="select-box" id="select-groupby" defaultValue={fact.groupby[0]} value={fact.groupby[0]} size='small' onChange={handleGbChange}>
                            {groupbyList.map((key) => <Option key={key.field} value={key.field}>{key.field}</Option>)}
                        </Select>
                    </Col>
                </Row>

                {fact.focus.map((key, i) => <Row className={i === 0 ? 'shelf' : ''} key={i} style={{ display: 'block' }}>
                    <Col span={8} className={i === 0 ? 'channelName' : ''}>{i === 0 ? 'focus' : ''}</Col>
                    <Col span={16} style={{ border: i === 0 ? 'none' : '1px solid black' }}>
                        <Col span={2}></Col>
                        <Col span={18} style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{`No.${i + 1} (${key.value})`}</Col>
                        <Col span={4} className="channelSlot" style={{ height: 24 }}>
                            {/* <Button shape="circle" type="link" size="small" style={{ visible: 'hidden',fontSize: '12px', position: 'relative', left: 2 }} icon="close" onClick={() => removeFocus(key)} /> */}
                        </Col>
                    </Col>
                </Row>)}

                {/* {displayFocus} */}

            </div>
        )
    }
}
