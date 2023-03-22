import React, { useState, useEffect, useCallback } from "react";
import EventView from './EventView';
// import { genTitle } from './helper'
import Swiper from "./swiper";
import Color from '../../../constant/Color';
import ReactResizeDetector from 'react-resize-detector';
import { Progress } from 'antd';

let preCurrentIndex = -1
// let mobileClientHeight = 0
let mobileClientWidth = 0

export default ({ events, data, selectFact, fileName, storyParameter, resultCoverage, forPublish, updateFact, usertitle, changeTitle, title, changeMobilePreTitle, mobilePreTitle }) => {

    if (!events) {
        return null;
    }

    let titleRef = React.createRef();
    let mobilePreTitleRef = React.createRef();
    let subtitleRef = [];
    let averageFactScore
    // let allEvents = Object.assign({}, events)

    // let storytitle = genTitle(fileName);
    let storytitle = title;
    if (usertitle !== undefined && usertitle !== "") {
        storytitle = usertitle;
    }

    let preTitle = 'The Story of'
    if (mobilePreTitle !== undefined && mobilePreTitle !== "") {
        preTitle = mobilePreTitle;
    }

    events = events.filter(e => {
        if (!e.fact.aggregated) {
            return true
        } else {
            return e.fact.aggregated && e.fact.aggregatedFact
        }
    })
    if (events && events[0])
        averageFactScore = (events.map(x => x.fact.score).reduce((a, b) => a + b, 0)) / events.length;
    // Swiper instance
    const [swiper, updateSwiper] = useState(null);
    // Slides current index
    let [currentIndex, updateCurrentIndex] = useState(0);

    if (currentIndex > 0 && currentIndex !== preCurrentIndex) {
        preCurrentIndex = currentIndex;
        // 以前页码就是所选择的fact，现在出现了agg，页码并不是所选择的fact了
        selectFact(events[currentIndex - 1].index);
    }

    // Params definition
    const params = {
        initialSlide: 0,
        direction: 'vertical',
        slidesPerView: 1,
        spaceBetween: 30,
        mousewheel: true,
        // pagination: {
        //     el: '.swiper-pagination',
        //     clickable: true
        // },
        keyboardControl: true,
        mousewheelControl: true,
        centeredSlides: true,
        preventClicks: false,
        preventClicksPropagation: false,
        simulateTouch: forPublish ? true : false,
        // speed: 400,
        // height: 589,
        height: forPublish ? document.body.clientHeight : 589,
        width: mobileClientWidth,
        // rebuildOnUpdate: true,
        shouldSwiperUpdate: true,
        getSwiper: updateSwiper // Get swiper instance callback
    };

    const updateIndex = useCallback(() => updateCurrentIndex(swiper.realIndex), [
        swiper
    ]);

    // Add eventlisteners for swiper after initializing
    useEffect(() => {
        if (swiper !== null && !swiper.destroyed) {
            swiper.on("slideChange", updateIndex);
        }

        return () => {
            if (swiper !== null && !swiper.destroyed) {
                swiper.off("slideChange", updateIndex);
            }
        };
    }, [swiper, updateIndex]);

    const onResize = (handleWidth, handleHeight) => {
        // mobileClientHeight = handleHeight
        mobileClientWidth = handleWidth
    }

    const firstPage =
        <div className="mobile-slide-item intro">
            <div>
                <p spellCheck="false" suppressContentEditableWarning="true" contentEditable="true">The Story of</p>
                <p spellCheck="false" suppressContentEditableWarning="true" contentEditable="true" style={{ marginTop: -40, fontWeight: 800 }}>{storytitle}</p>
            </div>
            <p className="mobile-meta">This generated data story includes <b>{events ? events.length : 0}</b> facts. The average importance score is <b>{parseInt(averageFactScore * 1000) / 1000}</b> and the data coverage is <b>{parseInt(resultCoverage * 10000) / 100}%</b>.</p>
            {/* <div className="mobile-arrow"></div> */}
            <div style={{ width: 180, margin: '0 auto', position: 'relative' }}>
                <Progress style={{ position: 'relative', top: -30 }} strokeColor={Color.BAR_HIGHTLIGHT} percent={events ? events.length / storyParameter.maxStoryLength * 100 : 0} format={() => ` (${events ? events.length : 0}/${storyParameter.maxStoryLength})`} />
            </div>
        </div>

    const blankPage = <div></div>

    const waitPage = forPublish ? blankPage : firstPage

    const endSubtible = (events, i) => {
        // console.log(e)
        let script = subtitleRef[i].innerText;
        let { fact, index } = events[i];
        fact.generatedSubtitle = script;
        updateFact(index, fact);
    }

    const endEditingTitle = () => {
        let title = titleRef.current.innerText;
        changeTitle(title);
    }

    const endEditingPreTitle = () => {
        let title = mobilePreTitleRef.current.innerText;
        changeMobilePreTitle(title);
    }

    // const endEditing = (events, i) => {
    //     // console.log(e)
    //     let script = scriptRef[i].innerText;
    //     let {fact, index} = events[i];
    //     fact.generatedScript = script;
    //     updateFact(index, fact);
    //     scriptRef[i].innerHTML = hightlight(events[i].fact)
    // }
    let titleSize = 32
    if (storytitle) {
        titleSize = storytitle.length > 10 ? 28 : 32
    }

    return (

        <div className="swiper">
            <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
            {events ?
                <Swiper params={params}>
                    <div className="mobile-slide-item intro">
                        <div className="mobile-title" style={{ height: 85 }}>
                            <p ref={mobilePreTitleRef}
                                onBlur={endEditingPreTitle} spellCheck="false" suppressContentEditableWarning="true" contentEditable={forPublish ? "false" : "true"}>{preTitle}</p>
                            <p ref={titleRef}
                                onBlur={endEditingTitle} spellCheck="false" suppressContentEditableWarning="true" contentEditable={forPublish ? "false" : "true"} style={{ marginTop: -30, fontWeight: 800, fontSize: titleSize }}>{storytitle}</p>
                        </div>
                        <p className="mobile-meta">This generated data story includes <b>{events.length}</b> facts. The average importance score is <b>{parseInt(averageFactScore * 1000) / 1000}</b> and the data coverage is <b>{parseInt(resultCoverage * 10000) / 100}%</b>.</p>
                        <div className="mobile-arrow"></div>
                        <div className="mobile-footer" style={{height:40.8}}>
                            <div className="mobile-logo"></div>
                            <div className="mobile-powerby" style={{color: 'rgba(0, 0, 0, 0.65)'}}>
                                Powered By Calliope
                            </div>
                        </div>
                    </div>
                    {events.map((d, i) => (
                        < div className="mobile-slide-item" key={'slide_' + i} style={{ height: params.height, marginBottom: 30 }}>
                            <div className="mobile-header">
                                <div className="mobile-index-mark">
                                    <div style={{ fontSize: 21, fontFamily: currentIndex < 10 ? 'inherit' : 'sans-serif', fontWeight: 800, position: 'relative', left: -6, top: -2, color: '#F6C02A', display: 'inline-block' }}>{i + 1}</div>
                                    <div style={{ position: 'relative', top: -22, left: events.length < 10 ? 7 : 3, display: 'inline-block' }}><svg t="1581234004003" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1109" width="22" height="22"><path d="M895.543 90.581c9.238-8.958 10.164-22.048 5.988-34.481-4.18-12.441-13.139-21.679-26.23-22.605-13.086-0.927-25.525 3.25-32.207 11.884L157.182 892.814c-10.811 16.939-8.21 37.363 6.175 48.498 14.392 11.139 34.813 8.539 45.953-5.854L895.543 90.581z" fill="#5C5C5C" p-id="1110"></path></svg></div>
                                    <div style={{ fontSize: 12, fontFamily: 'sans-serif', position: 'relative', top: events.length < 10 ? -24 : -44, left: events.length < 10 ? -1 : 9, display: 'inline-block' }}>{events.length}</div>
                                </div>
                                <div className="mobile-subtitle">
                                    <div ref={el => subtitleRef[i] = el} style={{ margin: '0 auto' }} spellCheck="false" suppressContentEditableWarning="true" contentEditable={forPublish ? "false" : "true"} onBlur={() => endSubtible(events, i)}>{events[i].fact.generatedSubtitle}</div>
                                </div>
                            </div>

                            <EventView key={events[i].id} index={events[i].index} uuid={events[i].id} fact={events[i].fact} data={data} width={mobileClientWidth} updateFact={updateFact} forPublish={forPublish} />
                            {/* <div className="mobile-graphic">
                                <EventView key={events[i].id} index={events[i].index} uuid={events[i].id} fact={events[i].fact} data={data} width={mobileClientWidth} />
                            </div>
                            <div className="mobile-script">
                                <div className="script-content">
                                    <div ref={el=>scriptRef[i] = el} spellCheck="false" suppressContentEditableWarning="true" contentEditable={forPublish?"false":"true"} onBlur={()=>endEditing(events, i)} dangerouslySetInnerHTML={{__html: hightlight(events[i].fact)}} >
                                        {/* {ReactHtmlParser(hightlight(events[i].fact))} */}
                            {/* </div>
                                </div>
                            </div> */}
                            <div className="mobile-arrow" style={{ display: i === events.length - 1 ? 'none' : 'block' }}>
                            </div>
                            <div className="mobile-footer">
                                <div className="mobile-logo"></div>
                                <div className="mobile-powerby">
                                    Powered By Calliope
                                </div>
                            </div>
                        </div>
                    ))}
                </Swiper>
                :
                waitPage
            }
            {/* {currentIndex} */}
        </div>
    );
};
