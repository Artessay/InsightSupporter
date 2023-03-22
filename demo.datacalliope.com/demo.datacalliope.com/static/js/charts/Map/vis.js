import * as d3 from 'd3';
import chinaData from './geo/chinaGeo';
import worldData from './geo/worldGeo';
import usStateData from './geo/usStateGeo';
import { getData, getMapType } from './helper';
import _ from 'lodash';

const mapParams = {
    "ChinaMap": {
        geoData: chinaData,
    },
    "WorldMap": {
        geoData: worldData,
    },
    "USMap": {
        geoData: usStateData,
    },

}


const draw = (props) => {
    d3.select('.vis-map-' + props.uuid + ' > *').remove();
    let a = '.vis-map-' + props.uuid;
    const offset = 20;
    const margin = { top: 10, right: 20, bottom: 10, left: 20 };
    const width = props.width - margin.left - margin.right - offset;
    const height = props.height - margin.top - margin.bottom - offset;
    //legend宽高位置 
    let rectWidth = width * 0.9; //矩形的宽度
    const rectHight = _.min([width, height]) * 0.04//10;//矩形的高度
    const rectMarginBottom = 20;//距离底部90

    // Get Encoding
    const encoding = props.spec.encoding;
    // Process Data
    let parseData = props.data;

    let svg = d3.select(a)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    if (_.isEmpty(encoding) || !('area' in encoding) || _.isEmpty(encoding.area)) {
        svg.append("rect")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("fill", "pink");
        return svg;
    }

    //  获取地图类型
    let chartType = getMapType(parseData, encoding);
    //console.log("parseData...chartType", chartType)
    let mapdata = {};
    let projection = d3.geoMercator();    // 默认地图投影
    if (!chartType) { //默认中国 
        mapdata = mapParams.ChinaMap
    } else {
        //console.log("chartType...", chartType)
        if (chartType === 'ChinaMap') {
            mapdata = mapParams.ChinaMap
        } else if (chartType === 'WorldMap') {
            mapdata = mapParams.WorldMap
        } else if (chartType === 'USMap') {
            mapdata = mapParams.USMap
            projection = d3.geoAlbersUsa(); //美国地图投影
        } else { //默认中国地图
            mapdata = mapParams.ChinaMap
        }
    }

    projection.fitSize([width, height - rectMarginBottom - rectHight], mapdata.geoData) //地图根据屏幕自适配 

    

    let encodingData = getData(parseData, encoding);
    //中英文地区值判断
    let isEnLanguage = encodingData.isEN;
    //将读取到的数据存到数组values，令其索引号为各省的名称
    let values = encodingData.values;
    let encodingValue = Object.values(values);
    //求最大值和最小值
    let maxValue = 0;
    let minValue = 0;
    if (!_.isEmpty(encoding.color)) {
        maxValue = d3.max(encodingValue);
        minValue = d3.min(encodingValue);
        //console.log("encoding.color.field ", isEnLanguage,encoding.color.field, "parseData ", parseData, " values ", values)
    }
    //定义最小值和最大值对应的颜色
    let blueColor = d3.rgb(31, 72, 233);
    let whiteColor = d3.rgb(255, 255, 255);
    let redColor = d3.rgb(192, 86, 36);

    let scale;
    let isLogScale = false;
    let computeColor;
    if (minValue >= 0) { //如果都是大于0的数，就直接从白到红即可，不需要蓝色
        computeColor = d3.interpolate(whiteColor, redColor);
        let logScale = d3.scaleLog().domain([1, maxValue]); //默认值域range是[0, 1]
        scale = logScale;
        isLogScale = true;
    } else if (minValue < 0 && maxValue >= 0) { //如果数据中有负数，有正数，取绝对值最大的值最大值，取相反数为最小值；负数为蓝，正数为红, 零为白色
        computeColor = d3.interpolate(blueColor, redColor);
        maxValue = Math.abs(minValue) >= maxValue ? Math.abs(minValue) : maxValue
        minValue = -maxValue;
        scale = d3.scaleLinear().domain([minValue, maxValue]);
    } else {
        computeColor = d3.interpolate(blueColor, redColor);
        scale = d3.scaleLinear().domain([minValue, maxValue]);
        //console.log("数值全负数。。。")
    }
    // 定义地理路径生成器
    const path = d3.geoPath()
        .projection(projection);

    //包含中国各省路径的分组元素
    let map_svg = svg.append('g')
    map_svg.selectAll('path')
        .data(mapdata.geoData.features)
        .enter()
        .append('path')
        .attr('id', d=>d.properties.enName)
        .attr('stroke', 'grey')
        .attr('stroke-width', 0.3)
        .attr('fill', function (d, i) {
            let value;
            if (chartType === 'USMap') {
                value = values[d.properties.name]
            } else {
                value = isEnLanguage ? values[d.properties.enName] : values[d.properties.name]; //中国与世界地图做中英文适配
            }
            if (!value) return 'rgb(227, 228, 229)' //不存在数据的国家，显示灰色
            //设定各省份的填充色
            let color = computeColor(scale(value));
            return color.toString()
        })
        .attr('d', path);

    
    let map_height = map_svg.node().getBBox().height + map_svg.node().getBBox().y
    rectWidth = _.min([rectWidth, map_svg.node().getBBox().width * 1.2])
    if(mapdata === mapParams.ChinaMap) {
        d3.svg(require('./geo/southchinasea.svg'))
        .then(south =>{
            let southSVG = svg.node().appendChild(south.documentElement)
            d3.select(southSVG)
                .attr("stroke","black")
                .attr("stroke-width", 1)
                .attr('stroke', 'grey')
                .attr("fill",'rgb(227, 228, 229)')
                .attr('width', map_svg.node().getBBox().width*0.12)
                .attr('height', map_svg.node().getBBox().width*0.12*200/150)
                .attr("viewBox", "0 0 150 200")
                .attr('x', map_svg.node().getBBox().width+map_svg.node().getBBox().x-map_svg.node().getBBox().width*0.12)
                .attr('y', map_height - map_svg.node().getBBox().width*0.12*200/150)
        });
    
    }

    const style = props.spec.style;
    const queryCheck = s => document.createDocumentFragment().querySelector(s)
    const isSelectorValid = selector => {
        try { queryCheck(selector) } catch { return false }
        return true
    }

    if (style["focus"]!=="" && isSelectorValid('#'+style["focus"])) {
        if(svg.select('#'+style["focus"]).node()) {
            let highlight_area = svg.select('#'+style["focus"]).node();
            let highlight_bound = highlight_area.getBBox()
            map_svg.append('rect')
                    .attr('x', highlight_bound.x-2)
                    .attr('y', highlight_bound.y-2)
                    .attr('width', highlight_bound.width+4)
                    .attr('height', highlight_bound.height+4)
                    .attr('fill', 'none')
                    .attr('stroke', "#75fa4c")
                    .attr('stroke-width', 2)
        }
    }
    

    if (!_.isEmpty(encoding.color) && !(minValue===maxValue)) {
        //定义一个线性渐变
        var defs = svg.append("defs");

        var linearGradient = defs.append("linearGradient")
            .attr("id", "linearColor")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "0%");

        linearGradient.append("stop")
            .attr("offset", "0%")
            .style("stop-color", computeColor(scale(isLogScale ? 1 :minValue)));

        if (!isLogScale) {
            linearGradient.append("stop")
                .attr("offset", '50%')
                .style("stop-color", whiteColor);
        }

        linearGradient.append("stop")
            .attr("offset", "100%")
            .style("stop-color", computeColor(scale(maxValue)));

        //添加一个矩形，并应用线性渐变
        svg.append("rect")
            .attr("x", (width - rectWidth) / 2)
            .attr("y", map_height+10)//height - rectMarginBottom)
            .attr("width", rectWidth)
            .attr("height", rectHight)
            .style("fill", "url(#" + linearGradient.attr("id") + ")");

        //添加文字
        svg.append("text")
            .attr("class", "valueText")
            .attr("x", (width - rectWidth) / 2) //字离左侧矩形往左偏移10
            .attr("y", map_height+15+_.min([width, height]) * 0.045)//height - rectMarginBottom + _.min([height, width]) * 0.1) //字离下侧矩形偏移50
            .attr("dy", "-0.3em")
            .attr('text-anchor', 'middle')
            .attr('alignment-baseline', 'hanging')
            .attr('font-size', _.min([height, width]) * 0.05)
            .text(function () {
                return 0;
            });

        if (isLogScale) {
            //中间是1,10,100...
            let middleCount = 0;
            let firstText = 1;
            let countMin = isLogScale && minValue === 0 ? 1 : 1;
            while (countMin >= 1 && firstText*10 < maxValue) { //找第一个点
                firstText *= 10;
                countMin /= 10;
            }
            if (firstText > 1 && minValue !== 1) {
                middleCount++;
                
            } else {
                middleCount ++;
            }

            let afterFirstText = firstText;
            while (afterFirstText < maxValue) {
                afterFirstText *= 10;
                if(afterFirstText >= maxValue) break
                middleCount++;
            }
            if(maxValue < 10) {
                middleCount = 0
            }

            //绘制中间的数值
            let totalCount = middleCount + 1;//将矩形的宽度totalCount等分
            let currentCount = 1;
            let textValue = firstText;
            while (middleCount--) {
                let posX = (width - rectWidth) / 2 + (currentCount / totalCount) * rectWidth;//字离中间矩形往左偏移10
                let posY = map_height+15+_.min([width, height]) * 0.045//height - rectMarginBottom + _.min([height, width]) * 0.1;//字离下侧矩形偏移50
                let textValueChange = textValue;
                if ((textValueChange / 1000000) >= 1) {
                    textValueChange = textValueChange / 1000000 + "M";
                } else if ((textValueChange / 1000) >= 1) {
                    textValueChange = textValueChange / 1000 + "K";
                }
                drawMiddleText(svg, posX, posY, textValueChange, width, height);
                currentCount++;
                textValue *= 10
                // if(maxValue >= 1000 ) textValue *= 100;
                // else textValue *= 10
            }
        } else {
            //零的位置
            svg.append("text")
                .attr("class", "valueText")
                .attr("x", (width / 2)) //字离中间矩形往左偏移10
                .attr("y", map_height+15+_.min([width, height]) * 0.045)//height - rectMarginBottom + _.min([height, width]) * 0.1) //字离下侧矩形偏移50
                .attr("dy", "-0.3em")
                .attr('text-anchor', 'middle')
                .attr('alignment-baseline', 'hanging')
                .attr('font-size', _.min([height, width]) * 0.05)
                .text(function () {
                    return 0;
                });
        }
        svg.append("text")
            .attr("class", "valueText")
            .attr("x", ((width - rectWidth) / 2 + rectWidth)) //字离右侧矩形往左偏移10
            .attr("y", map_height+15+_.min([width, height]) * 0.045)//height - rectMarginBottom + _.min([height, width]) * 0.1) //字离下侧矩形偏移50
            .attr("dy", "-0.3em")
            .attr('text-anchor', 'middle')
            .attr('alignment-baseline', 'hanging')
            .attr('font-size', _.min([height, width]) * 0.05)
            .text(function () {
                return maxValue;
            });
    }
    return svg;
}

function drawMiddleText(svg, posX, posY, text, width, height) {
    svg.append("text").attr("class", "valueText")
        .attr("x", posX)
        .attr("y", posY)
        .attr("dy", "-0.3em")
        .attr('alignment-baseline', 'hanging')
        .attr('text-anchor', 'middle')
        .attr('font-size', _.min([height, width]) * 0.05)
        .text(function () {
            return text;
        });
}

export default draw;