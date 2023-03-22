import React, { Component } from 'react';
import { Icon } from 'antd';
import './eventview.css';

export default class AddFact extends Component {

    clickAddFact = () => {
        this.props.addFact();
    }

    render() {
        return (
            <div id="addfact" onClick={this.clickAddFact}>
                <Icon type="plus" style={{fontSize: 80}}/>
            </div>
        )
    }
}
