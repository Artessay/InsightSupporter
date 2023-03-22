import React, { Component } from 'react';
import { Row, Col, Select } from 'antd';
import { genFactSentence, genSubtitle } from '../../../sentencer/index';
import FactType from '../../../constant/FactType';
import factScoring from '../../../network/factScoring';
import { isValid, customizeFact } from '../helper';
import { fact2chart, getFactChartType } from '../../../tool/fact2vis';
import uuidv4 from 'uuid/v4';
import Association from './Association';
import Categorization from './Categorization';
import Difference from './Difference';
import Distribution from './Distribution';
import Extreme from './Extreme';
import Outlier from './Outlier';
import Proportion from './Proportion';
import Rank from './Rank';
import Trend from './Trend';
import Value from './Value';
import _ from 'lodash'

const { Option } = Select;

const getFieldValue = (rawData, fieldName) => {
    if (fieldName)
        return Array.from(new Set(rawData.map(d => d[fieldName])));
    else return []
}

export default class Fact extends Component {

    constructor(props) {
        super(props)
        this.state = {
            // fact: this.props.selectedFact,
            type: this.props.selectedFact.type,
            script: this.props.selectedFact.script(),
            // modal
            filterField: '',
            filterValue: '',
            subVisible: false,
            showFocusButton: true,
            showSubButton: true,
            // for show please select
            subSelectValue: 'please select',
            score: '',
        };

    }

    handleTypeChange = (value) => {
        let newFact = this.props.selectedFact
        newFact.type = value
        if (value === FactType.ASSOCIATION && newFact.measure.length === 1) {
            newFact.measure.push(newFact.measure[0])
        }
        if (value !== FactType.ASSOCIATION && newFact.measure.length === 2) {
            newFact.measure = [newFact.measure[0]]
        }
        this.setState({
            type: value
        })
        newFact.chart = getFactChartType(newFact, this.props.data)
        newFact.focus = Object.assign([], [])
        this.updateScoreScript(newFact)
    }

    handleChartChange = (value) => {
        let newFact = this.props.selectedFact
        newFact.chart = value
        this.updateScoreScript(newFact)
    }

    handleMeasureChange = (value, i) => {
        let newFact = this.props.selectedFact
        let newList = Object.assign({}, newFact.measure[i]);
        if (value === "COUNT") {
            newList.aggregate = 'count';
        } else {
            newList.aggregate = 'sum';
        }
        newList.field = value
        newFact.measure[i] = newList
        this.updateScoreScript(newFact)
    }

    handleAGGChange = (value, i) => {
        let newFact = this.props.selectedFact
        let newList = Object.assign({}, newFact.measure[i]);
        if (newList) {
            newList.aggregate = value
            newFact.measure[i] = newList
            this.updateScoreScript(newFact)
        }
    }

    handleFilterChange = (value) => {
        let newList = getFieldValue(this.props.data, value)
        this.setState({
            checkAll: true,
            filterField: value,
            subValueList: newList,
            subSelectValue: value
        })
    }

    onRadioChange = e => {
        this.setState({
            filterValue: e.target.value,
        })
    }

    removeFilter = (value) => {
        let newFact = this.props.selectedFact
        let newList = newFact.subspace
        let index = newFact.subspace.indexOf(value)
        newList.splice(index, 1)
        newFact.subspace = newList
        this.updateScoreScript(newFact)
    }

    handleSubOk = e => {
        let newFilter = {
            field: this.state.filterField,
            value: this.state.filterValue
        }
        let newFact = this.props.selectedFact
        let newList = newFact.subspace
        newList.push(newFilter)
        newFact.subspace = newList;
        newFact.generatedScript = genFactSentence(newFact)
        this.setState({
            subVisible: false,
            filterField: '',
            subSelectValue: 'please select',
        });
        this.updateScoreScript(newFact)
    };

    handleSubCancel = e => {
        this.setState({
            subVisible: false,
        });
    };

    handleGbChange = (value) => {
        let newFact = this.props.selectedFact
        newFact.groupby = [value]
        // newFact.focus = []
        newFact.focus = Object.assign([], [])
        this.updateScoreScript(newFact)
    }

    onFocusClick = () => {
        this.setState({
            showFocusButton: false
        })
    }

