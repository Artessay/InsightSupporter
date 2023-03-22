import * as d3 from 'd3';
import Color from '../../constant/Color';
import { getAggregatedRows } from './helper';
import _ from 'lodash';

const offset = 10; // To show whole chart

const draw = (props) => {
    d3.select('.vis-isotype-' + props.uuid + ' > *').remove();
    let a = '.vis-isotype-' + props.uuid;
    const style = props.spec.style;

    const margin = { top: 10, right: 10, bottom: 10, left: 10 };
    const width = props.width - margin.left - margin.right - offset;
    const height = props.height - margin.top - margin.bottom - offset;
    let svg = d3.select(a)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left+ "," +  margin.top + ")");
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

    let proportion_svg = svg.append('g')

    // Process Data
    let data = props.data;
    data = getAggregatedRows(data, encoding);

    // proportion
    let proportionRow = data.filter((d)=>d[encoding.x.field].toString()===style['proportion'])
    let part = proportionRow[0][encoding.y.field]
    let measureRows = data.map(x=>x[encoding.y.field])
    let whole = measureRows.reduce((a, b) => a+b, 0)
    let proportion = part/whole;

    let unit = parseInt(_.min([height, width])/10)
    // whole
    for (let index = 0; index < 100; index++) {
        let x = index % 10;
        let y = parseInt(index / 10);
        proportion_svg.append("circle")
        .style("fill", Color.GRAY) 
            .attr('cx', x * unit)
            .attr('cy', y * unit)
            .attr('r', unit/3)
            .classed('circle', true)
        
    }
    // part
    for (let index = 0; index < parseInt(proportion*100); index++) {
        let x = index % 10;
        let y = parseInt(index / 10);
        proportion_svg.append("circle")
        .style("fill", Color.BAR_HIGHTLIGHT) 
            .attr('cx', x * unit)
            .attr('cy', y * unit)
            .attr('r', unit/3)
            .classed('circle', true)
    }

    const p_svg_height = proportion_svg.node().getBBox().height;
    const p_svg_width = proportion_svg.node().getBBox().width;
    // console.log(width + margin.left + margin.right, p_svg_width)
    proportion_svg.attr('transform', 'translate(' + ((width - p_svg_width)/2 +unit /3) + ',' + ((height -p_svg_height)/2+unit/3) + ")")
    return svg;
}

export default draw;