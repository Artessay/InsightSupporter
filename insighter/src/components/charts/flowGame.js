import React ,{Component} from "react";
import { createRef } from 'react';
import './Data.css'
// import summary from '../../data/summary_401360853.json' //assert {type:'JSON'};
import * as d3 from "d3";
// import { render } from "@testing-library/react";
import sum from '../../data/new_summary.json' 
import LR from '../../data/Low_Relation.json' 
import SR from '../../data/Strong_Relation.json' 
import assist from'../../icon/assist.png';
import assist_s from'../../icon/assist_s.png';
import three from'../../icon/3.png';
import three_s from'../../icon/3_s.png';
import blk from'../../icon/blk.png';
import blk_s from'../../icon/blk_s.png';
import dr from'../../icon/dr.png';
import dr_s from'../../icon/dr_s.png';
import miss from'../../icon/miss.png';
import miss_s from'../../icon/miss_s.png';
import or from'../../icon/or.png';
import or_s from'../../icon/or_s.png';
import pf from'../../icon/pf.png';
import pf_s from'../../icon/pf_s.png';
import stl from'../../icon/stl.png';
import stl_s from'../../icon/stl_s.png';
import ft from'../../icon/t.png';
import ft_s from'../../icon/t_s.png';
import to from'../../icon/to.png';
import to_s from'../../icon/to_s.png';
import two from'../../icon/2.png';
import two_s from'../../icon/2_s.png';

class FlowGame extends Component {
    
    componentDidMount() {
      console.log("Game Flow")
      this.drawChart();
    }


