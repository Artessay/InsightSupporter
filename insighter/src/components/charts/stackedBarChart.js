import React from "react";
import * as d3 from 'd3';

export default class StackedBarChart extends React.Component {
    constructor(props){
        super(props)
        this.myRef = React.createRef();

        const {Data} = this.props;

        let tableList = []
        for ( let key in Data ) {
            if (Data.hasOwnProperty(key)) {
                const quarterData = Data[key];
                const keys = Object.keys(quarterData)
                tableList.push({
                    quarter: quarterData[keys[0]],
                    miss: (Number(quarterData["Number of Shots"]) - Number(quarterData["Made"])),
                    made: Number(quarterData.Made)
                })
            }
        }
        
        // console.log(tableList)

        this.state = {
            data: tableList,
            colors: ["#98abc5", "#8a89a6"],
            title: this.props.Title,
        }
    }

    drawModel = () => {
        const margin = {top: 30, right: 0, bottom: 30, left: 30};
        const width = 300, height = 300;
        
        let svg = d3.select(this.myRef.current)
                    .append('svg') 
                    .attr('width', width)
                    .attr('height', height)
                    // .attr("transform","translate("+margin.left+","+margin.top+")");

        let { data, colors, title } = this.state;

        // Transpose the data into layers
        var dataset = d3.stack()
                        .keys(["made", "miss"])
                        (data);

        // Set the x scale
        var x = d3.scaleBand()
                  .domain(data.map(function(d) { return d.quarter; }))
                  .range([margin.left, width-margin.right])
                  .padding(0.1);

        // Set the y scale
        var y = d3.scaleLinear()
                  .domain([0, 1.2*d3.max(dataset, function(d) { return d3.max(d, function(d) { return d[1]; }); })])
                  .range([height-margin.bottom, margin.top]);

        // Draw the bars
        svg.selectAll(".layer")
           .data(dataset)
           .enter()
           .append("g")
           .attr("class", "layer")
           .style("fill", function(d, i) { return colors[i]; })
           .selectAll("rect")
           .data(function(d) { return d; })
           .enter()
           .append("rect")
           .attr("x", function(d) { return x(d.data.quarter); })
           .attr("y", function(d) { return y(d[1]); })
           .attr("height", function(d) { return y(d[0]) - y(d[1]); })
           .attr("width", x.bandwidth());

        // Add the x axis
        svg.append("g")
           .attr("transform", "translate(0," + (height-margin.bottom) + ")")
           .call(d3.axisBottom(x))
           .selectAll("text")
           .style("text-anchor", "center");


        // Add the y axis
        svg.append("g")
           .call(d3.axisLeft(y))
           .attr("transform", "translate(" + margin.left + ", 0)");

        // Add legend
        var legend = svg.selectAll(".legend")
                        .data(colors)
                        .enter().append("g")
                        .attr("class", "legend")
                        .attr("transform", function(d, i) { return "translate(0," + (i * 20 + margin.top)+ ")"; });

        // Add legend rectangles
        legend.append("rect")
              .attr("x", width - 18)
              .attr("width", 18)
              .attr("height", 18)
              .style("fill", function(d, i) { return colors.slice().reverse()[i]; });

        // Add legend text
        legend.append("text")
              .attr("x", width - 24)
              .attr("y", 9)
              .attr("dy", ".35em")
              .style("text-anchor", "end")
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
           .attr("y", 0 + (margin.top / 2)) // @TODO
           .attr("text-anchor", "middle")
           .style("font-size", "16px")
           .text(title);

        // Add x axis label
        svg.append("text")
           .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom / 2) + ")")
           .style("text-anchor", "middle")
           .text("Quarter");

        // Add y axis label
        svg.append("text")
           .attr("transform", "rotate(-90)")
           .attr("y", 0 + margin.left) 
           .attr("x", 0 + (height / 2))
           .attr("dy", "1em")
           .style("text-anchor", "middle");
    }

    componentDidMount() {
        this.drawModel();
    }

    componentDidUpdate(){
        // this.drawModel();
    }

    render() {
        return (
            <div ref={this.myRef} className="stackedBarChart"></div>
        )
    }
}