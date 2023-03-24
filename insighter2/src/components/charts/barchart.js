import React from "react";
import * as d3 from 'd3';

export default class BarChart extends React.Component {
    constructor(props){
        super(props)
        this.myRef = React.createRef();

        const {Data} = this.props;

        let dataList = []
        for ( let key in Data ) {
            if (Data.hasOwnProperty(key)) {
                const quarterData = Data[key];
                const keys = Object.keys(quarterData)
                
                dataList.push({
                    type: quarterData[keys[0]],
                    value: Number(quarterData[keys[1]])
                })
            }
        }

        this.state = {
            data : dataList,
            // [
            //     { type: "Midrange", value: 11 },
            //     { type: "3pt", value: 3 },
            //     { type: "Layup", value: 2 },
            //     { type: "Dunk", value: 3 }
            // ],
            colors : ["#98abc5"]
        }
    }

    drawModel = () => {
        let { data, colors } = this.state;

        const width = 300, height = 300;
        const margin = {top: 30, right: 0, bottom: 30, left: 30};

        
        // d3.selectAll('.barChart').remove();
        // let svg = d3.selectAll('.barChart')
        
        let svg = d3.select(this.myRef.current)
                    .append('svg')
                    .attr('width',width)
                    .attr('height',height)
                    // .attr("transform","translate("+left+","+0+")");
    
        // Define the x and y scales
        var x = d3.scaleBand()
            .range([margin.left, width])
            .padding(0.1)
            .domain(data.map(function(d) { return d.type; }));

        var y = d3.scaleLinear()
            .range([height - margin.top, 0])
            .domain([0, d3.max(data, function(d) { return d.value; })]);

        // Draw the x-axis
        svg.append("g")
        .attr("transform", "translate(0," + (height-margin.bottom) + ")")
        .call(d3.axisBottom(x));

        // Draw the y-axis
        svg.append("g")
        .call(d3.axisLeft(y))
        .attr("transform", "translate(" + margin.left + ", 0)");

        // Draw the bars
        svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.type); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return (height - y(d.value)); })
        .attr("fill", colors[0])
        .attr("transform", "translate(0," + -margin.top + ")");

        // Add title
        svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 + (top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Shots Categorized by Type")
        .attr("transform", "translate(0," + (margin.top/2) + ")");
    }

    componentDidMount() {
        this.drawModel();
    }

    componentDidUpdate(){
        // this.drawModel();
    }

    render() {
        return (
            <div ref={this.myRef} className="barChart"></div>
        )
    }
}