    drawChart(){
      var focus_low = [];
      for (var m=0;m< LR.Low_Relation.length;m++){
        var re="Low"
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
    console.log(focus_low)



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
// const margin = { top: 70, right: 50, bottom: 50, left: 1020 };
// const width = 800;
// const height = 110;
const margin = { top: 0, right: 0, bottom: 50, left: 600 };
const width = 800;
const height = 110;
// const transformLeft = 600;

// 创建SVG元素并设置尺寸
const svg = d3.select(".flowGame")
            .append('svg')
            .attr('width',width)
            .attr('height',height)
            .attr("transform","translate("+0+","+0+")");
//   .append("svg")
//   .attr("width", width + margin.left + margin.right)
//   .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//   .attr("transform", `translate(${margin.left}, ${margin.top})`);

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
{ x: 600, label: "" },
{ x: 800, label: "" }
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

//svg.append("g")
  //.attr("class", "y-axis")
  //.call(yAxis);

// 绘制阶梯折线图
const line = d3.line()
  .x(d => xScale(d.x))
  .y(d => yScale(d.y))
  .curve(d3.curveStepAfter);

svg.append("path")
  .datum(data)
  .attr("class", "line")
  .attr("d", line);
// 在SVG中添加一个组，用于存放PNG图标
var icons = svg.append("g");

// 在个别数据点上显示数据点
const points = svg.selectAll(".dot")
  .data(focus_low)
  .enter()
  .append("circle")
  //.attr("class", "dot")
  //.attr("cx", d => xScale(d.x))
  //.attr("cy", d => yScale(d.y))
  .attr("r", 0) 
  .each(function(d) {
  //console.log(d)
// 在每个数据点上添加PNG图标
if(d.type.includes("assist")){
var group = svg.append("g")
.attr("transform", "translate(0, 0)");
var rect = group.append("rect")
.attr("x", 200) // set the x position of the text
.attr("y",47)
.attr("width", 400)
.attr("height", 17)
.attr("fill", "black")
.style("display", "none");
var text = group.append("text")
.attr("x",  parseInt(rect.attr("x"))+ parseInt((rect.attr("width") / 2))) // set the x position of the text
.attr("y",parseInt(rect.attr("y"))+parseInt((rect.attr("height") / 2)) + 5) // set the y position of the text
.text(d.text)
.style("font-size", "10px") // set the font size to 20 pixels
.style("fill", "White") // set the text content of the text element
.attr("text-anchor", "middle")
.style("display", "none"); // hide the text element by default
icons.append("svg:image")
.attr("xlink:href", function() {
    //console.log("hi")
  if (d.re === "Low") {
      return assist;
  } else if (d.re === "Strong") {
    console.log("hi")
      return assist_s;
  }
})
.attr("x", xScale(d.x)-4) // 图像在数据点上的水平偏移量
.attr("y", yScale(d.y)-4) // 图像在数据点上的垂直偏移量
.attr("width", 8) // 图像的宽度
.attr("height", 8)
.on("mouseover", function() { // 鼠标悬停时显示文本
  text.style("display", "block");
  rect.style("display", "block");
      })
.on("mouseout", function(d) { // 鼠标移开时隐藏文本
  text.style("display", "none");
  rect.style("display", "none");
      });
}
if(d.type.includes("hot")){
var group = svg.append("g")
.attr("transform", "translate(0, 0)");
var rect = group.append("rect")
.attr("x", 200) // set the x position of the text
.attr("y",47)
.attr("width", 400)
.attr("height", 17)
.attr("fill", "black")
.style("display", "none");
var text = group.append("text")
.attr("x",  parseInt(rect.attr("x"))+ parseInt((rect.attr("width") / 2))) // set the x position of the text
.attr("y",parseInt(rect.attr("y"))+parseInt((rect.attr("height") / 2)) + 5) // set the y position of the text
.text(d.text)
.style("font-size", "10px") // set the font size to 20 pixels
.style("fill", "White") // set the text content of the text element
.attr("text-anchor", "middle")
.style("display", "none"); // hide the text element by default
if(d.miss.includes("True")){
if(d.text.includes("three")){
  icons.append("svg:image")
  .attr("xlink:href", function() {
  if (d.re === "Low") {
      return three;
  } else if (d.re === "Strong") {
      return three_s;
  }
})
.attr("x", xScale(d.x)-4) // 图像在数据点上的水平偏移量
.attr("y", yScale(d.y)-4) // 图像在数据点上的垂直偏移量
.attr("width", 8) // 图像的宽度
.attr("height", 8) 
.on("mouseover", function() { // 鼠标悬停时显示文本
  text.style("display", "block");
  rect.style("display", "block");
      })
.on("mouseout", function(d) { // 鼠标移开时隐藏文本
  text.style("display", "none");
  rect.style("display", "none");
      });
}
else{
  var group = svg.append("g")
.attr("transform", "translate(0, 0)");
var rect = group.append("rect")
.attr("x", 200) // set the x position of the text
.attr("y",47)
.attr("width", 400)
.attr("height", 17)
.attr("fill", "black")
.style("display", "none");
var text = group.append("text")
.attr("x",  parseInt(rect.attr("x"))+ parseInt((rect.attr("width") / 2))) // set the x position of the text
.attr("y",parseInt(rect.attr("y"))+parseInt((rect.attr("height") / 2)) + 5) // set the y position of the text
.text(d.text)
.style("font-size", "10px") // set the font size to 20 pixels
.style("fill", "White") // set the text content of the text element
.attr("text-anchor", "middle")
.style("display", "none"); // hide the text element by default
  icons.append("svg:image")
  .attr("xlink:href", function() {
  if (d.re === "Low") {
      return two;
  } else if (d.re === "Strong") {
      return two_s;
  }
})
.attr("x", xScale(d.x)-4) // 图像在数据点上的水平偏移量
.attr("y", yScale(d.y)-4) // 图像在数据点上的垂直偏移量
.attr("width", 8) // 图像的宽度
.attr("height", 8)
.on("mouseover", function() { // 鼠标悬停时显示文本
  text.style("display", "block");
  rect.style("display", "block");
      })
.on("mouseout", function(d) { // 鼠标移开时隐藏文本
  text.style("display", "none");
  rect.style("display", "none");
      });
}
}else{

var group = svg.append("g")
.attr("transform", "translate(0, 0)");
var rect = group.append("rect")
.attr("x", 200) // set the x position of the text
.attr("y",47)
.attr("width", 400)
.attr("height", 17)
.attr("fill", "black")
.style("display", "none");
var text = group.append("text")
.attr("x",  parseInt(rect.attr("x"))+ parseInt((rect.attr("width") / 2))) // set the x position of the text
.attr("y",parseInt(rect.attr("y"))+parseInt((rect.attr("height") / 2)) + 5) // set the y position of the text
.text(d.text)
.style("font-size", "10px") // set the font size to 20 pixels
.style("fill", "White") // set the text content of the text element
.attr("text-anchor", "middle")
.style("display", "none"); // hide the text element by default
icons.append("svg:image")
.attr("xlink:href", function() {
  if (d.re === "Low") {
      return miss;
  } else if (d.re === "Strong") {
      return miss_s;
  }
})
//.attr("cx", function(d) { return xScale(d.x)-4; })
//.attr("cy", function(d) { return yScale(d.y)-4; })
.attr("x", xScale(d.x)-4) // 图像在数据点上的水平偏移量
.attr("y", yScale(d.y)-4) // 图像在数据点上的垂直偏移量
.attr("width", 8) // 图像的宽度
.attr("height", 8)// 图像的高度
.on("mouseover", function() { // 鼠标悬停时显示文本
  text.style("display", "block");
  rect.style("display", "block");
      })
.on("mouseout", function(d) { // 鼠标移开时隐藏文本
  text.style("display", "none");
  rect.style("display", "none");
      });
}

}if(d.type.includes("assist")){
var group = svg.append("g")
.attr("transform", "translate(0, 0)");
var rect = group.append("rect")
.attr("x", 200) // set the x position of the text
.attr("y",47)
.attr("width", 400)
.attr("height", 17)
.attr("fill", "black")
.style("display", "none");
var text = group.append("text")
.attr("x",  parseInt(rect.attr("x"))+ parseInt((rect.attr("width") / 2))) // set the x position of the text
.attr("y",parseInt(rect.attr("y"))+parseInt((rect.attr("height") / 2)) + 5) // set the y position of the text
.text(d.text)
.style("font-size", "10px") // set the font size to 20 pixels
.style("fill", "White") // set the text content of the text element
.attr("text-anchor", "middle")
.style("display", "none"); // hide the text element by default
icons.append("svg:image")
.attr("xlink:href", function() {
  if (d.re === "Low") {
      return assist;
  } else if (d.re === "Strong") {
      return assist_s;
  }
})
.attr("x", xScale(d.x)-4) // 图像在数据点上的水平偏移量
.attr("y", yScale(d.y)-4) // 图像在数据点上的垂直偏移量
.attr("width", 8) // 图像的宽度
.attr("height", 8)
.on("mouseover", function() { // 鼠标悬停时显示文本
  text.style("display", "block");
  rect.style("display", "block");
      })
.on("mouseout", function(d) { // 鼠标移开时隐藏文本
  text.style("display", "none");
  rect.style("display", "none");
      });
}
if(d.type.includes("steal")){
var group = svg.append("g")
.attr("transform", "translate(0, 0)");
var rect = group.append("rect")
.attr("x", 200) // set the x position of the text
.attr("y",47)
.attr("width", 400)
.attr("height", 17)
.attr("fill", "black")
.style("display", "none");
var text = group.append("text")
.attr("x",  parseInt(rect.attr("x"))+ parseInt((rect.attr("width") / 2))) // set the x position of the text
.attr("y",parseInt(rect.attr("y"))+parseInt((rect.attr("height") / 2)) + 5) // set the y position of the text
.text(d.text)
.style("font-size", "10px") // set the font size to 20 pixels
.style("fill", "White") // set the text content of the text element
.attr("text-anchor", "middle")
.style("display", "none"); // hide the text element by default
icons.append("svg:image")
.attr("xlink:href", function() {
  if (d.re === "Low") {
      return stl;
  } else if (d.re === "Strong") {
      return stl_s;
  }
})
.attr("x", xScale(d.x)-4) // 图像在数据点上的水平偏移量
.attr("y", yScale(d.y)-4) // 图像在数据点上的垂直偏移量
.attr("width", 8) // 图像的宽度
.attr("height", 8)
.on("mouseover", function() { // 鼠标悬停时显示文本
  text.style("display", "block");
  rect.style("display", "block");
      })
.on("mouseout", function(d) { // 鼠标移开时隐藏文本
  text.style("display", "none");
  rect.style("display", "none");
      });
}
if(d.type.includes("block")){
var group = svg.append("g")
.attr("transform", "translate(0, 0)");
var rect = group.append("rect")
.attr("x", 200) // set the x position of the text
.attr("y",47)
.attr("width", 400)
.attr("height", 17)
.attr("fill", "black")
.style("display", "none");
var text = group.append("text")
.attr("x",  parseInt(rect.attr("x"))+ parseInt((rect.attr("width") / 2))) // set the x position of the text
.attr("y",parseInt(rect.attr("y"))+parseInt((rect.attr("height") / 2)) + 5) // set the y position of the text
.text(d.text)
.style("font-size", "10px") // set the font size to 20 pixels
.style("fill", "White") // set the text content of the text element
.attr("text-anchor", "middle")
.style("display", "none"); // hide the text element by default
icons.append("svg:image")
.attr("xlink:href", function() {
  if (d.re === "Low") {
      return blk;
  } else if (d.re === "Strong") {
      return blk_s;
  }
})
.attr("x", xScale(d.x)-4) // 图像在数据点上的水平偏移量
.attr("y", yScale(d.y)-4) // 图像在数据点上的垂直偏移量
.attr("width", 8) // 图像的宽度
.attr("height", 8)
.on("mouseover", function() { // 鼠标悬停时显示文本
  text.style("display", "block");
  rect.style("display", "block");
      })
.on("mouseout", function(d) { // 鼠标移开时隐藏文本
  text.style("display", "none");
  rect.style("display", "none");
      });
}
if(d.type.includes("Free")){
var group = svg.append("g")
.attr("transform", "translate(0, 0)");
var rect = group.append("rect")
.attr("x", 200) // set the x position of the text
.attr("y",47)
.attr("width", 400)
.attr("height", 17)
.attr("fill", "black")
.style("display", "none");
var text = group.append("text")
.attr("x",  parseInt(rect.attr("x"))+ parseInt((rect.attr("width") / 2))) // set the x position of the text
.attr("y",parseInt(rect.attr("y"))+parseInt((rect.attr("height") / 2)) + 5) // set the y position of the text
.text(d.text)
.style("font-size", "10px") // set the font size to 20 pixels
.style("fill", "White") // set the text content of the text element
.attr("text-anchor", "middle")
.style("display", "none"); // hide the text element by default
icons.append("svg:image")
.attr("xlink:href", function() {
  if (d.re === "Low") {
      return ft;
  } else if (d.re === "Strong") {
      return ft_s;
  }
})
.attr("x", xScale(d.x)-4) // 图像在数据点上的水平偏移量
.attr("y", yScale(d.y)-4) // 图像在数据点上的垂直偏移量
.attr("width", 8) // 图像的宽度
.attr("height", 8)
.on("mouseover", function() { // 鼠标悬停时显示文本
  text.style("display", "block");
  rect.style("display", "block");
      })
.on("mouseout", function(d) { // 鼠标移开时隐藏文本
  text.style("display", "none");
  rect.style("display", "none");
      });
}
if(d.type.includes("Foul")){
var group = svg.append("g")
.attr("transform", "translate(0, 0)");
var rect = group.append("rect")
.attr("x", 200) // set the x position of the text
.attr("y",47)
.attr("width", 400)
.attr("height", 17)
.attr("fill", "black")
.style("display", "none");
var text = group.append("text")
.attr("x",  parseInt(rect.attr("x"))+ parseInt((rect.attr("width") / 2))) // set the x position of the text
.attr("y",parseInt(rect.attr("y"))+parseInt((rect.attr("height") / 2)) + 5) // set the y position of the text
.text(d.text)
.style("font-size", "10px") // set the font size to 20 pixels
.style("fill", "White") // set the text content of the text element
.attr("text-anchor", "middle")
.style("display", "none"); // hide the text element by default
icons.append("svg:image")
.attr("xlink:href", function() {
  if (d.re === "Low") {
      return pf;
  } else if (d.re === "Strong") {
      return pf_s;
  }
})
.attr("x", xScale(d.x)-4) // 图像在数据点上的水平偏移量
.attr("y", 97) // 图像在数据点上的垂直偏移量
.attr("width", 8) // 图像的宽度
.attr("height", 8)
.on("mouseover", function() { // 鼠标悬停时显示文本
  text.style("display", "block");
  rect.style("display", "block");
      })
.on("mouseout", function(d) { // 鼠标移开时隐藏文本
  text.style("display", "none");
  rect.style("display", "none");
      });
}
if(d.type.includes("Turnover")){
var group = svg.append("g")
.attr("transform", "translate(0, 0)");
var rect = group.append("rect")
.attr("x", 200) // set the x position of the text
.attr("y",47)
.attr("width", 400)
.attr("height", 17)
.attr("fill", "black")
.style("display", "none");
var text = group.append("text")
.attr("x",  parseInt(rect.attr("x"))+ parseInt((rect.attr("width") / 2))) // set the x position of the text
.attr("y",parseInt(rect.attr("y"))+parseInt((rect.attr("height") / 2)) + 5) // set the y position of the text
.text(d.text)
.style("font-size", "10px") // set the font size to 20 pixels
.style("fill", "White") // set the text content of the text element
.attr("text-anchor", "middle")
.style("display", "none"); // hide the text element by default
icons.append("svg:image")
.attr("xlink:href", function() {
  if (d.re === "Low") {
      return to;
  } else if (d.re === "Strong") {
      return to_s;
  }
})
.attr("x", xScale(d.x)-4) // 图像在数据点上的水平偏移量
.attr("y", 97) // 图像在数据点上的垂直偏移量
.attr("width", 8) // 图像的宽度
.attr("height", 8)
.on("mouseover", function() { // 鼠标悬停时显示文本
  text.style("display", "block");
  rect.style("display", "block");
      })
.on("mouseout", function(d) { // 鼠标移开时隐藏文本
  text.style("display", "none");
  rect.style("display", "none");
      });
}
if(d.type.includes("Defensive Rebound")){
var group = svg.append("g")
.attr("transform", "translate(0, 0)");
var rect = group.append("rect")
.attr("x", 200) // set the x position of the text
.attr("y",47)
.attr("width", 400)
.attr("height", 17)
.attr("fill", "black")
.style("display", "none");
var text = group.append("text")
.attr("x",  parseInt(rect.attr("x"))+ parseInt((rect.attr("width") / 2))) // set the x position of the text
.attr("y",parseInt(rect.attr("y"))+parseInt((rect.attr("height") / 2)) + 5) // set the y position of the text
.text(d.text)
.style("font-size", "10px") // set the font size to 20 pixels
.style("fill", "White") // set the text content of the text element
.attr("text-anchor", "middle")
.style("display", "none"); // hide the text element by default
icons.append("svg:image")
.attr("xlink:href", function() {
  if (d.re === "Low") {
      return dr;
  } else if (d.re === "Strong") {
      return dr_s;
  }
})
.attr("x", xScale(d.x)-4) // 图像在数据点上的水平偏移量
.attr("y", 97) // 图像在数据点上的垂直偏移量
.attr("width", 8) // 图像的宽度
.attr("height", 8)
.on("mouseover", function() { // 鼠标悬停时显示文本
  text.style("display", "block");
  rect.style("display", "block");
      })
.on("mouseout", function(d) { // 鼠标移开时隐藏文本
  text.style("display", "none");
  rect.style("display", "none");
      });
}
if(d.type.includes("Offensive Rebound")){
var group = svg.append("g")
.attr("transform", "translate(0, 0)");
var rect = group.append("rect")
.attr("x", 200) // set the x position of the text
.attr("y",47)
.attr("width", 400)
.attr("height", 17)
.attr("fill", "black")
.style("display", "none");
var text = group.append("text")
.attr("x",  parseInt(rect.attr("x"))+ parseInt((rect.attr("width") / 2))) // set the x position of the text
.attr("y",parseInt(rect.attr("y"))+parseInt((rect.attr("height") / 2)) + 5) // set the y position of the text
.text(d.text)
.style("font-size", "10px") // set the font size to 20 pixels
.style("fill", "White") // set the text content of the text element
.attr("text-anchor", "middle")
.style("display", "none"); // hide the text element by default
icons.append("svg:image")
.attr("transform", "scale(1, -1)")
.attr("xlink:href", function() {
  if (d.re === "Low") {
      return or;
  } else if (d.re === "Strong") {
      return or_s;
  }
})
.attr("x", xScale(d.x)-4) // 图像在数据点上的水平偏移量
.attr("y", -105) // 图像在数据点上的垂直偏移量
.attr("width", 8) // 图像的宽度
.attr("height", 8)
.on("mouseover", function() { // 鼠标悬停时显示文本
  text.style("display", "block");
  rect.style("display", "block");
      })
.on("mouseout", function(d) { // 鼠标移开时隐藏文本
  text.style("display", "none");
  rect.style("display", "none");
      });
}
});

  }

  render(){
    // return <div id={"#" + this.props.id}></div>
    return <div ></div>
  }
}

export default FlowGame;