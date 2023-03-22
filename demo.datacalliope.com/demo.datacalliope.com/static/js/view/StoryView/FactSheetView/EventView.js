import React, { Component } from 'react';
import { fact2chart } from '../../../tool/fact2vis';
import './eventview.css';
import { isValid } from '../../FactView/helper'

export default class EventView extends Component {

    clickFact = () => {
        const { selectFact, index } = this.props;
        selectFact(index);
    }

    render() {
        let {uuid, fact, data, size, totalLen, outerHeight, remainHeight} = this.props;
        let vis;
        let width, height;
        switch (size) {
            case '2p3':// 每行三个
                width = outerHeight >= 235 ? 230 : 150;
                // height = totalLen===5 ? 150: (outerHeight-100) //160;
                height = totalLen>=4 ? outerHeight * 0.9: outerHeight * 0.6
                break;
            case '2p': 
                width = outerHeight >= 235 ? 230 : 150;
                // height = totalLen===5 ? 150 : (outerHeight-100)//160;
                height = totalLen>=4 ? outerHeight * 0.9: outerHeight * 0.6
                break;
            case '3p':
                width = outerHeight >= 235 ? 320 : 180;
                // height = totalLen===5 ? 150 : (outerHeight-100)//160;
                // height = totalLen>=4 ? outerHeight * 0.9: outerHeight - 120
                height = outerHeight > 235 ? outerHeight * 0.6 : outerHeight * 0.9
                break
            case '4p':
                width = 400;
                // height = totalLen===5 ? 150 : (outerHeight-80);
                height = outerHeight > 200 ? outerHeight*0.6 : outerHeight *0.6
                if(fact.chart ==='Color Filling Map') {
                    width = 280;
                    height = outerHeight * 0.85
                }
                break
            case '6p':
                width = 500;
                // height = totalLen===5 ? 130 : (outerHeight-100);
                height = outerHeight > 200 ? outerHeight*0.68 : outerHeight *0.68
                if(fact.chart ==='Color Filling Map') {
                    width = 350;
                    height = outerHeight * 0.85
                }
                
                else if(fact.chart ==='Vertical Bar Chart'||fact.chart ==='Isotype Bar Chart'||fact.chart ==='Line Chart') {
                    width = 600;
                    // height = outerHeight * 0.85
                }
                break
            default:
                break;
        }
        height = remainHeight>0 ? remainHeight : height
        if (fact.aggregated && fact.aggregatedFact) {
            let vis = fact2chart(uuid, fact, data, width, height, true);
            return (
                    // <div className="chart-preview">
                        <div style={{ marginLeft: 6 }}>
                            {vis}
                        </div>
                    // </div>
            )
        } else {
            if (isValid(this.props.fact)) {
                vis = fact2chart(uuid, fact, data, width, height);
            }
            return (
                <div style={{ marginLeft: 0 }}>
                    {vis}
                </div>
            )
        }

       
        
    }
}
