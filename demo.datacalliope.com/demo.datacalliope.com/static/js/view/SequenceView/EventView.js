import React, { Component } from 'react';
import { Button } from 'antd';
import { fact2chart } from '../../tool/fact2vis';
import Color from '../../constant/Color';
import './eventview.css';
import { isValid } from '../FactView/helper';

export default class EventView extends Component {

    constructor(props) {
        super(props);
        this.scriptRef = React.createRef();
    }

    clickFact = () => {
        const { selectFact, index } = this.props;
        selectFact(index);
    }

    deleteFact = () => {
        const { index } = this.props;
        this.props.deleteFact(index);
    }

    endEditing = () => {
        // console.log('end editing');
        let script = this.scriptRef.current.innerText;
        let {fact, index} = this.props;
        fact.generatedScript = script;
        this.props.updateFact(index, fact);
    }

    render() {
        let {fact, uuid, data, isSelected} = this.props;
        let script = fact.generatedScript;
        // console.log(script)
        if (fact.aggregated && fact.aggregatedFact) {
            let aggregatedFact = fact.aggregatedFact;
            let compoundScript = fact.generatedScript + " " + aggregatedFact.generatedScript;
            let vis = fact2chart(uuid, fact, data, 205, 160, true);
            return (
                <div
                    className='eventview'
                    onClick={this.clickFact}
                    style={{ borderColor: isSelected ? Color.GREEN : Color.GRAY }}
                >
                    <div className="chart-preview">
                        <div style={{ marginLeft: 6 }}>
                            {vis}
                        </div>
                    </div>
                    <div className="script-preview">
                        {compoundScript}
                    </div>
                </div>
            )
        } else {
            let vis;
            if (isValid(fact)) {
                vis = fact2chart(uuid, fact, data, 205, 160);
            }
            return (
                <div
                    className='eventview'
                    onClick={this.clickFact}
                    style={{ borderColor: isSelected ? Color.GREEN : Color.GRAY, position: "relative",
                        zIndex: 0 }}
                >
                    {isSelected ?
                        <div style={{padding:6, position: "absolute",
                        zIndex: 2, right: 0}}>
                        <Button type="dashed" shape="circle" icon="close" onClick={this.deleteFact}/>
                        </div>
                        :
                        null
                    }
                    <div className="chart-preview" >
                        <div style={{ marginLeft: 6 }}>
                            {vis}
                        </div>
                    </div>
                    <div ref={this.scriptRef} className="script-preview" contentEditable suppressContentEditableWarning={true}
                    onBlur={this.endEditing}>
                        {script}
                    </div>
                    
                </div>
            )
        }
    }
}
