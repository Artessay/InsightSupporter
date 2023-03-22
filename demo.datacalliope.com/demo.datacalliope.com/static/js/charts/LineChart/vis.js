import * as d3 from 'd3';
import { getSeries, getCategories, parseTime, formatTick, getAggregatedRows, sortByDateAscending, getWidth } from './helper';
import Color from '../../constant/Color';
import { formatNum } from '../../sentencer/index'
import _ from 'lodash';

const offset = 20;
const config = {
    "legend-text-color": "#666"
}

const draw = (props) => {
    d3.select('.vis-linechart-' + props.uuid + ' > *').remove();
    let a = '.vis-linechart-' + props.uuid;

    const style = props.spec.style;
    // Process Data
    let data = props.data;
    // Get Encoding
    const encoding = props.spec.encoding;
    const height_label = _.min([0.8 * Math.round(getWidth(d3.map(data, function (d) { return d[encoding.x.field] }).keys().sort(function (a, b) {
        return b.length - a.length;
    })[0])) + 10,0.4 * props.height])

    // // Get categories
    let data_ = getAggregatedRows(data, encoding);
    let dataCategories_ = getCategories(data_, encoding);
    let categories = Object.keys(dataCategories_);
    let sData = {};
    categories.forEach(c => {
        data_.forEach(d => {
            if (d[encoding.x.field] === c) {
                sData[c] = d[encoding.y.field];
            }
        })
    });
    var averageData_ = [];
    Object.keys(sData).forEach(s => {
        averageData_.push({
            x: s,
            y: sData[s],
            y0: 0,
            color: 'overall'
        })
    })
    averageData_ = averageData_.sort(sortByDateAscending);
    let tooltipText
    let tooltipArr = averageData_.filter(d => d.x === style["focus"])
    if('focus' in style && style.focus && tooltipArr.length) {
        let tooltipNumber = tooltipArr[0].y
        tooltipText = formatNum(Math.round(tooltipNumber * 100) / 100)
    }    
    let tipOffestHeight = ('focus' in style && style.focus) ? 30 : 0
    let tipOffestWidthLeft = ('focus' in style && style.focus) ? getWidth(tooltipText) * 0.35 * props.width / 300 : 0
    let tipOffestWidthRight = ('focus' in style && style.focus) ? getWidth(tooltipText) * 0.50 * props.width / 300 : 0
    // let tipOffestWidth = ('focus' in style && style.focus) ? 30 : 0
    // const margin = {top: 60, right: 60, bottom: 40, left: 40};
    const margin = { top: 10, right: 23 + tipOffestWidthRight, bottom: height_label, left: 40 + tipOffestWidthLeft };
    const width = props.width - margin.left - margin.right - offset;
    const height = props.height - margin.top - margin.bottom - offset;
    const chartWidth = width,
        chartHeight = height;
    let svg = d3.select(a)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    if (encoding.y.aggregation === 'count') {
        encoding.y.field = 'COUNT';
    }
    if (_.isEmpty(encoding) || !('x' in encoding) || !('y' in encoding) || _.isEmpty(encoding.x) || _.isEmpty(encoding.y.field)) {
        svg.append("rect")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("fill", "steelblue");
        return svg;
    }

    let hasSeries = ('color' in encoding) && ('field' in encoding.color);

    data.forEach((d) => {
        d[encoding.y.field] = +d[encoding.y.field];
        return d;
    })

    // Get series and stacked data
    let dataSeries = {};
    let dataSeriesCategories = {};
    let series = [];
    let colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    let color;
    let xScale, yScale;

    if (hasSeries) {
        // Series data
        dataSeries = getSeries(data, encoding);
        series = Object.keys(dataSeries);
        for (const s in dataSeries) {
            dataSeriesCategories[s] = {};
            // dataSeries[s] = getMaxRows(dataSeries[s], encoding);
            dataSeries[s] = getAggregatedRows(dataSeries[s], encoding)
            for (let index = 0; index < dataSeries[s].length; index++) {
                const rowData = dataSeries[s][index];
                // console.log(rowData);
                dataSeriesCategories[s][rowData[encoding.x.field]] = rowData[encoding.y.field]
            }
        }
        // color scale
        color = colorScale.domain(data.map(function (d) { return d[encoding.color.field]; }));
        // X channel
        xScale = d3.scaleTime()
            .domain(d3.extent(data, function (d) { return parseTime(d[encoding.x.field]); }))
            .range([0, chartWidth]);

        // Y channel
        yScale = d3.scaleLinear()
            .domain([0, d3.max(series, function (c) {
                return d3.max(dataSeries[c], function (d) {
                    return d[encoding.y.field]
                })
            })])
            .range([chartHeight, 0])
            .nice();

    } else {
        data = getAggregatedRows(data, encoding);
        // X channel
        xScale = d3.scaleTime()
            .domain(d3.extent(data, function (d) { return parseTime(d[encoding.x.field]); }))
            .range([0, chartWidth])
            .nice();
        // Y channel
        yScale = d3.scaleLinear()
            .domain([0, d3.max(data.map(d => d[encoding.y.field])) + Math.abs(d3.min(data.map(d => d[encoding.y.field])))])
            .range([chartHeight, tipOffestHeight])
            .nice();

    }
    // console.log('dataSeriesCategories', dataSeriesCategories);
    // console.log('dataSeries', dataSeries);
    // console.log('series', series); // color 

    let chart = svg.append("g"),
        axis = chart.append("g")
            .attr("class", "axis"),
        content = chart.append("g")
            .attr("class", "content")
            .attr("chartWidth", chartWidth)
            .attr("chartHeight", chartHeight)
            .attr("clip-path", "url(#clip-rect)"),
        legend = svg.append("g")
            .attr("transform", `translate(0, ${chartHeight + 60})`);

    let tick_format = formatTick(data[0][encoding.x.field]);

    let x_tick_count = (data.map(function (d) { return d[encoding.x.field] })).length

    let axisX;
    if (x_tick_count <= 20) {
        axisX = d3.axisBottom(xScale)
            .ticks(x_tick_count)
            .tickFormat(tick_format);
    } else {
        axisX = d3.axisBottom(xScale)
            .ticks(d3.timeDay.filter(d => d3.timeDay.count(0, d) % 5 === 0))
            .tickFormat(tick_format);
    }

    let axisY = d3.axisLeft(yScale).ticks(5).tickFormat(function (d) {
        if ((d / 1000000) >= 1) {
            d = d / 1000000 + "M";
        } else if ((d / 1000) >= 1) {
            d = d / 1000 + "K";
        }
        return d;
    });

    let axis_x = axis.append("g")
        .attr("class", "axis_x")
        .attr('transform', `translate(0, ${chartHeight})`)
        .call(axisX)
        .style('display', 'none')
        .attr('xScale', xScale.domain());

    axis_x.selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    let axis_y = axis.append("g")
        .attr("class", "axis_y")
        .call(axisY)
        .style('display', 'none')
        .attr('yScale', yScale.domain());

    // line Function
    var lineGen = d3.line()
        .x(function (d) {
            // return xScale(d.x);
            return xScale(parseTime(d.x));
        })
        .y(function (d) {
            return yScale(d.y);
        })
        .curve(d3.curveMonotoneX)

    // Origin is set
    if (series.length > 0) {
        let preparedData = {}
        series.forEach((s) => {
            let sData = [];
            categories.forEach(c => { // each x value 
                sData.push({
                    x: c,
                    y: dataSeriesCategories[s][c] ? dataSeriesCategories[s][c] : 0,
                    y0: 0,
                    color: s
                })
            });
            sData = sData.sort(sortByDateAscending)
            preparedData[s] = sData;
        })
        var allGroup = content.append('g')
            .attr('id', 'allLine')
        for (let index = 0; index < series.length; index++) {
            // console.log(preparedData[series[index]])
            var group = allGroup.append('g')
                .attr('id', 'series_' + series[index])
                .attr('clip-path', 'url(#clip_' + series[index] + ')');
            group.append('path')
                .data([preparedData[series[index]]])
                .attr('d', lineGen(preparedData[series[index]]))
                .attr('stroke', color(series[index]))
                .attr('stroke-width', 3)
                .attr('fill', 'none')
                .attr('class', 'data-item series_' + series[index]);
            group.selectAll('.dot')
                .data(preparedData[series[index]])
                .enter()
                .append('circle')
                .attr("cx", function (d) { return xScale(parseTime(d.x)) }) // parseTime
                .attr("cy", function (d) { return yScale(d.y) })
                .attr("r", 4)
                .style("stroke", color(series[index]))    // set the line colour
                .style('stroke-width', 3)
                .style("fill", "white")
                .attr('class', 'data-item series_' + series[index]);

        }
        // display legend
        var legends = legend.selectAll("legend_color")
            .data(series)
            .enter()
            .append("g")
            .attr("class", "legend_color")
            .attr('transform', (d, i) => `translate(${i * (80 + 10) + (chartWidth - (series.length * 80 + (series.length - 1) * 10)) / 2}, 0)`);
        legends.append("rect")
            .attr("fill", d => color(d))
            .attr('y', -7)
            .attr("width", '30px')
            .attr('height', '3px')
            .attr("rx", 1.5)
            .attr("ry", 1.5)
        // .attr("cy", -5);
        legends.append("text")
            .attr("fill", config["legend-text-color"])
            .attr("x", 35)
            .text(d => d);
    } else {
        let sData = {};
        categories.forEach(c => {
            data.forEach(d => {
                if (d[encoding.x.field] === c) {
                    sData[c] = d[encoding.y.field];
                }
            })
        });
        let averageData = [];
        Object.keys(sData).forEach(s => {
            averageData.push({
                x: s,
                y: sData[s],
                y0: 0,
                color: 'overall'
            })
        })
        averageData = averageData.sort(sortByDateAscending);

        content.append('line')
            .attr('x1', xScale(parseTime(averageData[0].x)))
            .attr('y1', yScale(averageData[0].y))
            .attr("x2", xScale(parseTime(averageData[averageData.length - 1].x)))
            .attr("y2", yScale(averageData[averageData.length - 1].y))
            .attr("stroke-width", 3)
            .attr("stroke", "black")
            .attr("stroke-dasharray", "5,5")
            .attr("opacity", 1);

        let group = content.append('g')
            .attr('id', 'series_overall')
            .attr('clip-path', 'url(#clip_overall)');
        group.append('path')
            .attr('d', lineGen(averageData))
            .data([averageData])
            .attr('stroke', Color.LINE)
            .attr('stroke-width', 3)
            .attr('fill', 'none')
            .attr('class', 'data-item series_overall');
        group.selectAll('.dot')
            .data(averageData)
            .enter()
            .append('circle')
            .attr("cx", function (d) { return xScale(parseTime(d.x)) }) // parseTime
            .attr("cy", function (d) { return yScale(d.y) })
            .attr("r", 4)
            .style("stroke", Color.LINE)    // set the line colour
            .style('stroke-width', 3)
            .style("fill", Color.LINE)
            .attr('class', 'data-item series_overall');
    }

    axis_x.style('display', 'inline')

    // axis_x.selectAll('path').style('display', 'none')
    // axis_x.selectAll('line').style('display', 'none')

    axis_y.style('display', 'inline')
    // axis_x.selectAll('line')
    //     .attr("opacity", 0.4)
    //     .attr("y2", -chartHeight + tipOffestHeight)
    //     .attr("stroke-dasharray", "5,5");
    axis_y.select('path')
        .attr("opacity", 0)
        .attr("stroke-dasharray", "5,5");
    axis_y.selectAll('line')
        .attr("opacity", 0.4)
        .attr("x2", chartWidth)
        .attr("stroke-dasharray", "5,5");

    // Style
    let total = 0;
    data.forEach(d => {
        total += d[encoding.y.field]
    });
    let average = total / data.length;
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

        svg.selectAll(".data-item").each(function (d) {
            if (d.x === style['focus']) {
                var node = d3.select(this);
                let circleX = node._groups[0][0].attributes.cx.nodeValue
                let circleY = node._groups[0][0].attributes.cy.nodeValue
                tooltip.text(formatNum(Math.round(d.y * 100) / 100))
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
                    .style("fill", d.y > average ? Color.BG_ABOVE : Color.BG_BELOW)
                    .style("opacity", 1.0);

                tooltipTriangle.append("path")
                    .attr("transform", "translate(" + circleX + "," + (circleY - 14) + ")rotate(180)")
                    .attr("d", d3.symbol().type(d3.symbolTriangle).size(44))
                    .style("fill", d.y > average ? Color.BG_ABOVE : Color.BG_BELOW)
            }
        })
    }


    // if (!_.isEmpty(style)) {
    //     if (style.showAxisX) {
    //         axis_x.style('display', 'inline')
    //         //     svg.append("g")
    //         //         .attr("transform", "translate(0," + height + ")")
    //         //         .call(d3.axisBottom(x))
    //         //         .selectAll("text")
    //         //         .attr("transform", "translate(-10,0)rotate(-45)")
    //         //         .style("text-anchor", "end");
    //     }
    //     if (style.showAxisY) {
    //         axis_y.style('display', 'inline')
    //         //     svg.append("g").call(d3.axisLeft(y));

    //     }
    //     if (style.showGrid) {
    //         axis_x.selectAll('line')
    //             .attr("opacity", 0.4)
    //             .attr("y2", -chartHeight)
    //             .attr("stroke-dasharray", "5,5");
    //         axis_y.select('path')
    //             .attr("opacity", 0.4)
    //             .attr("stroke-dasharray", "5,5");
    //         axis_y.selectAll('line')
    //             .attr("opacity", 0.4)
    //             .attr("x2", chartWidth)
    //             .attr("stroke-dasharray", "5,5");
    //     }
    // } else {
    //     axis_x.style('display', 'inline')

    //     // axis_x.selectAll('path').style('display', 'none')
    //     // axis_x.selectAll('line').style('display', 'none')

    //     axis_y.style('display', 'inline')
    //     axis_x.selectAll('line')
    //             .attr("opacity", 0.4)
    //             .attr("y2", -chartHeight)
    //             .attr("stroke-dasharray","5,5");
    //     axis_y.select('path')
    //         .attr("opacity", 0.4)
    //         .attr("stroke-dasharray","5,5");
    //     axis_y.selectAll('line')
    //         .attr("opacity", 0.4)
    //         .attr("x2", chartWidth)
    //         .attr("stroke-dasharray","5,5");
    // }

    return svg;
}

export default draw;