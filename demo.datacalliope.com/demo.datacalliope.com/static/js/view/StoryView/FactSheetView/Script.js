import React, { Component } from 'react'
import { hightlight } from './helper'
import { Textfit } from '@kyo_ago/react-textfit';

export default class Script extends Component {
    constructor(props) {
        super(props);
        this.textRef = React.createRef()
    }
    
    textFitReady(e,i, textFitRef,styles, events) {
        textFitRef._parent.style['height']= 'fit-content';
        textFitRef._parent.style['height']= '-moz-max-content';
        textFitRef._parent.parentNode.style['height']= 'auto'
        textFitRef._parent.style['line-height']= textFitRef._parent.parentNode.style['line-height'];
        textFitRef._parent.style['transform-origin']= 'top center'
        textFitRef._parent.style.transform = 'scale(1)';
        if(textFitRef._parent.clientHeight > parseFloat(styles['height'], 10)) {
            textFitRef._parent.style['line-height']=1;
        } 
        if(textFitRef._parent.clientHeight > parseFloat(styles['height'], 10) && e <= 12) {
            textFitRef._parent.style['transform-origin']= 'top center'
            textFitRef._parent.style.transform = 'scale(0.833)';
            textFitRef._parent.parentNode.style['height']= textFitRef._parent.parentNode.clientHeight * 0.9 + 'px'
        }
        textFitRef._child.innerHTML = events[i].fact.aggregated && events[i].fact.aggregatedFact ? hightlight(events[i].fact) + hightlight(events[i].fact.aggregatedFact) : hightlight(events[i].fact)
        textFitRef._child.contentEditable=this.props.forPublish ? false: events[i].fact.aggregated && events[i].fact.aggregatedFact ? false : true
        textFitRef._child.spellCheck=false
        textFitRef._child.suppressContentEditableWarning=true
        // textFitRef._child.addEventListener('blur', ()=>this.endEditing(textFitRef, events, i))
        // textFitRef._child.addEventListener('focus', ()=>this.startEditing(textFitRef,i))
        
    }

    computeDes(factStyle, slotHeight, event) {
        let styles = {} ;
        switch(factStyle) {
            case '6p':
                if(event.fact.chart!=='Color Filling Map') {
                    styles['height'] = `${slotHeight* 0.8}px`
                } else {
                    // styles['height'] = slotHeight > 200 ? "60px" : "40px";
                    styles['height'] = `${slotHeight* 0.8}px`
                    // styles['width'] = '45%';
                }
                break
            case '4p':
                if(event.fact.chart!=='Color Filling Map') {
                    styles['height'] = `${slotHeight* 0.8}px`
                } else {
                    styles['height'] = slotHeight > 200 ? `${slotHeight* 0.3}px`: `${slotHeight* 0.2}px`;
                    styles['width'] = '100%';
                }
                
                break
            case '3p':
                if(slotHeight >= 235){
                    styles['width'] = '90%';
                    styles['height'] = `${slotHeight* 0.3}px`
                } else {
                    styles['height'] = `${slotHeight* 0.75}px`
                }
                // styles['height'] = `${slotHeight* 0.75}px`;
                break
            case '2p3':
            case '2p':
                if(slotHeight >= 235){
                    styles['width'] = '90%';
                    styles['height'] = `${slotHeight* 0.28}px`
                } else {
                    styles['height'] = `${slotHeight* 0.75}px`
                }
                break
            default:
                break
        }
        return styles
    }

    startEditing = (textFitRef, i) => {
        let inHTML = textFitRef._child.innerHTML;
        if(inHTML === '<span class="factsheet-hightlight"></span>') {
            textFitRef._child.innerHTML = ""
        }
    }

    endEditing = (textFitRef, events, i) => {
        let script = textFitRef._child.innerText;
        let {fact, index} = events[i];
        if(fact.generatedScript !== script) {
            fact.generatedScript = script;
            this.props.updateFact(index, fact);
        }
    }

    
    render() {
        const {i, slotHeight, item, factStyle, events} = this.props
        return<div className='fs_edit factsheetSlotIn factsheetDes' spellCheck="false"  onBlur={()=>this.endEditing(this.textRef, events, i)} onFocus={()=>this.startEditing(this.textRef,i)} style={{ width: slotHeight > 235 || ( factStyle[i]==='6p' &&events[i].fact.chart!=="Color Filling Map") ? "90%" : '', lineHeight: events[i].fact.chart === "Color Filling Map"? 1.5 :item.generatedScript.length > 100 ? item.generatedScript.length > 140 ? 1.1 : 1.2 : 1.5 }}>
            <Textfit 
                // ref={textFitRef}
                key={ events[i].fact.generatedScript}
                ref={el=>this.textRef=el}
                className="fs_text"
                style={this.computeDes(factStyle[i], slotHeight, events[i])}
                mode="multi"
                max={factStyle[i]==='6p'||factStyle[i]==='4p'?18:16}
                min={12}
                onReady={(e) => {this.textFitReady(e, i, this.textRef, this.computeDes(factStyle[i], slotHeight, events[i]), events)}}
                >
                    {events[i].fact.aggregated && events[i].fact.aggregatedFact ? events[i].fact.generatedScript + " " + events[i].fact.aggregatedFact.generatedScript : events[i].fact.generatedScript}
                    {/* {events[i].fact.generatedScript} */}
            </Textfit>
        </div>
    }
}