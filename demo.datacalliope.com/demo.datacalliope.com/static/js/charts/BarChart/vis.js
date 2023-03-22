import * as d3 from 'd3';
import Color from '../../constant/Color';
import { getStackedData, getSeries, getAggregatedRows, getWidth } from './helper';
import { formatNum } from '../../sentencer/index'
import _ from 'lodash';

const offset = 20; // To show whole chart

const draw = (props) => {
    d3.select('.vis-barchart-' + props.uuid + ' > *').remove();
    let a = '.vis-barchart-' + props.uuid;
    const style = props.spec.style;
    // Process Data
    let data = props.data;
    // Get Encoding
    const encoding = props.spec.encoding;
    let stackedData = [];
    let dataSeries = [];
    let series = [];
    let hasSeries = ('color' in encoding) && ('field' in encoding.color);;
    if (hasSeries) {
        dataSeries = getSeries(data, encoding);
        stackedData = getStackedData(data, encoding);
        series = Object.keys(dataSeries);
    } else {
        data = getAggregatedRows(data, encoding);
    }
    // filter data when difference
    if ('difference' in style) {
        let data1 = data.filter((d) => (d[encoding.x.field].toString() === style['difference'][0]))
        let data2 = data.filter((d) => (d[encoding.x.field].toString() === style['difference'][1]))
        let differenceData = [data1[0], data2[0]]
        data = differenceData
    }
    // console.log(getWidth(d3.map(data, function(d){return d[encoding.x.field]}).keys().sort(function(a, b) {
    //     return b.length - a.length;
    //   })[0]))
    const height_label = _.min([0.8 * Math.round(getWidth(d3.map(data, function (d) { return d[encoding.x.field] }).keys().sort(function (a, b) {
        return b.length - a.length;
    })[0])) + 10, 0.4 * props.height])
    let margin = { top: 10, right: 10, bottom: height_label, left: 40 };
    if ('focus' in style) {
        margin = { top: 35, right: 22, bottom: 20, left: 22 };
    }
    const width = props.width - margin.left - margin.right - offset;
    const height = props.height - margin.top - margin.bottom - offset;
    let svg = d3.select(a)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    if (encoding.y.aggregation === 'count') {
        encoding.y.field = 'COUNT';
    }
    if (_.isEmpty(encoding) || !('x' in encoding) || !('y' in encoding) || _.isEmpty(encoding.x) || _.isEmpty(encoding.y)) {
        svg.append("rect")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("fill", "pink");
        return svg;
    }





    // X channel
    let x = d3.scaleBand()
        .range(('difference' in style) ? [0, width / 3] : [0, width])
        .domain(data.map(function (d) { return d[encoding.x.field]; }))
        .padding(0.2);

    // Y channel
    let y = d3.scaleLinear()
    if (hasSeries) {
        y.domain([0, d3.max(stackedData[stackedData.length - 1], d => d[1])]).nice().range([height, 0]);
    } else {
        y.domain([0, d3.max(data, function (d) { return d[encoding.y.field]; })]).range([height, 0]);
    }

    // Color channel
    let color = d3.scaleOrdinal(d3.schemeCategory10);

    // Bars
    if (hasSeries) {
        let n = series.length;
        let layer = svg.selectAll('layer')
            .data(stackedData)
            .enter()
            .append('g')
            .attr('class', 'layer')
            .style('fill', (d, i) => color(i))

        let rect = layer.selectAll('rect')
            .data(d => {
                return d.map(x => {
                    x.series = d.key.toString();
                    return x;
                });
            })
            .enter()
            .append('rect');

        let style = props.spec.style;
        if (style.layout === "stacked") {
            y.domain([0, d3.max(stackedData[stackedData.length - 1], d => d[1])]).nice();
            rect.style('stroke-width', '0')
                .attr('x', d => x(d.data.x))
                .attr('width', x.bandwidth() - 1)
                .attr('y', d => y(d[1]))
                .attr('height', d => y(d[0]) - y(d[1]));
        } else if (style.layout === "percent") {
            let totalDict = {};
            stackedData[stackedData.length - 1].forEach(d => {
                totalDict[d.data.x] = d[1];
            });
            y.domain([0, 1]);
            rect.style('stroke-width', '0')
                .attr('x', d => x(d.data.x))
                .attr('width', x.bandwidth() - 1)
                .attr('y', d => {
                    let total = totalDict[d.data.x];
                    return y(d[1] / total);
                })
                .attr('height', d => {
                    let total = totalDict[d.data.x];
                    return y(d[0] / total) - y(d[1] / total);
                });
        } else {
            // grouped
            let max = 0;
            stackedData.forEach(ds => {
                ds.forEach(d => {
                    if ((d[1] - d[0]) > max) {
                        max = d[1] - d[0];
                    }
                });
            });
            y.domain([0, max]).nice();
            rect.style('stroke-width', '0')
                .attr('x', d => {
                    return x(d.data.x) + (x.bandwidth() - 1) / n * series.indexOf(d.series);
                })
                .attr('width', (x.bandwidth() - 1) / n)
                .attr('y', d => {
                    return y(0) - (y(d[0]) - y(d[1]))
                })
                .attr('height', d => y(d[0]) - y(d[1]))
        }
    } else {
        // svg.selectAll(".bar")
        //     .data(data)
        //     .enter()
        //     .append("rect")
        //     .style('stroke-width', '0')
        //     .attr("x", function (d) { return x(d[encoding.x.field]); })
        //     .attr("width", x.bandwidth())
        //     .attr("height", height)
        //     .attr("y", 0)
        //     .attr("rx", x.bandwidth()/2)
        //     .attr("ry", x.bandwidth()/2) 
        //     .style("stroke", Color.BAR_BACK)
        //     .style("stroke-width", 2)
        //     .style('fill', Color.BAR_BACK);
        svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .style('stroke-width', '0')
            .attr("x", function (d) { return x(d[encoding.x.field]); })
            .attr("width", x.bandwidth())
            .attr("height", function (d) { return height - y(d[encoding.y.field]); })
            .attr("y", function (d) { return y(d[encoding.y.field]); })
            // .attr("rx", ('difference' in style) ? 0 : x.bandwidth() / 2)
            // .attr("ry", ('difference' in style) ? 0 : x.bandwidth() / 2)
            // .style("stroke", Color.BAR_BACK)
            // .style("stroke-width", 2)
            .style('fill', Color.BAR)
    }

    // Axis
    if (!('focus' in style)) {
        svg.append("g")
            .attr("class", "x_axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");
        svg.append("g")
            .attr("class", "y_axis")
            .call(d3.axisLeft(y).ticks(5).tickFormat(function (d) {
                if ((d / 1000000) >= 1) {
                    d = d / 1000000 + "M";
                } else if ((d / 1000) >= 1) {
                    d = d / 1000 + "K";
                }
                return d;
            }));
    }

    // Style
    // highlight
    if ('focus' in style) {
        svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .filter(function (d, i) { // i is the index 
                return style['focus'].indexOf(d[encoding.x.field].toString()) !== -1;
            })
            .style('stroke-width', '0')
            .attr("x", function (d) { return x(d[encoding.x.field]); })
            .attr("width", x.bandwidth())
            .attr("height", function (d) { return height - y(d[encoding.y.field]); })
            .attr("y", function (d) { return y(d[encoding.y.field]); })
            // .attr("rx", x.bandwidth() / 2)
            // .attr("ry", x.bandwidth() / 2)
            // .style("stroke", Color.BAR_BACK)
            // .style("stroke-width", 2)
            .style("fill", function (d, i) {
                return Color.BAR_HIGHTLIGHT;
            })
            .attr('class', 'bar')

        var tooltip = svg
            .append("text")
            .attr("class", "tooltip")
            .attr("opacity", 0.0)

        var barLabel = svg
            .append("text")
            .attr("class", "tooltip")
            .attr("opacity", 0.0)

        svg.selectAll(".bar").each(function (d) {
            if (d[encoding.x.field].toString() === style['focus'][0]) {
                var node = d3.select(this);
                let barX = parseFloat(node._groups[0][0].attributes.x.nodeValue)
                let barY = parseFloat(node._groups[0][0].attributes.y.nodeValue)
                let barWidth = parseFloat(node._groups[0][0].attributes.width.nodeValue)
                tooltip.text(formatNum(Math.round(d[encoding.y.field] * 100) / 100))
                    .attr("text-anchor", "middle")
                    .attr("x", (barX + barWidth / 2) + 'px')
                    .attr("y", (-5) + 'px')
                    .style("fill", Color.BAR_HIGHTLIGHT)
                    .style("font-weight", 700)
                    .style("opacity", 1.0);
                barLabel.text(d[encoding.x.field])
                    .attr("text-anchor", "middle")
                    .attr("x", (barX + barWidth / 2) + 'px')
                    .attr("y", (height + 15) + 'px')
                    .style("fill", Color.BAR_HIGHTLIGHT)
                    .style("font-weight", 600)
                    .style("opacity", 1.0);
                // let tooltipLine = 
                svg.append('line')
                    .attr('x1', (barX + barWidth / 2) + 'px')
                    .attr('y1', (5) + 'px')
                    .attr("x2", (barX + barWidth / 2) + 'px')
                    .attr("y2", barY - 5)
                    .attr("stroke-width", 1.5)
                    .attr("stroke-dasharray","5,5")
                    .attr("stroke", Color.BAR_HIGHTLIGHT)
                    .attr("opacity", 1);
            }
        })
    }
    // difference
    if ('difference' in style) {
        let screenWidth = props.width;
        // let screenHeight = props.height;
        let m1 = data[0][encoding.y.field];
        let m2 = data[1][encoding.y.field];
        let difference = m2 - m1;
        // let differenceText = Math.round(difference / m1 * 10000) / 100 + '%'
        let positive = difference >= 0 ? "+" : "-";
        let differenceText = positive + formatNum(Math.abs(difference));
        let textLength = differenceText.length;
        let fontSize = 0.8 * (screenWidth / textLength) > width / 4 ? width / 4 : 0.8 * (screenWidth / textLength);
        // let fontSize = 7 * (screenWidth / textLength / textLength) > 22 ? 22 : 7 * (screenWidth / textLength / textLength);
        let transformY = 10
        svg.append("text")
            .text(differenceText)
            // .attr("text-anchor", "end")
            // - fontSize / 2
            .attr("y", transformY + y.range()[0] / 2)
            .attr("x", width / 3 + fontSize / 4)
            .attr("font-family", "sans-serif")
            .attr("font-size", fontSize + "px")
            .attr("fill", Color.BAR_HIGHTLIGHT);
    }
    if ('difference' in style) {
        svg.selectAll("rect")
            .attr("fill", function (d, i) {
                if (d[encoding.x.field].toString() === style['difference'][0] || d[encoding.x.field].toString() === style['difference'][1]) {
                    return color(0);
                } else {
                    return "lightgray";
                }
            });

        // draw trend line
        let barH1 = y(data.filter(d => d[encoding.x.field].toString() === style['difference'][0])[0][encoding.y.field]);
        let barH2 = y(data.filter(d => d[encoding.x.field].toString() === style['difference'][1])[0][encoding.y.field]);
        let barW1 = x(style['difference'][0]) + x.bandwidth() / 2
        let barW2 = x(style['difference'][1]) + x.bandwidth() / 2
        let h1 = barH1 + height / 20 < height ? barH1 + height / 20 : height - height / 50;
        let h2 = barH2 + height / 20 < height ? barH2 + height / 20 : height - height / 50;
        var trendLine = d3.line()
            .x(function (d) { return d.x; })
            .y(function (d) { return d.y; })
            .curve(d3.curveMonotoneY)
        let trendData = [
            { x: barW1, y: h1 },
            { x: (barW1 + barW2) / 2, y: (h1 + h2) / 2 + Math.abs(h1 - h2) / 4 },
            { x: barW2, y: h2 },
        ]
        function getTanDeg(tan) {
            var result = Math.atan(tan) / (Math.PI / 180);
            result = Math.round(result);
            return result;
        }
        let slope = ((height - h2) - (height - ((h1 + h2) / 2 + Math.abs(h1 - h2) / 4))) / (barW2 - barW1) * 2
        let deg
        if (getTanDeg(slope) < 0) {
            deg = Math.abs(getTanDeg(slope)) + 90
        } else {
            deg = - getTanDeg(slope) + 90
        }
        svg.append('path')
            .style("stroke", "black")
            .style("stroke-width", 2)
            .attr('fill', 'none')
            .attr('d', trendLine(trendData))
        svg.append("path")
            .attr("transform", "translate(" + barW2 + "," + h2 + ")rotate(" + deg + ")")
            .attr("d", d3.symbol().type(d3.symbolTriangle).size(0.16 * height))
            .style("fill", 'black')

    }
    // rank
    if ('order' in style) {
        let originPosition = _.cloneDeep(data.map(function (d) { return x(d[encoding.x.field]); }))
        let newX;
        if (style['order'] === 'ascending') {
            newX = data.sort(function (a, b) { return a[encoding.y.field] - b[encoding.y.field]; }).map(function (d) { return d[encoding.x.field]; })
        } else {
            let sortedData = data.sort(function (a, b) { return b[encoding.y.field] - a[encoding.y.field]; })
            newX = sortedData.map(function (d) { return d[encoding.x.field]; })
        }
        x.domain(newX);
        svg.select(".x_axis").call(d3.axisBottom(x))
        svg.selectAll("rect")
            .attr("transform", function (d, i) {
                let offset = x(d[encoding.x.field]) - originPosition[i];
                return "translate(" + offset + ",0)";
            });
    }

    return svg;
}

export default draw;