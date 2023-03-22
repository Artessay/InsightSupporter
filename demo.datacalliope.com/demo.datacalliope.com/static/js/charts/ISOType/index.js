import React, { Component } from 'react';
import draw from './vis';
import drawProportion from './proportion';

export default class ISOType extends Component {

    componentDidMount() {
        if (this.props.spec.style && 'proportion' in this.props.spec.style) {
            drawProportion(this.props);
        } else {
            draw(this.props);
        }
    }

    componentDidUpdate(preProps) {
        if (this.props.spec.style && 'proportion' in this.props.spec.style) {
            drawProportion(this.props);
        } else {
            draw(this.props);
        }
    }

    render() {
        return (
            <div className={'vis-isotype-'+this.props.uuid}/>
        )
    }
}