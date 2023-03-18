// import { Anchor, Col, Row } from 'antd';
// import React, { useEffect, useState } from 'react';
import React from 'react';
import './News.css'
import { Button } from 'antd';
import Page from './Page';

export default class News extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.current);

        this.state = {
            group: 1
        }

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick = (e) => {
        this.setState({
            group: e.target.value
        })

        console.log(this.state.group)
    }

    render() {
        // const handleScroll = event => {
            
        // }
        const {DataSL} = this.props;

        const listLength = DataSL.Contents.Episode.length;
        
        return(
            <div className="News">
                <div className="newsAside">
                    <div className="ViewLabel">
                        View
                    </div>
                    
                    {/* <Radio.Group> */}
                        {/* <Radio.Button shape='circle' value="1">1</Radio.Button>
                        <Radio.Button shape='circle' value="2">2</Radio.Button>
                        <Radio.Button shape='circle' value="3">3</Radio.Button> */}
                    {/* </Radio.Group> */}
                    <div className='buttons'>
                        <Button shape='circle' onClick={(e) => this.handleClick(e)} value="1">1</Button>
                        <div className='verticalLine'></div>
                        <Button shape='circle' onClick={(e) => this.handleClick(e)} value="2">2</Button>
                        <div className='verticalLine'></div>
                        <Button shape='circle' onClick={(e) => this.handleClick(e)} value="3">3</Button>
                        <div className='verticalLine'></div>
                        <Button shape='circle' onClick={(e) => this.handleClick(e)} value="4">4</Button>
                        <div className='verticalLine'></div>
                        <Button shape='circle' onClick={(e) => this.handleClick(e)} value="5">5</Button>
                        <div className='verticalLine'></div>
                        <Button shape='circle' onClick={(e) => this.handleClick(e)} value="6">6</Button>
                    </div>
                    
                </div>
                <div 
                    className="newsMain"
                    // onScroll={handleScroll}
                >
                    <Page DataSL={DataSL}></Page>
                </div>
            </div>
            
        )
    }
}