import React, { Component } from 'react';
import './factview.css';
import BlankView from './BlankView';
import Fact from './Fact';

export default class FactView extends Component {

    render() {
        let fact = this.props.selectedFact;
        if (!fact) {
            return (
                <BlankView />
            )
        } else {
            return (
                <Fact {...this.props}/>
            )
        }
    }
}
