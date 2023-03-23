import React from "react";
import * as d3 from 'd3';

export default class Shot extends React.Component {
    constructor(props){
        super(props)
        this.myRef = React.createRef();

        
    }

    drawModel = () => {
        
    }

    componentDidMount() {
        this.drawModel();
    }

    componentDidUpdate(){
        // this.drawModel();
    }

    render() {
        return (
            <div ref={this.myRef} className="ShotChart"></div>
        )
    }
}