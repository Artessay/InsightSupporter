import React, { Component } from 'react';
import EventView from './EventView';
import { Textfit } from '@kyo_ago/react-textfit';
import { hightlight } from './helper'

export default class StorylineWebView extends Component {
    constructor(props) {
        super(props)
        this.desFitRef = React.createRef();
        this.textFitRef = React.createRef();
        this.headerRef = React.createRef();
        this.state = {
            chart: this.props.facts[this.props.i].chart,
            scripts: this.props.events[this.props.i].fact.generatedScript,
            subtitle: this.props.events[this.props.i].fact.generatedSubtitle
        }
    }

    componentDidUpdate(prevProps, prevState) {
        this.setState({
            chart: this.props.facts[this.props.i].chart
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        // return this.state.scripts !== this.props.facts[this.props.i].generatedScript || this.state.subtitle !== this.props.facts[this.props.i].generatedSubtitle || this.props.facts[this.props.i].aggregated !== nextProps.facts[this.props.i].aggregated
        return this.state.scripts !== this.props.facts[this.props.i].generatedScript || this.state.subtitle !== this.props.facts[this.props.i].generatedSubtitle || this.state.chart !== this.props.facts[this.props.i].chart
        // return true
    }

    titleFitReady(events, i) {
        this.setState(prevState =>{
            return {
                // scripts: events[i].fact.generatedScript,
                subtitle: events[i].fact.generatedSubtitle
            }
        })
        // console.log('title',i, this.textFitRef, this.state.subtitle, events[i].fact.generatedSubtitle)
        if (!this.textFitRef) {
            return
        }
        let padTop = (50 - this.textFitRef._child.offsetHeight) / 2 >= 0 ?(50 - this.textFitRef._child.offsetHeight) / 2  : 0 
        padTop = this.textFitRef.props.children==='    ' ? 3:padTop
        this.headerRef.style['padding-top'] = padTop + 'px'
        this.textFitRef._child.contentEditable=this.props.forPublish? false: events[i].fact.aggregated && events[i].fact.aggregatedFact ? false : true
        this.textFitRef._child.spellCheck=false
        this.textFitRef._child.suppressContentEditableWarning= true
        
    }

    parseScript(events, i) {
        this.setState(prevState=>{
            return {
                scripts: events[i].fact.generatedScript
                // subtitle: events[i].fact.generatedSubtitle
            }
        })

        if (!this.desFitRef) {
            return
        }
        if(this.desFitRef._child.offsetHeight >= 120) {
            this.desFitRef._child.style['transform'] = 'scale(0.833)';
            this.desFitRef._child.style['transform-origin']= "top left";
            this.desFitRef._child.style['line-height']= 1.1
        } else {
            // console.log(this.desFitRef)
            this.desFitRef._child.style.transform = 'scale(1)';
            this.desFitRef._child.style['transform-origin']= "top left";
            this.desFitRef._child.style['line-height']= 1.3
        }
        this.desFitRef._child.innerHTML = hightlight(events[i].fact)
        this.desFitRef._child.contentEditable=this.props.forPublish? false: events[i].fact.aggregated && events[i].fact.aggregatedFact ? false : true
        this.desFitRef._child.spellCheck=false
        this.desFitRef._child.suppressContentEditableWarning= true
        // this.desFitRef._parent.style['padding-top'] = '10px'
    }

    endEditing = (events, i) => {
        // console.log(e)
        let script = this.desFitRef._child.textContent;
        this.setState({
            scripts: script
        })
        let {fact, index} = events[i];
        fact.generatedScript = script;
        this.props.updateFact(index, fact);
    }

    startEditing = (e) => {
        // console.log('start...')
        e.preventDefault()
        e.stopPropagation()
        // e.stopPropagation();
    }

    endSubtitle = (events, i) => {
        
        let script = this.textFitRef._child.textContent;
        // console.log(script)
        this.setState({
            subtitle: script
        })
        let {fact, index} = events[i];
        fact.generatedSubtitle = script;
        this.props.updateFact(index, fact);
    }

    render() {
        let {i, oneTimeRef, events, font_min_size, passOnClick} = this.props;
        return (
            <div className='onetime' ref={oneTimeRef} onClick={()=>passOnClick(i, events[i].fact)} style={{display: 'flex', flexDirection: 'column', height:'330px'}}>
                <div className='vis'>
                    <EventView key={events[i].id} index={events[i].index} uuid={events[i].id} fact={events[i].fact} {...this.props} />
                </div>
                {/*  suppressContentEditableWarning="true" contentEditable="true"  */}
                <div className='des tl-edit' spellCheck="false" onBlur={()=>this.endEditing(events, i)} onClick={(e)=>this.startEditing(e)} style={{lineHeight: 1.5}}>
                    {/* {item.generatedScript} */}
                    <Textfit
                        ref={el => this.desFitRef = el}
                        style={{ height: '120px' }}
                        mode="multi"
                        max={14}
                        min={10}
                        onReady={()=>this.parseScript(events, i)}>
                            {events[i].fact.aggregated && events[i].fact.aggregatedFact ? events[i].fact.generatedScript + " " + events[i].fact.aggregatedFact.generatedScript : events[i].fact.generatedScript}
                        {/* {events[i].fact.generatedScript} */}
                        {/* {ReactHtmlParser(hightlight(events[i].fact))} */}
                    </Textfit>
                </div>
                <div className='header_type tl-edit' ref={el => this.headerRef = el} onBlur={()=>this.endSubtitle(events, i)} style={{ paddingTop: 0 }} onClick={(e)=>this.startEditing(e)} >
                    <Textfit
                        ref={el => this.textFitRef = el}
                        className="text"
                        style={{ height: '30px' }}
                        mode="multi"
                        max={font_min_size}
                        min={10}
                        onReady={() => this.titleFitReady(events, i) }>
                        {events[i].fact.generatedSubtitle.length === 0 ? "    ":events[i].fact.generatedSubtitle}
                    </Textfit>
                </div>
            </div>
        )
    }

}