// import { Anchor, Col, Row } from 'antd';
// import React, { useEffect, useState } from 'react';
import React from 'react';
import './News.css'
import { Button, Radio } from 'antd';

export default class News extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.current);

        this.state = {
            group: 1
        }
    }

    handleClick = (e) => {
        this.setState({
            group: e.target.value
        })
    }

    render() {
        // const handleScroll = event => {
            
        // }
        
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
                        <Button shape='circle' value="1">1</Button>
                        <div className='verticalLine'></div>
                        <Button shape='circle' value="2">2</Button>
                        <div className='verticalLine'></div>
                        <Button shape='circle' value="3">3</Button>
                        <div className='verticalLine'></div>
                        <Button shape='circle' value="4">4</Button>
                        <div className='verticalLine'></div>
                        <Button shape='circle' value="5">5</Button>
                        <div className='verticalLine'></div>
                        <Button shape='circle' value="6">6</Button>
                    </div>
                    
                </div>
                <div 
                    className="newsMain"
                    // onScroll={handleScroll}
                >
                    
                </div>
            </div>
            
        )
    }
}