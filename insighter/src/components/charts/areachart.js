import React from "react";
import * as d3 from "d3";

class AreaChart extends React.Component{
    constructor(props){
        super(props)

        this.myRef = React.createRef();

        this.state = {
            // Define the data
            ChartData : this.props.Data,
            
            // Define the colors
            colorlist : ["#fc7a57","#f79c00","#fcd257","#7581a3","#8699a8","#96b1ad","#c6cebc","#dadbc7","#eeefff","#eeeeee","#eeeeee","#ffffff"],
        }
    }

    drawModel = () => {
        let { ChartData, colorlist } = this.state;
        
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("id", "basketball");
        svg.setAttribute("x", "0px");
        svg.setAttribute("y", "0px");
        svg.setAttribute("viewBox", "0 0 1280 1024");

        // console.log(colorlist[parseInt(10-parseInt(ChartData[0]["4"]["Percentage of Shots"])/10)])
        const rect1 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect1.setAttribute("x", "25");
        rect1.setAttribute("y", "31");
        rect1.setAttribute("class", "three");
        rect1.setAttribute("fill", colorlist[parseInt(10-parseInt(ChartData[0]["4"]["Percentage of Shots"])/10)]);
        rect1.setAttribute("width", "1228");
        rect1.setAttribute("height", "771");

        const rect2 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect2.setAttribute("x", "25");
        rect2.setAttribute("y", "31");
        rect2.setAttribute("class", "three");
        rect2.setAttribute("fill", colorlist[parseInt(10-parseInt(ChartData[0]["4"]["Percentage of Shots"])/10)]);
        rect2.setAttribute("width", "180");
        rect2.setAttribute("height", "426");

        const rect3 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect3.setAttribute("x", "1073");
        rect3.setAttribute("y", "31");
        rect3.setAttribute("class", "three");
        rect3.setAttribute("fill", colorlist[parseInt(10-parseInt(ChartData[0]["4"]["Percentage of Shots"])/10)]);
        rect3.setAttribute("width", "180");
        rect3.setAttribute("height", "426");

        const rect4 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect4.setAttribute("x", "205");
        rect4.setAttribute("y", "31");
        rect4.setAttribute("class", "Md");
        rect4.setAttribute("fill", colorlist[parseInt(10-parseInt(ChartData[0]["2"]["Percentage of Shots"])/10)]);
        rect4.setAttribute("width", "234");
        rect4.setAttribute("height", "250");

        const rect5 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect5.setAttribute("x", "839");
        rect5.setAttribute("y", "31");
        rect5.setAttribute("class", "Md");
        rect5.setAttribute("fill", colorlist[parseInt(10-parseInt(ChartData[0]["2"]["Percentage of Shots"])/10)]);
        rect5.setAttribute("width", "234");
        rect5.setAttribute("height", "250");

        const rect6 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect6.setAttribute("x", "439");
        rect6.setAttribute("y", "31");
        rect6.setAttribute("class", "shortrange");
        rect6.setAttribute("fill", colorlist[parseInt(10-1-parseInt(ChartData[0]["1"]["Percentage of Shots"])/10)]);
        rect6.setAttribute("width", "400");
        rect6.setAttribute("height", "250");

        // create the text element
        const text6 = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text6.setAttribute("x", "639");
        text6.setAttribute("y", "156");
        text6.setAttribute("text-anchor", "middle");
        text6.setAttribute("dominant-baseline", "middle");
        text6.setAttribute("fill","white");
        text6.setAttribute("font-size", "40px");
        text6.textContent = ChartData[0]["1"]["Type"]+":"+ChartData[0]["1"]["Percentage of Shots"];


        const rect7 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect7.setAttribute("x", "439");
        rect7.setAttribute("y", "281");
        rect7.setAttribute("class", "Md");
        rect7.setAttribute("fill", colorlist[parseInt(10-parseInt(ChartData[0]["2"]["Percentage of Shots"])/10)]);
        rect7.setAttribute("width", "400");
        rect7.setAttribute("height", "250");

        const text7 = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text7.setAttribute("x", "639");
        text7.setAttribute("y", "406");
        text7.setAttribute("text-anchor", "middle");
        text7.setAttribute("dominant-baseline", "middle");
        text7.setAttribute("fill","white");
        text7.setAttribute("font-size", "40px");
        text7.textContent = ChartData[0]["2"]["Type"]+":"+ChartData[0]["2"]["Percentage of Shots"];

        const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path1.setAttribute("class", "three");
        path1.setAttribute("d", "M439,687.6v114.5h400v-115c-61,28.4-128.9,44.3-200.5,44.3C567.3,731.5,499.7,715.8,439,687.6z");
        path1.setAttribute("fill", colorlist[parseInt(10-parseInt(ChartData[0]["4"]["Percentage of Shots"])/10)]);

        const textp1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
        textp1.setAttribute("x", "639");
        textp1.setAttribute("y", "761");
        textp1.setAttribute("text-anchor", "middle");
        textp1.setAttribute("dominant-baseline", "middle");
        textp1.setAttribute("fill","white");
        textp1.setAttribute("font-size", "40px");
        textp1.textContent = ChartData[0]["4"]["Type"]+":"+ChartData[0]["4"]["Percentage of Shots"];


        const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path2.setAttribute("class", "Md");
        path2.setAttribute("fill", colorlist[parseInt(10-parseInt(ChartData[0]["2"]["Percentage of Shots"])/10)]);
        path2.setAttribute("d", "M439,531v156.6c60.7,27.8,128.3,43.4,199.5,43.4c71.6,0,139.5-15.7,200.5-43.8V531H439z");

        const path3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path3.setAttribute("class", "Md");
        path3.setAttribute("fill", colorlist[parseInt(10-parseInt(ChartData[0]["2"]["Percentage of Shots"])/10)]);
        path3.setAttribute("d", "M205,457h0.1c0-0.1-0.1-0.2-0.1-0.3V457z");

        const path4 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path4.setAttribute("class", "Md");
        path4.setAttribute("fill", colorlist[parseInt(10-parseInt(ChartData[0]["2"]["Percentage of Shots"])/10)]);
        path4.setAttribute("d", "M205,281v175.7c0,0.1,0.1,0.2,0.1,0.3C253.5,558.7,336.5,640.7,439,687.6V531v-74V281H205z");

        const path5 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path5.setAttribute("class", "Md");
        path4.setAttribute("fill", colorlist[parseInt(10-parseInt(ChartData[0]["2"]["Percentage of Shots"])/10)]);
        path5.setAttribute("d", "M1073,457v-2.4c-0.4,0.8-0.8,1.6-1.2,2.4H1073z");

        const path6 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path6.setAttribute("class", "Md");
        path6.setAttribute("fill", colorlist[parseInt(10-parseInt(ChartData[0]["2"]["Percentage of Shots"])/10)]);
        path6.setAttribute("d", "M839,281v176v74v156.2c102-47,184.7-128.8,232.8-230.2c0.4-0.8,0.8-1.6,1.2-2.4V281H839z");
        var ftp=parseInt(ChartData[0]["3"]["Percentage of Shots"])/10
        if(ftp==10){
ftp=8
        }

        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", "639"); // set the x position of the center of the circle
        circle.setAttribute("cy", "531"); // set the y position of the center of the circle
        circle.setAttribute("r", "50"); // set the radius of the circle
        circle.setAttribute("class", "FT");
        circle.setAttribute("fill", colorlist[parseInt(10-2-ftp)]);

        const textc = document.createElementNS("http://www.w3.org/2000/svg", "text");
        textc.setAttribute("x", "639");
        textc.setAttribute("y", "531");
        textc.setAttribute("text-anchor", "middle");
        textc.setAttribute("dominant-baseline", "middle");
        textc.setAttribute("fill","white");
        textc.setAttribute("font-size", "20px");
        textc.textContent = ChartData[0]["3"]["Type"]+":"+ChartData[0]["3"]["Percentage of Shots"];


        svg.appendChild(rect1);
        svg.appendChild(rect2);
        svg.appendChild(rect3);
        svg.appendChild(rect4);
        svg.appendChild(rect5);
        svg.appendChild(rect6);
        svg.appendChild(rect7);
        //svg.appendChild(rect8);
        //svg.appendChild(rect9);
        svg.appendChild(path1);
        svg.appendChild(path2);
        svg.appendChild(path3);
        svg.appendChild(path4);
        svg.appendChild(path5);
        svg.appendChild(path6);
        svg.appendChild(circle);
        // append other zones to the svg element
        svg.appendChild(text6);
        svg.appendChild(text7);
        svg.appendChild(textc);
        svg.appendChild(textp1);


        const svgns = "http://www.w3.org/2000/svg";
        // 创建一个线性渐变
        const gradient = document.createElementNS(svgns, "linearGradient");

        // 设置渐变的ID和方向
        gradient.setAttribute("id", "colorGradient");
        gradient.setAttribute("x1", "0%");
        gradient.setAttribute("y1", "0%");
        gradient.setAttribute("x2", "100%");
        gradient.setAttribute("y2", "0%");

        // 创建渐变色停止点
        for (let i = 0; i < colorlist.length; i++) {
            const stop = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop.setAttribute('offset', `${i / (colorlist.length - 1) * 100}%`);
            stop.setAttribute('stop-color', colorlist[i]);
            gradient.appendChild(stop);
        }

        // 将渐变元素添加到SVG中
        svg.appendChild(gradient);

        // 创建矩形元素，并应用渐变
        const rectg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rectg.setAttribute('x', '30');
        rectg.setAttribute('y', '830');
        rectg.setAttribute('width', '1200');
        rectg.setAttribute('height', '50');
        rectg.setAttribute('fill', 'url(#colorGradient)');
        svg.appendChild(rectg);

        let doc = this.myRef.current
        doc.appendChild(svg.cloneNode(true))
        // let elements = document.querySelectorAll(".areaChart")
        // elements.forEach((element) => {
        //     element.appendChild(svg.cloneNode(true));
        //     console.log(element)
        // });
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
                className="areaChart"
                style={{
                    width: 300,
                    height: 300,
                }}
            >
            </div>
        )
    }
}

export default AreaChart;