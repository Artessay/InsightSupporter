import React from "react";
import * as d3 from 'd3';
import LR from "../../data/Low_Relation.json"
import SR from "../../data/Strong_Relation.json"
import sum from "../../data/new_summary.json"

export default class FlowChart extends React.Component {
    constructor(props){
        super(props)
        this.myRef = React.createRef();
    }

    drawModel = () => {
        var re="";
        var focus_low = [];
      for (var m=0;m< LR.Low_Relation.length;m++){
        re="Low"
        if (LR.Low_Relation[m]){
          for (var lq=0;lq< SR.Strong_Relation.length;lq++){
            if(LR.Low_Relation[m].id==SR.Strong_Relation[lq].id)
              re="Strong"
          }
          var lt=LR.Low_Relation[m].clock.displayValue.split(":")
          
          if(lt[1]){
            //console.log(data[i-1])
            if(focus_low[m-1]!={quarter:LR.Low_Relation[m].period.number,time:LR.Low_Relation[m].clock.displayValue,x:(LR.Low_Relation[m].period.number-1)*720+(720-lt[0]*60-lt[1]),y:LR.Low_Relation[m].awayScore-LR.Low_Relation[m].homeScore,type:LR.Low_Relation[m].actionType})
            focus_low.push({id:LR.Low_Relation[m].id,quarter:LR.Low_Relation[m].period.number,time:LR.Low_Relation[m].clock.displayValue,x:(LR.Low_Relation[m].period.number-1)*720+(720-lt[0]*60-lt[1]),y:LR.Low_Relation[m].awayScore-LR.Low_Relation[m].homeScore,type:LR.Low_Relation[m].actionType,text:LR.Low_Relation[m].text,miss:LR.Low_Relation[m].scoringPlay,re:re})
          }
          else{
            if(focus_low[m-1]!={quarter:LR.Low_Relation[m].period.number,time:LR.Low_Relation[m].clock.displayValue,x:(LR.Low_Relation[m].period.number-1)*720+(720-lt[0]),y:LR.Low_Relation[m].awayScore-LR.Low_Relation[m].homeScore,type:LR.Low_Relation[m].actionType})
            focus_low.push({id:LR.Low_Relation[m].id,quarter:LR.Low_Relation[m].period.number,time:LR.Low_Relation[m].clock.displayValue,x:(LR.Low_Relation[m].period.number-1)*720+(720-lt[0]),y:LR.Low_Relation[m].awayScore-LR.Low_Relation[m].homeScore,type:LR.Low_Relation[m].actionType,text:LR.Low_Relation[m].text,miss:LR.Low_Relation[m].scoringPlay,re:re})
          }
        }
      } 
    //   console.log(focus_low)



      var data = [];
      for (var i=0;i< sum.plays.length;i++){
        if (sum.plays[i]){
          var t=sum.plays[i].clock.displayValue.split(":")
          if(t[1]){
            //console.log(data[i-1])
            if(data[i-1]!={quarter:sum.plays[i].period.number,time:sum.plays[i].clock.displayValue,x:(sum.plays[i].period.number-1)*720+(720-t[0]*60-t[1]),y:sum.plays[i].awayScore-sum.plays[i].homeScore})
                data.push({quarter:sum.plays[i].period.number,time:sum.plays[i].clock.displayValue,x:(sum.plays[i].period.number-1)*720+(720-t[0]*60-t[1]),y:sum.plays[i].awayScore-sum.plays[i].homeScore})
          }
          else{
            if(data[i-1]!={quarter:sum.plays[i].period.number,time:sum.plays[i].clock.displayValue,x:(sum.plays[i].period.number-1)*720+(720-t[0]),y:sum.plays[i].awayScore-sum.plays[i].homeScore})
                data.push({quarter:sum.plays[i].period.number,time:sum.plays[i].clock.displayValue,x:(sum.plays[i].period.number-1)*720+(720-t[0]),y:sum.plays[i].awayScore-sum.plays[i].homeScore})
          }
        }
      }
      //console.log(data)
      
      // 定义画布尺寸和边距
    //   const margin = { top: 50, right: 50, bottom: 50, left: 50 };
      const width = 400;
      const height = 110;

        // 定义SVG尺寸和边距
        let svg = d3.select(this.myRef.current)
                    .append('svg')
                    .attr('width',width)
                    .attr('height',height);

        // 定义比例尺和坐标轴
      const xScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.x))
      .range([0, width]);
    
    const yScale = d3.scaleLinear()
      .domain([-(d3.max(data, d => d.y)), d3.max(data, d => d.y)])
      .range([height, 0]);
    
   var xAxis = d3.axisBottom(xScale)        
   .tickValues([])
   .tickSize(0);
    const yAxis = d3.axisLeft(yScale)
    .tickValues([]);
    
    var Qline = d3.line()
.x(function(d) { return d.x; })
.y(function(d) { return d.y; });

// 封装绘制虚线和数字标签的函数
function drawDashedLineWithLabel(xPosition, label) {
// 创建虚线路径的数据点
var lineData = [
  { x: xPosition, y: 0 },
  { x: xPosition, y: 110 }
];

// 在SVG中绘制虚线路径
svg.append("path")
  .attr("class", "dashed-line")
  .attr("d", Qline(lineData))
  .style("stroke", "black")
  .style("stroke-width", "2.5px")
  .style("stroke-dasharray", "4,4");

// 在SVG中添加数字标签
svg.append("text")
  .attr("x", xPosition-100)
  .attr("y", height + 20)
  .style("text-anchor", "middle")
  .text(label);
}

// 定义需要绘制的虚线和数字标签
var Qlines = [
{ x: 0, label: "" },
{ x: 200, label: "" },
{ x: 400, label: "" },
];

// 循环调用绘制虚线和数字标签的函数
for (var i = 0; i < Qlines.length; i++) {
var Lline = Qlines[i];
drawDashedLineWithLabel(Lline.x, Lline.label);
}



    // 添加坐标轴
    svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${height/2})`)
      .call(xAxis)
      .style("color", "#98ABC5")
      .attr("stroke-dasharray", "2 2");
    
    
    // 绘制阶梯折线图
    const line = d3.line()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y))
      .curve(d3.curveStepAfter);
    
    svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);
    }

    componentDidMount() {
        this.drawModel();
    }

    componentDidUpdate(){
        // this.drawModel();
    }

    render() {
        return (
            <div ref={this.myRef} style={{ transform: "scale(0.8)"}}className="flowChart"></div>
        )
    }
}