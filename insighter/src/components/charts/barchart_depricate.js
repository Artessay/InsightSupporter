import React from "react";
import * as d3 from 'd3';

export default class BarCharts extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            // 
        }
    }

    drawModel = () => {
        const width = 300, height = 300;
        const dataset = [34, 23, 54, 73, 88, 4];
        const rectWidth = width / dataset.length;

        let svg = d3.select('.barChart')
                    .append('svg')                  // 添加一个svg元素
                    .attr('width', width)
                    .attr('height', height);
    
        // y轴比例尺
        let yScale = d3.scaleLinear()
                    .range([height, 0])
                    .domain([0, d3.max(dataset)]);
    
        svg.selectAll('rect')
            .data(dataset)
            .enter()
            .append('rect')
            .attr('x', (d, i) => rectWidth * i)
            .attr('y', d => yScale(d))
            .attr('width', rectWidth / 2)
            .attr('height', d => {
                return height - yScale(d);
            });
    }

    componentDidMount() {
        this.drawModel();
    }

    render() {
        return (
            <div className="barChart"></div>
        )
    }
}