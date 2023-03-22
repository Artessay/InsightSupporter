import React, { Component } from 'react';
import { fact2chart } from '../../../tool/fact2vis';
import { isValid } from '../../FactView/helper'
import { hightlight } from './helper'

export default class EventView extends Component {
    constructor(props) {
        super(props);
        this.scriptRef = React.createRef();
    }

    clickFact = () => {
        const { selectFact, index } = this.props;
        selectFact(index);
    }

    endEditing = () => {
        let script = this.scriptRef.current.innerText;
        let { fact, index } = this.props;
        fact.generatedScript = script;
        this.props.updateFact(index, fact);
        // this.scriptRef.current.innerHTML = hightlight(fact)
    }


    render() {
        let { uuid, fact, data, width, forPublish } = this.props;
        let vis;
        if (fact.aggregated && fact.aggregatedFact) {
            let aggregatedFact = fact.aggregatedFact;
            let compoundScript = fact.generatedScript + " " + aggregatedFact.generatedScript;
            vis = fact2chart(uuid, fact, data, width, width * 260 / 300 * 0.95, true);
            return (
                <div>
                <div className="mobile-graphic">
                    {vis}
                    {/* <EventView key={events[i].id} index={events[i].index} uuid={events[i].id} fact={events[i].fact} data={data} width={mobileClientWidth} /> */}
                </div>
                <div className="mobile-script">
                    <div className="script-content">
                        <div>
                            {compoundScript}
                        </div>
                    </div>
                </div>
            </div>
            )
        } else {
            if (isValid(this.props.fact) && width) {
                vis = fact2chart(uuid, fact, data, width * 0.95, width * 260 / 300 * 0.95);
            }
            return (
                <div>
                    <div className="mobile-graphic">
                        {vis}
                        {/* <EventView key={events[i].id} index={events[i].index} uuid={events[i].id} fact={events[i].fact} data={data} width={mobileClientWidth} /> */}
                    </div>
                    <div className="mobile-script">
                        <div className="script-content">
                            <div ref={this.scriptRef} spellCheck="false" suppressContentEditableWarning="true" contentEditable={forPublish ? "false" : "true"} onBlur={this.endEditing} dangerouslySetInnerHTML={{ __html: hightlight(fact) }} >
                                {/* {ReactHtmlParser(hightlight(events[i].fact))} */}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}
