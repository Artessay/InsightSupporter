import React, { Component } from 'react';
import { Row, Col, Select, Button } from 'antd';
import './factview.css';

export default class BlankView extends Component {
    render() {
        return (
            <div>
                <div id='factview' className='pane'>
                    <div className='header'>Fact</div>
                    <div className="fact-preview">
                        <div style={{ marginLeft: 6 }}>

                        </div>
                    </div>
                </div>
                <div id='scoreview' className='pane'>
                </div>
                <div id='factconfigure' className='pane'>
                    <div id="caption">
                    </div>
                    <div id="select-panel">
                        <Row className="shelf">
                            <Col span={8} className="channelName">type</Col>
                            <Col span={16}>
                                <Select className="select-box" id="select-type" defaultValue='' value='' size='small'>
                                </Select>
                            </Col>
                        </Row>
                        <Row className='shelf'>
                            <Col span={8} className='channelName'>measure</Col>
                            <Col span={16}>
                                <Col span={14}>
                                    <Select className="select-box" id="select-measure" defaultValue='' value='' size='small'>
                                    </Select>
                                </Col>
                                <Col span={10}>
                                    <Select className="select-box" id="select-agg" defaultValue='' value='' size='small'>
                                    </Select>
                                </Col>
                            </Col>
                        </Row>
                        <Row className={'shelf'}>
                            <Col span={8} className='channelName'>subspace</Col>
                            <Col span={16}>
                                <Button id='add-subspace' ref='addSubBtn' size='small'>
                                    +
                            </Button>
                            </Col>
                        </Row>
                        <Row className="shelf">
                            <Col span={8} className="channelName">groupby</Col>
                            <Col span={16}>
                                <Select className="select-box" id="select-type" defaultValue='' value='' size='small'>
                                </Select>
                            </Col>
                        </Row>
                        <Row className={'shelf'}>
                            <Col span={8} className='channelName'>focus</Col>
                            <Col span={16}>
                                <Button id='add-subspace' ref='addSubBtn' size='small'>
                                    +
                            </Button>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        )
    }
}
