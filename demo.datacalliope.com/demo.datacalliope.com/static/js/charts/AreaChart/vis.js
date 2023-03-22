import * as d3 from 'd3';
import Color from '../../constant/Color';
import { getStackedData, getAggregatedRows } from './helper';
import { formatNum } from '../../sentencer/index'

const draw = (props) => {
    d3.select('.vis-areachart-' + props.uuid + ' > *').remove();
    let a = '.vis-areachart-' + props.uuid;
    const offset = 20;
    const margin = { top: 10, right: 10, bottom: 20, left: 50 };
    const width = props.width - margin.left - margin.right - offset;
    const height = props.height - margin.top - margin.bottom - offset;

    const style = props.spec.style;
    let tipOffestWidth = ('focus' in style && style.focus) ? width / 7 : 0
    let tipOffestHeight = ('focus' in style && style.focus) ? 40 : 0
    let svg = d3.select(a)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    // Encoding
    const encoding = props.spec.encoding;
    if (encoding.y.aggregation === 'count') {
        encoding.y.field = 'COUNT';
    }

    let hasSeries = 'color' in encoding;
    let layout = 'stacked';// basic/stacked/percent 

    // Process Data
    let data = props.data;
    let stackedData = [];
    if (hasSeries) {
        stackedData = getStackedData(data, encoding);
    }
    data = getAggregatedRows(data, encoding);

    // Style
    // const style = props.spec.style;
    let colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    //Scale
    //X轴

    // for numeric
    // var x = d3.scaleLinear()
    //     .domain(d3.extent(data, function (d) { return d[encoding.x.field]; }))
    //     .range([0, width]);

    // for categorical
    var x = d3.scalePoint()
        .domain(data.map(function (d) { return d[encoding.x.field]; }))
        .range([0, width - tipOffestWidth]);
    // rangeRound使它产生空隙，改成range就好了

    //Y轴        
    var y = d3.scaleLinear()
    if (hasSeries) {
        y.domain([0, d3.max(stackedData[stackedData.length - 1], d => d[1])]).nice().range([height, 0]);
    } else
        y.domain([0, d3.max(data, function (d) { return d[encoding.y.field]; })]).range([height, 0]);

    // basic area
    var area_generator = d3.area()
        .x(function (d) {
            return x(d[encoding.x.field]);
        })
        .y0(height)
        .y1(function (d) {
            return y(d[encoding.y.field]);
        })
        .curve(d3.curveMonotoneX)

    // stacked area
    var stacked_area_generator = d3.area()
        .x(d => x(d.data.x))
        .y0(d => y(d[0]))
        .y1(d => y(d[1]))

    // 100% stacked area
    let totalDict = {};
    if (hasSeries) {
        stackedData[stackedData.length - 1].forEach(d => {
            totalDict[d.data.x] = d[1];
        });
    }
    var percent_area_generator = d3.area()
        .x(d => x(d.data.x))
        .y0(d => {
            let total = totalDict[d.data.x];
            return y(d[0] / total);
        })
        .y1(d => {
            let total = totalDict[d.data.x];
            return y(d[1] / total);
        })

    // line Function
    var lineGen = d3.line()
        .x(function (d) {
            return x(d[encoding.x.field]);
        })
        .y(function (d) {
            return y(d[encoding.y.field]);
        })
        .curve(d3.curveMonotoneX)

    let areaLayer = svg.append("g").attr('id', 'areaLayer')
    let lineLayer = svg.append("g").attr('id', 'lineLayer')

    areaLayer.append('defs').append('clipPath')
        .attr('id', 'clip')
        .append('rect')
        .attr("width", width)
        .attr('height', height)

    const areaG = areaLayer.append('g')
        // .attr('clip-path', 'url(#clip)')
        .attr('class', 'areaG')

    if (hasSeries && layout === 'stacked') {
        y.domain([0, d3.max(stackedData[stackedData.length - 1], d => d[1])]).nice().range([height, 0]);
        areaG.selectAll("path")
            .data(stackedData)
            .join("path")
            .attr('id', ({ index }) => 'series_' + index)
            .attr('clip-path', ({ index }) => 'url(#clip_' + index + ')').attr('class', 'areaG')
            .attr('class', 'areaPath')
            .attr("fill", ({ key }) => colorScale(key))
            .attr('opacity', 0.2)
            .attr("d", stacked_area_generator)

        d3.select("#clip rect").attr("width", width);

    } else if (hasSeries && layout === 'percent') {
        y.domain([0, 1]);
        areaG.selectAll("path")
            .data(stackedData)
            .join("path")
            .attr('id', ({ index }) => 'series_' + index)
            .attr("fill", ({ key }) => colorScale(key))
            .attr('opacity', 0.2)
            .attr("d", percent_area_generator)
    } else {
        y.domain([0, d3.max(data, function (d) { return d[encoding.y.field]; })]).range([height, tipOffestHeight]);
        areaG.append("path")
            .style("fill", Color.AREA)
            .attr('opacity', 0.2)
            .attr("d", area_generator(data))
    }

    // areaLayer.append("g")
    //     .attr("class", "x axis")
    //     .call(d3.axisBottom(x))
    //     .attr("transform", "translate(0," + height + ")")
    //     .selectAll("text")
    //     .attr("transform", "translate(-10,0)rotate(-45)")
    //     .style("text-anchor", "end");
    areaLayer.append("g")
        .attr("class", "axis_y")
        .call(d3.axisLeft(y).ticks(5).tickFormat(function (d) {
            if ((d / 1000000) >= 1) {
                d = d / 1000000 + "M";
            } else if ((d / 1000) >= 1) {
                d = d / 1000 + "K";
            }
            return d;
        }))

    areaLayer.selectAll('.axis_y')
        .attr("x2", width - tipOffestWidth)
    // areaLayer.select('.axis_y').selectAll('path').style('display','none')

    // line
    lineLayer.append('path')
        .attr('d', lineGen(data))
        .attr('stroke', Color.LINE)
        .attr('stroke-width', 3)
        .attr('fill', 'none')

    lineLayer.selectAll('.dot')
        .data(data)
        .enter()
        .append('circle')
        .attr("cx", function (d) { return x(d[encoding.x.field]) })
        .attr("cy", function (d) { return y(d[encoding.y.field]) })
        .attr("r", 4)
        .style("stroke", Color.LINE)
        .style('stroke-width', 3)
        .style("fill", Color.LINE)
        .attr('class', 'dot')

    // Style
    let total = 0;
    data.forEach(d => {
        total += d[encoding.y.field]
    });
    let average = total / data.length;
    // highlight
    if ('focus' in style) {
        var tooltipRect = svg
            .append('rect')
            .attr("height", 30)
            .attr("opacity", 0.0)
        var tooltip = svg
            .append("text")
            .attr("class", "tooltip")
            .attr("opacity", 0.0)

        var tooltipTriangle = svg

        svg.selectAll(".dot").each(function (d) {
            if (d[encoding.x.field].toString() === style['focus']) {
                var node = d3.select(this);
                let circleX = node._groups[0][0].attributes.cx.nodeValue
                let circleY = node._groups[0][0].attributes.cy.nodeValue
                tooltip.text(formatNum(Math.round(d[encoding.y.field] * 100)/ 100))
                    .attr("text-anchor", "middle")
                    .attr("x", circleX + 'px')
                    .attr("y", (circleY - 25) + 'px')
                    .style("fill", 'white')
                    .style("opacity", 1.0);

                let textWidth = tooltip.node().getBBox().width;
                let textMargin = 7
                tooltipRect
                    .attr("text-anchor", "middle")
                    .attr("x", (circleX - textWidth / 2 - textMargin) + 'px')
                    .attr("y", (circleY - 45) + 'px')
                    .attr("rx", 5)
                    .attr("ry", 5)
                    .attr("width", textWidth + textMargin * 2)
                    .style("fill", d[encoding.y.field] > average ? Color.BG_ABOVE : Color.BG_BELOW)
                    .style("opacity", 1.0);

                tooltipTriangle.append("path")
                    .attr("transform", "translate(" + circleX + "," + (circleY - 14) + ")rotate(180)")
                    .attr("d", d3.symbol().type(d3.symbolTriangle).size(44))
                    .style("fill", d[encoding.y.field] > average ? Color.BG_ABOVE : Color.BG_BELOW)
            }
        })
    }
    return svg;
}

export default draw;