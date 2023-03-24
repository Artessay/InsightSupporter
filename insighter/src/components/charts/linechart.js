import React from "react";
import * as d3 from 'd3';

export default class LineChart extends React.Component {
    constructor(props){
        super(props)
        this.myRef = React.createRef();

        const {Data} = this.props;

        // 提取数据
        const dataList = [];
        for (const key in Data[0]) {
            if (key !== "Quarter") {
                dataList.push({
                    quarter: Data[0][key].Quarter,
                    homeScore: Data[0][key].Homescore,
                    awayScore: Data[0][key].Awayscore
                });
            }
        }

        this.state = {
            data : dataList,
        }
    }

    drawModel = () => {
        let { data } = this.state;
        console.log("line chart")

        // 定义SVG尺寸和边距
        const width = 500;
        const height = 300;
        const margin = { top: 20, right: 20, bottom: 30, left: 50 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        // 定义x和y比例尺
        const x = d3.scaleBand()
        .domain(data.map(d => d.quarter))
        .range([0, innerWidth])
        .padding(0.1);

        const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => Math.max(d.homeScore, d.awayScore))])
        .nice()
        .range([innerHeight, 0]);

        // 定义折线函数
        const lineHome = d3.line()
        .x(d => x(d.quarter) + x.bandwidth() / 2)
        .y(d => y(d.homeScore));

        const lineAway = d3.line()
        .x(d => x(d.quarter) + x.bandwidth() / 2)
        .y(d => y(d.awayScore));

        // 创建SVG元素并添加折线路径
        const svg = d3.select(this.myRef.current)
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

        svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 5)
        .attr("d", lineHome);

        svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "orange")
        .attr("stroke-width", 5)
        .attr("d", lineAway);

        // 添加x和y轴
        svg.append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(x));

        svg.append("g")
        .call(d3.axisLeft(y));

        var legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(20,20)");

        legend.append("rect")
        .attr("width", 18)
        .attr("height", 18)
        .attr("x", innerWidth-margin.right-60)
        .attr("y", innerHeight-margin.top-50)
        .attr("fill", "steelblue");

        legend.append("text")
        .attr("x", innerWidth-margin.right-40)
        .attr("y", innerHeight-margin.top-40)
        .attr("dy", ".35em")
        .text("Home");


        legend.append("rect")
        .attr("width", 18)
        .attr("height", 18)
        .attr("x", innerWidth-margin.right-60)
        .attr("y", innerHeight-margin.top-30)
        .attr("fill", "orange");

        legend.append("text")
        .attr("x", innerWidth-margin.right-40)
        .attr("y", innerHeight-margin.top-20)
        .attr("dy", ".35em")
        .text("Away");
    }

    componentDidMount() {
        this.drawModel();
    }

    componentDidUpdate(){
        // this.drawModel();
    }

    render() {
        return (
            <div ref={this.myRef} className="lineChart"></div>
        )
    }
}