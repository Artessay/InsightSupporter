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
            <Menu
                theme="dark"
                mode="horizontal"
                style={{
                    height: 50
                }}
            >
                <div
                    style={{
                        font: 'bold',
                        fontSize: 32
                    }}
                >
                    InsightSupporter
                    
                </div>
                <div
                     style={{
                        // textAlign: 'right',
                        // float: 'right',
                        // margin: 10
                     }}
                >
                    <Drop />
                </div>
            </Menu>
        )
    }
}