    handleFocusChange = (value, focusIndex = 0) => {
        let newFact = this.props.selectedFact
        let newList = newFact.focus

        let newFocus = {
            field: newFact.groupby[0],
            value: value
        }
        if (newFact.type === FactType.EXTREME) {
            newFact.focus[0].value = value.split(':')[1]
            newFact.focus[0].extremeFocus = value.split(':')[0]
            newFact.focus[0].extremeValue = value.split(':')[2]
        } else if (newFact.type === FactType.PROPORTION) {
            if (!newFact.focus.length) {
                newFact.focus = [{ field: newFact.groupby[0] }]
            }
            newFact.focus[0].value = value
        } else if (newFact.type === FactType.DIFFERENCE) {
            if (focusIndex === 1) {
                newFact.focus[1].value = value
            } else {
                newFact.focus[0].value = value
            }
        } else {
            newList.push(newFocus)
        }
        // this.setState({
        //     showFocusButton: !this.state.showFocusButton
        // })
        this.setState({
            showFocusButton: true
        })
        this.updateScoreScript(newFact)
    }

    removeFocus = (value) => {
        let newFact = this.props.selectedFact
        let newList = newFact.focus
        let index = newList.indexOf(value)
        newList.splice(index, 1)
        this.setState({
            showFocusButton: true
        })
        this.updateScoreScript(newFact)
    }

    onFocusBlur = () =>{
        this.setState({
            showFocusButton: true
        })
    }

    isDisabled = (objArr, key, item) => {
        let newArr = objArr.map((e) => e[key])
        if (newArr.indexOf(item) === -1) return false
        else return true
    }

    showModal = () => {
        this.setState({
            subVisible: true,
        });
    };

    getScoreScript = async (fact) => {
        fact = JSON.stringify(fact)
        const response = await factScoring(this.props.fileName, fact, this.props.method);
        return response.data;
    }

    updateScoreScript = (newFact) => {
        let backendFact = _.cloneDeep(newFact)
        backendFact = customizeFact(backendFact)
        if (isValid(newFact)) {
            this.getScoreScript(backendFact).then(res => {
                newFact.score = res.score
                newFact.information = res.information
                newFact.significance = res.significance
                newFact.parameter = res.parameter
                newFact.generatedSubtitle = genSubtitle(newFact)
                newFact.generatedScript = genFactSentence(newFact)
                this.setState({
                    score: newFact.score
                })
                this.props.updateFact(this.props.selectedFactIndex, newFact)
            }).catch((reason) => {
                newFact.score = 0
                this.setState({
                    score: 0
                })
                console.log(reason);
            });
        } else {
            console.log('not valid')
            newFact.score = 0
            newFact.generatedScript = ''
            this.setState({
                score: 0
            })
            this.props.updateFact(this.props.selectedFactIndex, newFact)
        }
    }

