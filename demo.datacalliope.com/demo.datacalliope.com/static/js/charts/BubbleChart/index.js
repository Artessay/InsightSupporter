import React, { Component } from 'react';
import draw from './vis';

export default class BubbleChart extends Component {

    componentDidMount() {
        draw(this.props);
    }

    componentDidUpdate(preProps) {
        draw(this.props);
    }

    render() {
        return (
            <div className={'vis-bubblechart-'+this.props.uuid}/>
        )
    }
}