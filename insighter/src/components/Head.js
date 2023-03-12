import React  from "react";
import { Menu } from 'antd';
import Drop from "./Drop";

export default class Head extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.current);
    }
    render() {
        return(
            // <Menu
            //     theme="dark"
            //     mode="horizontal"
            //     style={{
            //         height: 50
            //     }}
            // >
            <div>
                <div
                    className="InsightSupporter"
                    // style={{
                    //     font: 'bold',
                    //     fontSize: 32,
                    //     float: 'left',
                    // }}
                >
                    InsightSupporter
                    
                </div>
                
                <div 
                    className='Calender'
                    // style={{
                    //     float: 'right',
                    //     marginLeft: '2cm'
                    // }}
                > Mar 17 </div>
            {/* </Menu> */}
            </div>
        )
    }
}
