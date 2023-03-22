import * as d3 from 'd3';
import Color from '../../constant/Color';
import { formatNum } from '../../sentencer/index'

const offset = 20; // To show whole chart

const draw = (props) => {
    d3.select('.vis-number-' + props.uuid + ' > *').remove();
    let a = '.vis-number-' + props.uuid;
    const style = props.spec.style;
    let number = style.value;

    const margin = { top: 10, right: 10, bottom: 10, left: 10 };
    const width = props.width - margin.left - margin.right - offset;
    const height = props.height - margin.top - margin.bottom - offset;
    let svg = d3.select(a)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Get Encoding
    const encoding = props.spec.encoding;
    if (encoding.y.aggregation === 'count') {
        encoding.y.field = 'COUNT';
    }

    // Process Data
    // let data = props.data;
    // data = getAggregatedRows(data, encoding);
    // if ('focus' in style) {
    //     data = data.filter((d) => (d[encoding.x.field].toString() === style['focus']))
    // }

    // Style
    // highlight

    let screenWidth = props.width;
    let screenHeight = props.height;
    number = formatNum(number);
    let textLength = number.length;
    let fontSize = 1.5 * (screenWidth / textLength);
    if (fontSize > 30) {
        fontSize = 30
    }
    // textFontSize
    let textFontSize = 30 * screenWidth / 200
    if(encoding.y.field.length > 13) {
        textFontSize = 20 * screenWidth / 200
    }
    if (fontSize > 50) {
        fontSize = 50
    }
    svg.append("text")
        .text(encoding.y.field)
        .attr("text-anchor", "middle")
        .attr("y", screenHeight / 2 - textFontSize / 2)
        .attr("x", width / 2)
        .attr("font-family", "sans-serif")
        .attr("font-size", textFontSize + "px")
        .attr("fill", Color.BAR)
        .style("font-weight", "bold");
    svg.append("text")
        .text(number)
        .attr("text-anchor", "middle")
        .attr("y", screenHeight / 2 + fontSize / 2)
        .attr("x", width / 2)
        .attr("font-family", "sans-serif")
        .attr("font-size", fontSize + "px")
        .attr("fill", Color.BAR_HIGHTLIGHT)
        .style("font-weight", "bold");


    return svg;
}

export default draw;