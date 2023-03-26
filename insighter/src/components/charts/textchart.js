import React from "react";
import * as d3 from "d3";

class TextChart extends React.Component{
    constructor(props){
        super(props)

        this.myRef = React.createRef();

        const { Data } = this.props;

        this.state = {
            data : Data,
            colors : ["#98abc5", "#8a89a6"],
            // colors : ["steelblue", "orange"],
        }
    }

    drawModel = () => {
        let { data, colors } = this.state;
        
        // 定义SVG尺寸和边距
        const width = 300;
        const height = 300;
        const margin = { top: 20, right: 20, bottom: 20, left: 20 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const svg = d3
            .select(this.myRef.current)
            .append("svg")
            .attr("width", width)
            .attr("height", height);
            // .append("g");
                    

        svg
            .append("text")
            // .append("div")
            // .attr("x", width/2)
            // .attr("y", ((innerHeight/2)-margin.top-20))
            .attr("transform", `translate(${width/2},${innerHeight/2-margin.top-20})`)
            .style("font-size", "32px")
            .attr("text-anchor", "middle")
            .style("font-weight", "bold")
            .style("text-decoration", "underline")
            .attr("fill", colors[0])
            .text(data["1"]["title"]);


        svg
            .append("text")
            // .append("div")
            // .attr("x", width/2)
            // .attr("y", ((innerHeight/2)+margin.top))
            .attr("transform", `translate(${width/2},${innerHeight/2+margin.top})`)
            .style("font-weight", "bolder")
            .style("font-size", "72px")
            .attr("text-anchor", "middle")
            .attr("dy", ".35em")
            .attr("fill", colors[1])
            .text(data["1"]["text"]);
    }

    componentDidMount(){
        this.drawModel();
    }

    componentDidUpdate(){
        // this.drawModel();
    }

    render(){
        return (
            <div
                ref={this.myRef} 
                className="textChart"
            >
            </div>
        )
    }
}

export default TextChart;