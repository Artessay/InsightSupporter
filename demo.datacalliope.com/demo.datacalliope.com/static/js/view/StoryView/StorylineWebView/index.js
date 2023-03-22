import React, { Component } from 'react';
import ReactResizeDetector from 'react-resize-detector';
import uuidv4 from 'uuid/v4';
import './index.css';
import Draggable from 'react-draggable';
import { factColors,relationColors } from '../Color';
import { genSubtitle } from '../../../sentencer/index'
import { getMinFontSize } from './helper'
import TimeLineSlot from './TimeLineSlot'
import _ from 'lodash';

const notVisable = 0,
    lessVisable = 0.2,
    fullVisable = 0.8

export default class StorylineWebView extends Component {
    constructor(props) {
        super(props);
        this.titleRef = React.createRef();
        this.lastItem = React.createRef()
        this.firstItem = React.createRef()
        this.olRef = React.createRef();
        this.onetimeRef = {};
        this.state = {
            timelineWidth: 0,
            leftOpacity: lessVisable,
            rightOpacity: fullVisable,
            activeDrags: 0,
            timelineTransform: 0,
            minFontSizeTitle: 18
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.facts[0] !== undefined && (!_.isEqual(this.props.facts, prevProps.facts) || !_.isEqual(this.props.relations, prevProps.relations))) {
            // new story comes in
            this.setState({
                rightOpacity: this.props.facts.length * 200 > this.state.timelineWidth ? fullVisable : notVisable,
                leftOpacity: this.props.facts.length * 200 > this.state.timelineWidth ? lessVisable : notVisable,
                timelineTransform: 0
            })
            this.olRef.parentNode.style.transform = "translate(0px, 0px)"
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        // if(this.state.containerWidth === 0)
        //     return true
        // else {
        //     return !_.isEqual(nextProps.fileName, this.props.fileName) || !_.isEqual(nextProps.facts, this.props.facts) || !_.isEqual(nextProps.relations, this.props.relations)  || this.state.containerWidth !== nextState.containerWidth
        // }
        // return !_.isEqual(nextProps.facts, this.props.facts)
        // console.log(nextState !== this.state , nextProps !== this.props)
        // return nextState !== this.state || nextProps !== this.props
        return true
    }

    isElementInViewport = (el, firstOrLast) => {
        const rect = el.getBoundingClientRect();
        const parent = el.parentNode.parentNode.parentNode;
        const rect_p = parent.getBoundingClientRect();
        if (firstOrLast === 'last') {
            return (
                rect.right <= rect_p.right
            );
        } else {
            return (
                rect.left >= rect_p.left
            );
        }

    }
    moving = (direction) => {
        let sign = direction === 'left' ? '+' : '-';
        let _whichOpacity = direction + 'Opacity'
        if (this.state[_whichOpacity] === lessVisable) return
        let scrolling = 280;
        let tl = this.olRef;
        const tlStyle = getComputedStyle(tl);
        //   add more browser prefixes if needed here
        const tlTransform = tlStyle.getPropertyValue("-webkit-transform") || tlStyle.getPropertyValue("transform");
        let values;
        if (tlTransform === 'none') {
            values = parseInt(`${sign}${scrolling}`);
        }
        else {
            values = parseInt(tlTransform.split(",")[4]) + parseInt(`${sign}${scrolling}`);
        }
        this.setState({ timelineTransform: values });
        this.olRef.transform = `translateX(${values}px)`
        setTimeout(() => {
            this._checkVisibility();
        }, 1000)

    }

    // handle container div width change
    onResize = (handleWidth) => {
        this.setState({
            timelineWidth: handleWidth,
            timelineTransform: 0,
            leftOpacity: this.props.facts.length * 200 > handleWidth ? lessVisable : notVisable,
            rightOpacity: this.props.facts.length * 200 > handleWidth ? fullVisable : notVisable
        })
    }

    handleClickDiv = (_index, fact) => {
        const { selectFact } = this.props;
        selectFact(fact.index);
        // 把fact div 移到中心
        this.moveDivToCenter(_index)

    }
    moveDivToCenter = (_index) => {
        let width_onetime = this.onetimeRef[_index].current.getBoundingClientRect().width;
        let x_onetime = this.onetimeRef[_index].current.getBoundingClientRect().x;
        let parent = this.olRef.parentNode.parentNode;
        let x_parent = parent.getBoundingClientRect().x;
        let width_parent = parent.getBoundingClientRect().width;
        let x_m_parent = x_parent + width_parent / 2 - width_onetime / 2;
        let offset = x_m_parent - x_onetime
        this.setState({
            timelineTransform: this.state.timelineTransform + offset
        })
        setTimeout(() => {
            this._checkVisibility();
        }, 1000)
    }

    // drag
    onStart = () => {
        let perv_activeDrags = this.state.activeDrags
        this.setState({ activeDrags: ++perv_activeDrags });
    };

    onStop = () => {
        let perv_activeDrags = this.state.activeDrags
        this.setState({ activeDrags: --perv_activeDrags });
    };

    onDrag = () => {
        this._checkVisibility();
    }

    _checkVisibility = () => {
        let last_item = this.lastItem;
        if (this.isElementInViewport(last_item, 'last')) {
            this.setState({
                rightOpacity: lessVisable
            })
        } else {
            this.setState({
                rightOpacity: fullVisable
            })
        }
        let first_item = this.firstItem;
        if (this.isElementInViewport(first_item, 'first')) {
            this.setState({
                leftOpacity: lessVisable
            })
        } else {
            this.setState({
                leftOpacity: fullVisable
            })
        }
    }

    getOrCreateRef(id) {
        if (!this.onetimeRef.hasOwnProperty(id)) {
            this.onetimeRef[id] = React.createRef();
        }
        return this.onetimeRef[id];
    }

    endEditingTitle = () => {
        let title = this.titleRef.current.innerText;
        this.props.changeTitle(title);
    }

    render() {
        let { facts, relations, usertitle } = this.props;
        let events = facts.map(function (x, i) {
            if (x !== undefined)
                return {
                    id: uuidv4(),
                    index: i,
                    fact: x,
                    relation: relations[i],
                    before: i > 0 ? facts[i - 1] : 'null'
                }
            return null;
        });

        events = events.filter(e => {
            if (!e.fact.aggregated) {
                return true
            } else {
                return e.fact.aggregated && e.fact.aggregatedFact
            }
        })
        facts = events.map(function (x, i) {
            return x.fact
        })
        relations = events.map(function (x, i) {
            return x.relation
        })
        let storytitle = this.props.title;
        if (usertitle !== undefined && usertitle !== "") {
            storytitle = usertitle;
        }
        if (storytitle)
            storytitle = storytitle.toUpperCase();

        const factTypeIncluced = facts.map((value) => value.type).filter((value, index, _arr) => _arr.indexOf(value) === index);
        relations.shift();
        let relationTypeIncluced = relations.filter((value, index, _arr) => _arr.indexOf(value) === index);
        relationTypeIncluced = relationTypeIncluced.filter((val) => val !== "none")
        const dragHandlers = { onStart: this.onStart, onStop: this.onStop, onDrag: this.onDrag };
        let font_min_size = 12;
        if (events.length !== 0 && events[0] !== undefined) {
            let lon = events.map((_, i) => genSubtitle(events[i].fact))
            let longest = Math.max(...(lon.map(el => el.length)));
            font_min_size = getMinFontSize(longest);
        }
        return (
            <div style={{ height: 589, backgroundColor: '#F9F8F6', position: 'relative' }}>
                <div className="content">
                    <h1 ref={this.titleRef}
                        onBlur={this.endEditingTitle} spellCheck="false" suppressContentEditableWarning="true" contentEditable={this.props.forPublish ? false : true} className="title">{storytitle}</h1>
                </div>
                <div className="tl-powerby">
                    <div className="tl-logo"></div>
                    <div className="tl-powerby-text">
                        <span>Powered By </span>
                        <span>Calliope</span>
                    </div>
                </div>
                <div style={{ display: 'flex' }}>
                    {events.length !== 0 && events[0] !== undefined && <div className={`btn-arrow ${this.state.leftOpacity === fullVisable ? 'enabledBtn' : ''}`} style={{ opacity: this.state.leftOpacity }} onClick={() => this.moving('left')}><svg style={{ margin: 'auto' }} viewBox="64 64 896 896" focusable="false" data-icon="left" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path></svg> </div>}
                    <div style={{ width: '90%' }} className="content timeline">
                        <ReactResizeDetector handleWidth onResize={this.onResize} />
                        <Draggable axis="x" cancel=".tl-edit" {...dragHandlers} enableUserSelectHack={true}>
                            <div>
                                {this.props.facts.length !== 0 && events[0] !== undefined && <ol ref={el => this.olRef = el} style={{ transform: `translateX(${this.state.timelineTransform}px)` }}>
                                    {events.map((item, i) => {
                                        if (i === 0) return <li key={i} ref={el => this.firstItem = el} className={events[i].fact.type} style={{ backgroundImage: `linear-gradient(to right, ${relationColors[events[i].relation]} , ${relationColors[events[i].relation]})` }}>
                                            <TimeLineSlot i={i} oneTimeRef={this.getOrCreateRef(i)} events={events} font_min_size={font_min_size} {...this.props} passOnClick={this.handleClickDiv}></TimeLineSlot>
                                        </li>
                                        return <li key={i} className={events[i].fact.type} style={{ backgroundImage: `linear-gradient(to right, ${relationColors[events[i].relation]} , ${relationColors[events[i].relation]})` }} >
                                            <TimeLineSlot i={i} oneTimeRef={this.getOrCreateRef(i)} events={events} font_min_size={font_min_size} {...this.props} passOnClick={this.handleClickDiv}></TimeLineSlot>
                                        </li>
                                    })}
                                    <li style={{display: 'none'}}></li>
                                    <li ref={el => this.lastItem = el}></li>
                                </ol>}
                            </div>
                        </Draggable>
                    </div>
                    {events.length !== 0 && events[0] !== undefined && <div className={`btn-arrow ${this.state.rightOpacity === fullVisable ? 'enabledBtn' : ''}`} style={{ opacity: this.state.rightOpacity }} onClick={() => this.moving('right')}><svg style={{ margin: 'auto' }} viewBox="64 64 896 896" focusable="false" data-icon="left" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path></svg></div>}
                </div>
                <div className="legends">
                    {factTypeIncluced.map((factType, index) => {
                        return <div className="legend" key={index}>
                            <span className='dot' style={{ backgroundColor: `${factColors[factType]}` }}></span>
                            <div className='dot_text'>{factType}</div>
                        </div>
                    })
                    }
                </div>
                <div className="legends-relation">
                    {relationTypeIncluced.map((relationType, index) => {
                        return <div className="legend" key={index}>
                            <span className='line' style={{ backgroundColor: `${relationColors[relationType]}` }}></span>
                            <div className='dot_text'>{relationType}</div>
                        </div>
                    })
                    }
                </div>
            </div>
        )
    }
}
