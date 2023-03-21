import React from "react";
import * as d3 from "d3";
import './css/style.css'

class ShotChart extends React.Component{
    constructor(props){
        super(props)

        this.myRef = React.createRef();

        const { Data } = this.props;
        let dataList = [
            Number(Data.Made),
            Number(Data.Miss)
        ]

        // console.log(dataList)

        this.state = {
            // Define the data
            data : dataList,
            
            // Define the colors
            colors : ["#98abc5", "#8a89a6"],
        }
    }

    drawModel = () => {
        let { data, colors } = this.state;
        
        
    }

    componentDidMount(){
        this.drawModel();
    }

    componentDidUpdate(){
        // this.drawModel();
    }

    render(){
        return (
            <>
                <div  class="shotChartBackground"></div>
                <div
                    ref={this.myRef} 
                    className="shotChart"
                >
                </div>
            </>
            
        )
    }
}

export default ShotChart;