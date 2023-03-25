import React from "react";
import * as d3 from 'd3';

export default class IsoTypeChart extends React.Component {
    constructor(props){
        super(props)
        this.myRef = React.createRef();

        const {Data} = this.props;

        // 数据
        var data_chart=[]
        var data_name=[]
        for (var key in Data) {
            if (Data.hasOwnProperty(key)) {
                var tmp=parseInt(Data[key]["Number of Shots"])
                if (tmp==0) tmp=10
                else tmp=parseInt(Data[key]["Number of Shots"])-parseInt(Data[key]["Made"])
                var data1 = [
                        {name:"Made",value: parseInt(Data[key]["Made"])},
                        {name:"Miss",value:tmp},
                        ];
                        var name=Data[key]["Type"]+"\n"+parseInt(Data[key]["Made"])+"/"+parseInt(Data[key]["Number of Shots"])
                data_chart.push(data1)
                data_name.push(name)
                            }
                        }

        this.state = {
            data_chart : data_chart,
            data_name : data_name
        }
    }

    drawModel = () => {
        let { data_chart, data_name } = this.state;
        const width = 300, height = 300;

        // 定义SVG尺寸和边距
        let svg = d3.select(this.myRef.current)
                    .append('svg')
                    .attr('width',width)
                    .attr('height',height);

        // 定义圆环图参数
        var outerRadius = 45;
        var innerRadius = 35;
        var arc = d3.arc()
            .outerRadius(outerRadius)
            .innerRadius(innerRadius);
        var pie = d3.pie()
            .sort(null)
            .value(function(data) {
              return data.value; });
        // 绘制第一行三个圆环图
        var g1 = svg.append("g")
            .attr("transform", "translate(50,50)");
        var g2 = svg.append("g")
            .attr("transform", "translate(150,50)");
        var g3 = svg.append("g")
            .attr("transform", "translate(250,50)");
        var g4 = svg.append("g")
            .attr("transform", "translate(100,150)");
        var g5 = svg.append("g")
            .attr("transform", "translate(200,150)");
var colorlist=["#8A89A6","white"]
        g1.selectAll("path")
            .data(pie(data_chart[0]))
            .enter()
            .append("path")
            .attr("d", arc)
            .attr("stroke", "black")
            .style("fill", function(d) { return colorlist[d.index]; });
        
            g1.append("text")           
            .attr("text-anchor", "middle")
            .style("font-size", "8px")
            .text(data_name[0]);
        g2.selectAll("path")
            .data(pie(data_chart[1]))
            .enter()
            .append("path")
            .attr("d", arc)
            .attr("stroke", "black")
            .style("fill", function(d) { return  colorlist[d.index]; });
            g2.append("text")           
            .attr("text-anchor", "middle")
            .style("font-size", "8px")
            .text(data_name[1]);
        g3.selectAll("path")
            .data(pie(data_chart[2]))
            .enter()
            .append("path")
            .attr("d", arc)
            .attr("stroke", "black")
            .style("fill", function(d) { return  colorlist[d.index]; });
            g3.append("text")           
            .attr("text-anchor", "middle")
            .style("font-size", "8px")
            .text(data_name[2]);
        // 绘制第二行两个圆环图
        g4.selectAll("path")
            .data(pie(data_chart[3]))
            .enter()
            .append("path")
            .attr("d", arc)
            .attr("stroke", "black")
            .style("fill", function(d) { return  colorlist[d.index]; });
            g4.append("text")           
            .attr("text-anchor", "middle")
            .style("font-size", "8px")
            .text(data_name[3]);
        g5.selectAll("path")
            .data(pie(data_chart[4]))
            .enter()
            .append("path")
            .attr("d", arc)
            .attr("stroke", "black")
            .style("fill", function(d) { return  colorlist[d.index]; });
            g5.append("text")           
            .attr("text-anchor", "middle")
            .style("font-size", "8px")
            .text(data_name[4]);
    }

    componentDidMount() {
        this.drawModel();
    }

    componentDidUpdate(){
        // this.drawModel();
    }

    render() {
        return (
            <div ref={this.myRef} className="isoChart"></div>
        )
    }
}