import React  from "react";
import Drop from "./Drop";
import './Head.css'
import DatePickerButton from "./DatePickerButton.js";
// import { Menu } from 'antd';

export default class Head extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: this.props.JsonData.Date
        }
    }
    render() {
        return(
            <div className="Menu">
                <div className="InsightSupporter">
                    InsightSupporter
                </div>
                
                <div className='Calendar'>
                    {this.state.date}
                </div>

                {/* <div className="DataSelect"></div> */}
                {/* <DatePickerButton className='DataSelect'></DatePickerButton> */}
                <Drop></Drop>
            </div>
        )
    }
}
