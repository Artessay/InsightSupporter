import React, { Component } from 'react';
import { Row, Col, Select, Button, Modal, Radio } from 'antd';
import AggregationType from '../../../constant/AggregationType';
import { getAggregatedRows, datafilter } from './helper';
import { fact2visRules } from '../../../tool/fact2visRule';

const { Option } = Select;

export default class Extreme extends Component {

    render() {
        let {handleChartChange,  getFieldValue, isDisabled, handleMeasureChange, handleAGGChange, handleFilterChange, onRadioChange, removeFilter, handleSubOk, handleSubCancel, handleGbChange, handleFocusChange, showModal, updateScoreScript } = this.props;
        let fact = this.props.selectedFact;
        let schema = this.props.schema;
        let measureList = schema.filter(key => key['type'] === "numerical")
        measureList.push({ field: "COUNT", type: "numerical" })
        let aggregationType = [],
            subspaceList = schema.filter(key => key['type'] !== "numerical"),//只能categorical, temporal
            groupbyList = schema.filter(key => key['type'] !== "numerical"),//只能categorical, temporal
            subValueList = getFieldValue(this.props.data, this.props.filterField),
            gbValueList = [],
            supportedChartTypes = fact2visRules.filter(x => x.fact === fact.type)

        // aggregation
        if (fact.measure.length && fact.groupby.length) {
            let encoding = {}
            encoding['y'] = {};
            encoding['y']['field'] = fact.measure[0].field;
            encoding['y']['aggregation'] = fact.measure[0].aggregate;
            encoding['x'] = {};
            encoding['x']['field'] = fact.groupby[0];
            let filteredData = datafilter(this.props.data, fact.subspace)
            let aggregatedRows = getAggregatedRows(filteredData, encoding);
            // filter gbValueList
            let measureField = fact.measure[0]['field'];
            let max = aggregatedRows.reduce((a, b) => (a[measureField] > b[measureField]) ? a : b)
            let min = aggregatedRows.reduce((a, b) => (a[measureField] < b[measureField]) ? a : b)
            gbValueList = [{
                displayName: `max (${max[fact.groupby[0]]})`,
                value: `max:${max[fact.groupby[0]]}:${max[fact.measure[0].field]}`
            },
            {
                displayName: `min (${min[fact.groupby[0]]})`,
                value: `min:${min[fact.groupby[0]]}:${min[fact.measure[0].field]}`
            }]

            /***** 设默认为max，并且更新到fact中 *****/
            let newFact = this.props.selectedFact
            if (!newFact.focus.length) {
                newFact.focus = [{
                    field: fact.groupby[0],
                    value: max[fact.groupby[0]],
                    extremeFocus: 'max',
                    extremeValue: max[fact.measure[0].field]
                }]
                updateScoreScript(newFact)
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

        let focusDefaultValue
        if (fact.focus.length) {
            if (fact.focus[0].extremeFocus)
                focusDefaultValue = `${fact.focus[0].extremeFocus} (${fact.focus[0].value})`
            else if (fact.parameter.length) {
                focusDefaultValue = `${fact.parameter[0]} (${fact.focus[0].value})`
            }
        } else {
            focusDefaultValue = ''
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

                <Row className="shelf">
                    <Col span={8} className="channelName">focus</Col>
                    <Col span={16}>
                        <Select className="select-box" defaultValue={focusDefaultValue} value={focusDefaultValue} size='small' onChange={handleFocusChange}>
                            {gbValueList.map((key) => <Option key={key.value} value={key.value}>{key.displayName}</Option>)}
                        </Select>
                    </Col>
                </Row>
            </div>
        )
    }
}