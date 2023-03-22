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
        let {uuid, fact, data} = this.props;
        let vis;
        if (isValid(fact)) {
            if (fact.aggregated && fact.aggregatedFact) {
                vis = fact2chart(uuid, fact, data, 180, 160, true);
            } else {
                vis = fact2chart(uuid, fact, data, 180, 160);
            }
            
        }
        return (
            <div style={{ marginLeft: 0 }}>
                {vis}
            </div>
        )
    }
}
