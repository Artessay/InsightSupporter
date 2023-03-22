import React  from "react";
// import Drop from "./Drop";
import './Head.css'
// import { Menu } from 'antd';

export default class Head extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.current);
    }
    render() {
        return(
            <div className="Menu">
                <div className="InsightSupporter">
                    InsightSupporter
                </div>
                
                <div className='Calendar'>
                    Mar 17 
                </div>

                <div className="DataSelect"></div>
            </div>
        )
    }
}
