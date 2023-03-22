import React, { Component } from 'react'
import { factColors } from '../Color.js'
import EventView from './EventView';
import Script from './Script';

export default class FactSheet extends Component {
    constructor(props) {
        super(props);
        // this.textFitRef = [];
        this.titleRef = React.createRef();
        this.textFitRef = {}
    }

    shouldComponentUpdate(nextProps, nextState) {
        // if(this.state.containerWidth === 0)
        //     return true
        // else {
        //     return !_.isEqual(nextProps.fileName, this.props.fileName) || !_.isEqual(nextProps.facts, this.props.facts) || !_.isEqual(nextProps.relations, this.props.relations)  || this.state.containerWidth !== nextState.containerWidth
        // }
        // return !_.isEqual(nextProps.facts, this.props.facts)
        return true
    }

    getOrCreateRef(id) {
        if (!this.textFitRef.hasOwnProperty(id)) {
            this.textFitRef[id] = React.createRef();
        }
        return this.textFitRef[id];
    }

    endEditingTitle = () => {
        let title = this.titleRef.current.innerText;
        this.props.changeTitle(title);
    }

    render() {
        const { factStyle, slotHeight, slotMarginTop, componentRef, events, factLine, title, usertitle } = this.props;
        let storytitle = title;
        if (usertitle !== undefined && usertitle !== "") {
            storytitle = usertitle;
        }
        storytitle = storytitle.toUpperCase();
        return (
            <div className="fsPDF" ref={componentRef} style={{ fontFamily: 'sans-serif', width: '825px', height: '1166px', backgroundColor: '#F9F8F6', margin: '0 auto', position: 'relative' }}>
                <div className="factsheetContent" style={{ paddingTop: `${slotMarginTop}px` }}>
                    <h1  ref={this.titleRef}
                    onBlur={this.endEditingTitle} spellCheck="false" suppressContentEditableWarning="true" contentEditable={this.props.forPublish ? false : true} className="factsheetTitle fs_edit">{storytitle}</h1>                    
                </div>
                <div className="factsheetContent" style={{height: factLine === 0 ? '1060px' : ''}}>
                    {events.map((item, i) =>
                        <div key={i} className={`factsheetSlot factsheetSlot_${factStyle[i]}`} style={{ height: `${slotHeight}px`, marginTop: `${slotMarginTop}px`, boxShadow: `inset 0 0 0 2px ${factColors[events[i].fact.type]}, 0 0 0 1px ${factColors[events[i].fact.type]}` }}>
                            <div className='factsheetSlotIn'>
                                <div className='factsheetSlotType text-uppercase' >
                                    {item.fact.type}
                                </div>
                                <div className="factsheetSlotContent" style={{ height: `${slotHeight - 50}px`, flexDirection: slotHeight > 235 || factStyle[i]==='4p'||factStyle[i]==='6p'  ? ( events[i].fact.chart==='Color Filling Map' && factStyle[i]==='6p')||( events[i].fact.chart==='Color Filling Map' && factStyle[i]==='4p')?'row': 'column':'row' }}>
                                    <Script i={i} slotHeight={slotHeight} item={item.fact} textFitRef={this.getOrCreateRef(i)} factStyle={factStyle} events={events} {...this.props}></Script>
                                    <div className='factsheetSlotIn factsheetVis' style={{verticalAlign: 'middle', flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center"}}>
                                        <EventView key={events[i].id} totalLen={factLine} remainHeight={this.textFitRef[i] === undefined ? slotHeight -80- this.textFitRef[i] : -1} outerHeight={slotHeight} index={events[i].index} uuid={events[i].id} fact={events[i].fact} size={factStyle[i]} {...this.props} />
                                    </div>
                                </div>
                            </div>
                            <div className='factsheetSlotId text-uppercase' >
                                {i + 1}
                            </div>
                        </div>
                    )}
                </div>
                <div className="fs-powerby" style={{height: factLine === 0 ? "30px": 1166-46-slotMarginTop-10-factLine*(slotHeight+slotMarginTop+8)+'px'}}>
                    <div className="fs-logo"></div>
                    <div style={{display:'inline-block'}}>Powered By Calliope</div>
                </div>
            </div>
        )
    }

}