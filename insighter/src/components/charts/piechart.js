import React from "react";
import * as d3 from "d3";
import Title from "antd/es/skeleton/Title";

class PieChart extends React.Component{
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
        // console.log(data, data[0], sum(data), data[0]/sum(data));
        // let oWrapper = this.refs.wrapper;
        let width = 300;
        let height = 300;
        let radius = Math.min(width, height) / 2;

        // Define the pie layout
        let pie = d3.pie();

        // Generate the pie slices
        let arc = d3.arc()
                    .innerRadius(0)
                    .outerRadius(radius);

        // Create the SVG canvas
        // d3.selectAll('svg').remove()

        // let svg = d3.selectAll('.pieChart')
        let svg = d3.select(this.myRef.current)
                    .append('svg')
                    .attr('width',width)
                    .attr('height',height)
                    // .attr("transform","translate("+left+","+0+")");

        // Create the groups for the pie slices
        var arcs = svg.selectAll("arc")
                    .data(pie(data))
                    .enter()
                    .append("g")
                    .attr("class", "arc")
                    .attr("transform", "translate(" + radius + "," + radius + ")");

        // Draw the pie slices
        arcs.append("path")
            .attr("fill", function(d, i) { return colors[i]; })
            .attr("d", arc);

        // Add the percentage text in the center of the pie chart
        arcs.append("text")
            .attr("text-anchor", "middle")
            .attr("font-size", "2em")
            .attr("y", 10)
            .text(function(d) { return d3.format(".1%")(data[0]/sum(data)); });

        // Helper function to calculate the sum of an array
        function sum(arr) {
            return arr.reduce(function(a, b) { return a + b; }, 0);
        }

        // Add the legend
        var legend = svg.selectAll(".legend")
                        .data(colors)
                        .enter()
                        .append("g")
                        .attr("class", "legend")
                        .attr("transform", function(d, i) { return "translate(-10," + (i * 30 + 10) + ")"; });

        // Add legend rectangles
        legend.append("rect")
            .attr("width", 20)
            .attr("height", 20)
            .style("fill", function(d, i) { return colors[i]; });

        // Add legend text
        legend.append("text")
            .attr("x", 30)
            .attr("y", 10)
            .attr("dy", ".35em")
            .text(function(d, i) {
                if (i === 0) {
                    return "Made";
                } else {
                    return "Miss";
                }
            });

        // Add title
        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", -20)   // @TODO
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .text(this.props.Title);
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
                className="pieChart"
            >
            </div>
        )
    }
}

export default PieChart;