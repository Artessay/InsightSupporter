import * as d3 from 'd3';
import Color from '../../constant/Color';
import { getAggregatedRows,getWidth } from './helper';
import { formatNum } from '../../sentencer/index'
import _ from 'lodash';

const offset = 20; // To show whole chart

const draw = (props) => {
    d3.select('.vis-isotype-' + props.uuid + ' > *').remove();
    let a = '.vis-isotype-' + props.uuid;
    const style = props.spec.style;
    // Get Encoding
    const encoding = props.spec.encoding;
    // Process Data
    let data = props.data;
    const height_label = _.min([0.8 *  Math.round(getWidth(d3.map(data, function(d){return d[encoding.x.field]}).keys().sort(function(a, b) {
        return b.length - a.length;
      })[0])), 0.4 * props.height])
    const margin = { top: 10, right: 10, bottom: height_label, left: 40 };
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

    
    data = getAggregatedRows(data, encoding);
    // filter data when difference
    if ('difference' in style) {
        data = data.filter((d)=>(d[encoding.x.field].toString() === style['difference'][0] || d[encoding.x.field].toString() === style['difference'][1]))
    }

    // X channel
    let x = d3.scaleBand()
        .range(('difference' in style) ? [0, width/3]:[0, width])
        .domain(data.map(function (d) { return d[encoding.x.field]; }))
        .padding(0.2);

    // Y channel
    let y = d3.scaleLinear()
    y.domain([0, d3.max(data, function (d) { return d[encoding.y.field]; })]).range([height, 0]);

    // Color channel
    let color = d3.scaleOrdinal(d3.schemeCategory10);

    // ISOType
    let isotypes = [];

    // Bars
    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .style('stroke-width', '0')
        .attr("x", function (d) { return x(d[encoding.x.field]); })
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return height - y(d[encoding.y.field]); })
        .attr("y", function (d) { return y(d[encoding.y.field]); })
        .style('fill', 'white')
        .each(function(d, i){ 
            color = Color.BAR;
            if ('focus' in style && style['focus'].indexOf(d[encoding.x.field].toString()) !== -1) {
                color = Color.BAR_HIGHTLIGHT
            }
            isotypes.push({
                x: x(d[encoding.x.field]),
                y: y(d[encoding.y.field]),
                width: x.bandwidth()/2,
                height: height - y(d[encoding.y.field]),
                color: color,
            })
        });

    // Draw ISOType
    for (const isotype of isotypes) {
        for(let l = isotype.y + isotype.height - isotype.width/2 ; l > isotype.y - isotype.width/2; l = l - isotype.width){

            let x = isotype.x + isotype.width/2
            let y = l

            if (y < (isotype.width/2 + height - isotype.height)) {
                // show entire isotype
                continue
            }

            svg.append("circle")
                .style("fill", isotype.color) 
                .attr('cx', x)
                .attr('cy', y)
                .attr('r', isotype.width*(2/5))
                .classed('circle', true)
            svg.append("circle")
                .style("fill", isotype.color) 
                .attr('cx', x + isotype.width)
                .attr('cy', y)
                .attr('r', isotype.width*(2/5))
                .classed('circle', true)
        }
    }
    // Mask
    svg.selectAll("mask")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) { return x(d[encoding.x.field]); })
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return y(d[encoding.y.field])+10; })
        .attr("y", -10)
        .style('fill', 'white');

    // Axis
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

    // Style
    // difference
    if ('difference' in style) {
        let screenWidth = props.width;
        let screenHeight = props.height;
        let m1 = data[0][encoding.y.field];
        let m2 = data[1][encoding.y.field];
        let difference = m2 - m1;
        let positive = difference >= 0? "": "-";
        let differenceText = positive + formatNum(Math.abs(difference));
        let textLength = differenceText.length;
        let fontSize = 0.8 * (screenWidth / textLength);
        svg.append("text")
            .text(differenceText)
            // .attr("text-anchor", "middle")
            .attr("y", screenHeight/2 - fontSize/2)
            .attr("x", screenWidth/3 - fontSize/2)
            .attr("font-family", "sans-serif")
            .attr("font-size", fontSize+"px")
            .attr("fill", Color.BAR_HIGHTLIGHT);
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