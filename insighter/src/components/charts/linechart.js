import React from "react";
import * as d3 from 'd3';

export default class LineChart extends React.Component {
    constructor(props){
        super(props)
        this.myRef = React.createRef();

        const {Data} = this.props;

        // 提取数据
        const dataList = [];
        for (const key in Data) {
            if (key !== "Quarter") {
                dataList.push({
                    quarter: Data[key].Quarter,
                    homeScore: Data[key].Homescore,
                    awayScore: Data[key].Awayscore
                });
            }
        }
        // console.log(dataList)

        this.state = {
            data : dataList,
            colors : ["#98abc5", "#8a89a6"],
            // colors : ["steelblue", "orange"],
        }
    }

    drawModel = () => {
        let { data, colors } = this.state;
        // console.log("line chart")
        // console.log(data)

        // 定义SVG尺寸和边距
        const width = 300;
        const height = 300;
        const margin = { top: 30, right: 20, bottom: 30, left: 20 };
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
        // let svg = d3
        //         .select(this.myRef.current)
        //         .attr("width", width)
        //         .attr("height", height)
        //         .append("g")
        //         .attr("transform", `translate(${margin.left},${margin.top})`);
        let svg = d3.select(this.myRef.current)
                    .append('svg')
                    .attr('width',width)
                    .attr('height',height)
                    .attr("transform", `translate(${margin.left},${margin.top})`);

        svg.append("path")
            .datum(data)
            .attr("transform", `translate(${margin.left},0)`)
            .attr("fill", "none")
            .attr("stroke", colors[0])
            .attr("stroke-width", 5)
            .attr("d", lineHome);

        svg.append("path")
            .datum(data)
            .attr("transform", `translate(${margin.left},0)`)
            .attr("fill", "none")
            .attr("stroke", colors[1])
            .attr("stroke-width", 5)
            .attr("d", lineAway);

        // 添加x和y轴
        svg.append("g")
        .attr("transform", `translate(${margin.left},${innerHeight})`)
        .call(d3.axisBottom(x));

        svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));

        var legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(20,20)");

        legend.append("rect")
        .attr("width", 18)
        .attr("height", 18)
        .attr("transform", `translate(${margin.left},0)`)
        .attr("x", innerWidth-margin.right-60)
        .attr("y", innerHeight-margin.top-50)
        .attr("fill", colors[0]);

        legend.append("text")
        .attr("transform", `translate(${margin.left},0)`)
        .attr("x", innerWidth-margin.right-40)
        .attr("y", innerHeight-margin.top-40)
        .attr("dy", ".35em")
        .text("Home");


        legend.append("rect")
        .attr("width", 18)
        .attr("height", 18)
        .attr("transform", `translate(${margin.left},0)`)
        .attr("x", innerWidth-margin.right-60)
        .attr("y", innerHeight-margin.top-30)
        .attr("fill", colors[1]);

        legend.append("text")
        .attr("transform", `translate(${margin.left},0)`)
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