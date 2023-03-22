import React, { Component } from 'react'
import 'swiper/css/swiper.css';
import uuidv4 from 'uuid/v4';
import Slider from "./slider";
import './index.css'


export default class MobileView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            facts: this.props.facts,
            swiper: null
        }
    }

    render() {
        const { facts, forPublish } = this.props;
        // if(forPublish && storyId){
        //     console.log('publish')
        // }

        let events
        if (facts.length) {
            events = facts.map(function (x, i) {
                return {
                    id: uuidv4(),
                    index: i,
                    fact: x,
                }
            });
        }
        // let events = facts.map(function (x, i) {
        //     return {
        //         id: uuidv4(),
        //         index: i,
        //         fact: x,
        //     }
        // });
        // events = events.filter(e => {
        //     if (!e.fact.aggregated) {
        //         return true
        //     } else {
        //         return e.fact.aggregated && e.fact.aggregatedFact
        //     }
        // })
        return (
            // <div id='mobile-view' style={{ height: 589, width: 300, margin: '0 auto' }}>
            <div id='mobile-swiper' style={{ overflowY: 'hidden', height: forPublish ? document.body.clientHeight : 589}}>
                <Slider events={events} {...this.props} />
            </div>
        )
    }
}