    render() {
        let fact = this.props.selectedFact;
        let script, information, significance, vis;
        const factTypeList = []

        for (let key in FactType) {
            factTypeList.push(FactType[key])
        }

        // score = fact.score;
        information = fact.information;
        significance = fact.significance;
        script = fact.generatedScript;
        if (fact.aggregated && fact.aggregatedFact) {
            let aggregatedFact = fact.aggregatedFact;
            let compoundScript = fact.generatedScript + " " + aggregatedFact.generatedScript;
            script = compoundScript;
            vis = fact2chart(uuidv4(), fact, this.props.data, 280, 260, true);
        } else {
            if (isValid(fact)) {
                vis = fact2chart(uuidv4(), fact, this.props.data, 300, 260);
            }
        }

        let factConfig;
        switch (fact.type) {
            case FactType.ASSOCIATION:
                factConfig = <Association getFieldValue={getFieldValue} isDisabled={this.isDisabled} handleMeasureChange={this.handleMeasureChange} handleAGGChange={this.handleAGGChange} handleFilterChange={this.handleFilterChange} onRadioChange={this.onRadioChange} removeFilter={this.removeFilter} handleSubOk={this.handleSubOk} handleSubCancel={this.handleSubCancel} handleGbChange={this.handleGbChange} onFocusClick={this.onFocusClick} handleFocusChange={this.handleFocusChange} showModal={this.showModal} removeFocus={this.removeFocus} handleChartChange={this.handleChartChange} {...this.state} {...this.props} />
                break;
            case FactType.CATEGORIZATION:
                factConfig = <Categorization getFieldValue={getFieldValue} isDisabled={this.isDisabled} handleMeasureChange={this.handleMeasureChange} handleAGGChange={this.handleAGGChange} handleFilterChange={this.handleFilterChange} onRadioChange={this.onRadioChange} removeFilter={this.removeFilter} handleSubOk={this.handleSubOk} handleSubCancel={this.handleSubCancel} handleGbChange={this.handleGbChange} onFocusClick={this.onFocusClick} handleFocusChange={this.handleFocusChange} showModal={this.showModal} removeFocus={this.removeFocus} handleChartChange={this.handleChartChange} {...this.state} onFocusBlur={this.onFocusBlur} {...this.props} />
                break;
            case FactType.DIFFERENCE:
                factConfig = <Difference updateScoreScript={this.updateScoreScript} getFieldValue={getFieldValue} isDisabled={this.isDisabled} handleMeasureChange={this.handleMeasureChange} handleAGGChange={this.handleAGGChange} handleFilterChange={this.handleFilterChange} onRadioChange={this.onRadioChange} removeFilter={this.removeFilter} handleSubOk={this.handleSubOk} handleSubCancel={this.handleSubCancel} handleGbChange={this.handleGbChange} onFocusClick={this.onFocusClick} handleFocusChange={this.handleFocusChange} showModal={this.showModal} removeFocus={this.removeFocus} handleChartChange={this.handleChartChange} {...this.state} {...this.props} />
                break;
            case FactType.DISTRIBUTION:
                factConfig = <Distribution getFieldValue={getFieldValue} isDisabled={this.isDisabled} handleMeasureChange={this.handleMeasureChange} handleAGGChange={this.handleAGGChange} handleFilterChange={this.handleFilterChange} onRadioChange={this.onRadioChange} removeFilter={this.removeFilter} handleSubOk={this.handleSubOk} handleSubCancel={this.handleSubCancel} handleGbChange={this.handleGbChange} onFocusClick={this.onFocusClick} handleFocusChange={this.handleFocusChange} showModal={this.showModal} removeFocus={this.removeFocus} handleChartChange={this.handleChartChange} onFocusBlur={this.onFocusBlur} {...this.state} {...this.props} />
                break;
            case FactType.EXTREME:
                factConfig = <Extreme updateScoreScript={this.updateScoreScript} getFieldValue={getFieldValue} isDisabled={this.isDisabled} handleMeasureChange={this.handleMeasureChange} handleAGGChange={this.handleAGGChange} handleFilterChange={this.handleFilterChange} onRadioChange={this.onRadioChange} removeFilter={this.removeFilter} handleSubOk={this.handleSubOk} handleSubCancel={this.handleSubCancel} handleGbChange={this.handleGbChange} onFocusClick={this.onFocusClick} handleFocusChange={this.handleFocusChange} showModal={this.showModal} removeFocus={this.removeFocus} handleChartChange={this.handleChartChange} {...this.state} {...this.props} />
                break;
            case FactType.OUTLIER:
                factConfig = <Outlier updateScoreScript={this.updateScoreScript} getFieldValue={getFieldValue} isDisabled={this.isDisabled} handleMeasureChange={this.handleMeasureChange} handleAGGChange={this.handleAGGChange} handleFilterChange={this.handleFilterChange} onRadioChange={this.onRadioChange} removeFilter={this.removeFilter} handleSubOk={this.handleSubOk} handleSubCancel={this.handleSubCancel} handleGbChange={this.handleGbChange} onFocusClick={this.onFocusClick} handleFocusChange={this.handleFocusChange} showModal={this.showModal} removeFocus={this.removeFocus} handleChartChange={this.handleChartChange} {...this.state} {...this.props} />
                break;
            case FactType.PROPORTION:
                factConfig = <Proportion updateScoreScript={this.updateScoreScript} getFieldValue={getFieldValue} isDisabled={this.isDisabled} handleMeasureChange={this.handleMeasureChange} handleAGGChange={this.handleAGGChange} handleFilterChange={this.handleFilterChange} onRadioChange={this.onRadioChange} removeFilter={this.removeFilter} handleSubOk={this.handleSubOk} handleSubCancel={this.handleSubCancel} handleGbChange={this.handleGbChange} onFocusClick={this.onFocusClick} handleFocusChange={this.handleFocusChange} showModal={this.showModal} removeFocus={this.removeFocus} handleChartChange={this.handleChartChange}  {...this.state} {...this.props} />
                break;
            case FactType.RANK:
                factConfig = <Rank updateScoreScript={this.updateScoreScript} getFieldValue={getFieldValue} isDisabled={this.isDisabled} handleMeasureChange={this.handleMeasureChange} handleAGGChange={this.handleAGGChange} handleFilterChange={this.handleFilterChange} onRadioChange={this.onRadioChange} removeFilter={this.removeFilter} handleSubOk={this.handleSubOk} handleSubCancel={this.handleSubCancel} handleGbChange={this.handleGbChange} onFocusClick={this.onFocusClick} handleFocusChange={this.handleFocusChange} showModal={this.showModal} removeFocus={this.removeFocus} handleChartChange={this.handleChartChange} {...this.state} {...this.props} />
                break;
            case FactType.TREND:
                factConfig = <Trend updateScoreScript={this.updateScoreScript} getFieldValue={getFieldValue} isDisabled={this.isDisabled} handleMeasureChange={this.handleMeasureChange} handleAGGChange={this.handleAGGChange} handleFilterChange={this.handleFilterChange} onRadioChange={this.onRadioChange} removeFilter={this.removeFilter} handleSubOk={this.handleSubOk} handleSubCancel={this.handleSubCancel} handleGbChange={this.handleGbChange} onFocusClick={this.onFocusClick} handleFocusChange={this.handleFocusChange} showModal={this.showModal} removeFocus={this.removeFocus} handleChartChange={this.handleChartChange} onFocusBlur={this.onFocusBlur} {...this.state} {...this.props} />
                break;
            case FactType.VALUE:
                factConfig = <Value getFieldValue={getFieldValue} isDisabled={this.isDisabled} handleMeasureChange={this.handleMeasureChange} handleAGGChange={this.handleAGGChange} handleFilterChange={this.handleFilterChange} onRadioChange={this.onRadioChange} removeFilter={this.removeFilter} handleSubOk={this.handleSubOk} handleSubCancel={this.handleSubCancel} handleGbChange={this.handleGbChange} onFocusClick={this.onFocusClick} handleFocusChange={this.handleFocusChange} showModal={this.showModal} removeFocus={this.removeFocus} handleChartChange={this.handleChartChange} {...this.state} {...this.props} />
                break;

            default:
                break;
        }

        return (
            <div className="config-panel">
                <div id='factview' className='pane'>
                    <div className='header'>Fact</div>
                    <div className="fact-preview">
                        <div style={{ marginLeft: 6 }}>
                            {vis}
                        </div>
                    </div>
                </div>
                <div id='scoreview' className='pane'>
                    <p id='information'>{parseInt(information * 1000) / 1000} <span style={{ fontSize: 16 }}>bits</span></p>
                    <p id='significance'>significance: {parseInt(significance * 1000) / 1000}</p>
                </div>
                <div id='factconfigure' className='pane'>
                    <div id="caption" style={{ height: fact.aggregated && fact.aggregatedFact ? 'auto' : 68, lineHeight: script.length < 70 ? '21px' : '17px', fontSize: script.length < 70 ? 14 : 12 }}>
                        <div>{script}</div>
                        {/* <Textfit
                            mode="multi"
                            // style={{ padding:2 }}
                            max={16}> 
                        {script}
                        </Textfit> */}
                    </div>
                    {!(fact.aggregated && fact.aggregatedFact) ?
                        <div id="select-panel">
                            <Row className="shelf">
                                <Col span={8} className="channelName">type</Col>
                                <Col span={16}>
                                    <Select className="select-box" id="select-type" defaultValue={fact.type} value={fact.type} size='small' onChange={this.handleTypeChange}>
                                        {factTypeList.map((key) => <Option key={key} value={key}>{key}</Option>)}
                                    </Select>
                                </Col>
                            </Row>
                            {factConfig}
                        </div>
                        :
                        <div></div>}
                </div>
            </div>
        )
    }
}
