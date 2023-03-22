import * as d3 from 'd3';
import Color from '../../constant/Color';
import { getStackedData, getSeries, getAggregatedRows,getWidth } from './helper';
import _ from 'lodash';
import { formatNum } from '../../sentencer/index'

const offset = 20; // To show whole chart

const draw = (props) => {
    d3.select('.vis-rankedbarchart-' + props.uuid + ' > *').remove();
    let a = '.vis-rankedbarchart-' + props.uuid;
    const style = props.spec.style;
    // Get Encoding
    const encoding = props.spec.encoding;
    // Process Data
    let data = props.data;
    let stackedData = [];
    let dataSeries = [];
    let series = [];
    let hasSeries = ('color' in encoding) && ('field' in encoding.color);
    if (hasSeries) {
        dataSeries = getSeries(data, encoding);
        stackedData = getStackedData(data, encoding);
        series = Object.keys(dataSeries);
    } else {
        data = getAggregatedRows(data, encoding);
    }
    if (style['order'] === 'ascending') {
        data = data.sort(function (a, b) { return a[encoding.y.field] - b[encoding.y.field]; })
    } else {
        data = data.sort(function (a, b) { return b[encoding.y.field] - a[encoding.y.field]; })
    }
    if (data.length > 8) {
        data = data.slice(0,7);
    }
    const height_label = _.min([Math.round(getWidth(d3.map(data, function(d){return d[encoding.x.field]}).keys().sort(function(a, b) {
        return b.length - a.length;
      })[0]))+5,0.4 * props.width])
    const margin = { top: 10, right: 10, bottom: 10, left: height_label };
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

    // Y channel
    let y = d3.scaleBand()
        .range([0, height])
        .domain(data.map(function (d) { return d[encoding.x.field]; }))
        .padding(0.2);

    // X channel
    let x = d3.scaleLinear()
    if (hasSeries) {
        x.domain([0, d3.max(stackedData[stackedData.length - 1], d => d[1])]).nice().range([width, 0]);
    } else {
        x.domain([0, d3.max(data, function (d) { return d[encoding.y.field]; })]).range([width, 0]);
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
        svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .style('stroke-width', '0')
            .attr("y", function (d) { return y(d[encoding.x.field]); })
            .attr("height", y.bandwidth())
            .attr("width", function (d) { return width - x(d[encoding.y.field]); })
            .attr("x", 0)
            .attr("rx", y.bandwidth()/2)
            .attr("ry", y.bandwidth()/2) 
            .style("box-sizing", "border-box")
            .style("fill", function (d, i) {
                if (data.length > 2) {
                    if (d[encoding.y.field] === data[0][encoding.y.field] || d[encoding.y.field] === data[1][encoding.y.field] || d[encoding.y.field] === data[2][encoding.y.field]) {
                        return Color.BAR_HIGHTLIGHT;
                    } else {
                        return Color.BAR;
                    }
                } else {
                    return Color.BAR;
                }
            })

        svg.selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .text(function(d) {
                return formatNum(d[encoding.y.field])
            })
            // .attr("text-anchor", "middle")
            .attr("y", function (d) { return y(d[encoding.x.field])+y.bandwidth()/2+y.bandwidth()/6; })
            .attr("x", y.bandwidth()/3)
            .attr("font-family", "sans-serif")
            .attr("font-size", y.bandwidth()/2+"px")
            .attr("fill", "white");
    }

    // Axis
    svg.append("g")
        .attr("class", "y_axis")
        .call(d3.axisLeft(y));

    // Style
    // highlight
    // if ('focus' in style) {
    //     svg.selectAll(".bar")
    //         .data(data)
    //         .enter()
    //         .append("rect")
    //         .filter(function(d, i) { // i is the index 
    //             return d[encoding.x.field].toString() === style['focus'];
    //         })
    //         .style('stroke-width', '0')
    //         .attr("x", function (d) { return x(d[encoding.x.field]); })
    //         .attr("width", x.bandwidth())
    //         .attr("height", function (d) { return height - y(d[encoding.y.field]); })
    //         .attr("y", function (d) { return y(d[encoding.y.field]); })
    //         .attr("rx", x.bandwidth()/2)
    //         .attr("ry", x.bandwidth()/2) 
    //         .style("fill", function (d, i) {
    //             return Color.BAR_HIGHTLIGHT;
    //         });
    // }

    return svg;
}

export default draw;