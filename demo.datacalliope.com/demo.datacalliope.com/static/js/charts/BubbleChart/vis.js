import * as d3 from 'd3';
import {getCategories, getAggregatedRows, isPrime} from './helper';
import _ from 'lodash';
const offset = 20;

const draw = (props) => {
    d3.select('.vis-bubblechart-' + props.uuid + ' > *').remove();
    let a = '.vis-bubblechart-' + props.uuid;

    const margin = {top: 10, right: 10, bottom: 10, left: 10};
    const width = props.width - margin.left - margin.right - offset;
    const height = props.height - margin.top - margin.bottom - offset;
    let svg = d3.select(a)
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Encoding
    // Get Encoding
    const encoding = props.spec.encoding;
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

    // Style
    const style = props.spec.style;
    // Process Data
    let data = props.data;

    // Get categories
    
    data = getAggregatedRows(data, encoding);
    data = data.sort((a, b) => b[encoding.y.field] - a[encoding.y.field]);
    if(data.length > 12) {
        data = data.slice(0, 12)
    }
    let dataCategories = getCategories(data, encoding);
    let categories = Object.keys(dataCategories);
    const chartWidth = width,
        chartHight = height; // -60

    let content = svg.append("g")
                .attr("class","content")
                .attr("width",chartWidth)
                .attr("height", chartHight);

    
    let isMatrix = style.style === 'matrix' ? true : false;
    let row, column;
    if(isMatrix) {
        let n = categories.length;
        let max_sqrt = Math.floor(Math.sqrt(n));
        let candidate;
        if(isPrime(n)) n = n - 1
        while(max_sqrt) {
            if(n % max_sqrt === 0) {
                candidate = max_sqrt
                break;
            }
            max_sqrt -= 1
        }
        row = _.min([candidate, n / candidate])
        column = n / row
    } else {
        row = 1;
        column = categories.length;
    }
    let maxR = _.min([0.8*height / (row + 1) / 2, 0.8*width / (column + 1) / 2])
    //Size channels
    let size = d3.scaleLinear()
                .domain([0, d3.max(data, function(d){ return Math.sqrt(d[encoding.y.field]); })])
                .range([ 0 , maxR]);

    // Color channel
    // let colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    let colorScale = d3.scaleOrdinal()
                        .range(['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a', '#ffff99', '#b15928', '#d6e2ee']);
                        // .range(['#17395f', '#2f4c7c', '#4d6794', '#8696b4', '#2c5f84', '#4590b1', '#3e819b', '#336dae', '#5495c5', '#7bbfe0', '#a0c8e5', '#c7ddec', '#d6e2ee']);
    let color = colorScale.domain(data.map(function (d){ 
            return d[encoding.x.field]; }));
    
    // Draw Circles  
    let proportions = content.append('g')
                        .selectAll('g')
                        .data(data)
                        .enter()
                        .append('g');
    let proportionAreas = proportions
        .append("circle")
        .style('stroke-width','1')
        .attr("class", "data-item")
        .attr("size", function(d) { return d[encoding.y.field]; })
        .attr("color", function(d) { return d[encoding.x.field]; })
        .attr("r", function(d) { return size(Math.sqrt(d[encoding.y.field])); })
        .attr("cx", function(d, i) { 
            if(column === 1) {
                return (props.width - size(Math.sqrt(d[encoding.y.field]))) / 2
            }
            if(!isMatrix) {
                return 1.2 * maxR + (width - 2.4 * maxR) / (column - 1) * (Math.floor(i % column))
            }
            else if(isPrime(categories.length) && Math.floor(i / column) === row-1) {
                return 1.2 * maxR + (width - 2.4 * maxR) / (column) * (Math.floor(i % column))
            } else if (isPrime(categories.length) && Math.floor(i / column) === row) {
                return 1.2 * maxR + (width - 2.4 * maxR) / (column) * (Math.floor((i-1) % column) + 1)
            } else {
                return 1.2 * maxR + (width - 2.4 * maxR) / (column - 1) * (Math.floor(i % column))
            }
        })
        .attr("cy", function(d, i) {
            let startPoint = (height - 3.6 * maxR) / (row - 1) <= 2.5 * maxR ? 1.8 * maxR : (height - 2.5 * maxR * (row-1))/2;
            if(!isMatrix) {
                return 1.8 * maxR + (height - 3.6 * maxR) / 2 
            }
            else if(isPrime(categories.length) && i === categories.length - 1) {
                return startPoint + _.min([(height - 3.6 * maxR) / (row - 1), 2.5 * maxR]) * (Math.floor((i-1) / column))
            } else {
                return startPoint + _.min([(height - 3.6 * maxR) / (row - 1), 2.5 * maxR]) * (Math.floor(i / column))
            }
        });
    

    proportionAreas.attr("fill", d => color(d[encoding.x.field]))
                .attr('fill-opacity', 0.8)
                .attr('stroke', d => color(d[encoding.x.field]))
                .attr('stroke-opacity', 1);
    
    proportions.append('text')
        .attr('x', function(d, i) { 
            if(column === 1) {
                return (props.width - size(Math.sqrt(d[encoding.y.field]))) / 2
            }
            if(!isMatrix) {
                return 1.2 * maxR + (width - 2.4 * maxR) / (column - 1) * (Math.floor(i % column))
            }
            else if(isPrime(categories.length) && Math.floor(i / column) === row-1) {
                return 1.2 * maxR + (width - 2.4 * maxR) / (column) * (Math.floor(i % column))
            } else if (isPrime(categories.length) && Math.floor(i / column) === row) {
                return 1.2 * maxR + (width - 2.4 * maxR) / (column) * (Math.floor((i-1) % column) + 1)
            } else {
                return 1.2 * maxR + (width - 2.4 * maxR) / (column - 1) * (Math.floor(i % column))
            }
        })
        .attr('y', function(d, i) {
            let startPoint = (height - 3.6 * maxR) / (row - 1) <= 2.5 * maxR ? 1.8 * maxR : (height - 2.5 * maxR * (row-1))/2;
            if(!isMatrix) {
                return 1.8 * maxR + (height - 3.6 * maxR) / 2 + 1.1 * maxR
            }
            else if(isPrime(categories.length) && i === categories.length - 1) {
                return startPoint + _.min([(height - 3.6 * maxR) / (row - 1), 2.5 * maxR]) * (Math.floor((i-1) / column)) + 1.1 * maxR
            } else {
                return startPoint + _.min([(height - 3.6 * maxR) / (row - 1), 2.5 * maxR]) * (Math.floor(i / column)) + 1.1 * maxR
            }
        })
        .text(d => d[encoding.x.field])
        .attr('fill', 'black')
        .attr('font-size', _.min([height, width]) *0.045)
        .attr('font-family', 'sans-serif')
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'hanging')

    // let content_height = content.node().getBBox().height
    // console.log(proportions.node().getBBox())
    // content.attr('transform', 'translate(0,' + ((height - content_height) / 2 )+ ')' )
    return svg;
}

export default draw;