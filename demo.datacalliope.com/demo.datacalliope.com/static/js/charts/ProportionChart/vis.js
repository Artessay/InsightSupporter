import * as d3 from 'd3';
import { getAggregatedRows } from './helper';
import _ from 'lodash';
import Color from '../../constant/Color';
const offset = 20; // To show whole chart
const draw = (props) => {
    d3.select('.vis-proportionchart-' + props.uuid + ' > *').remove();
    let a = '.vis-proportionchart-' + props.uuid;

    // const margin = { top: 10, right: 10, bottom: 24, left: 10 };
    const margin = { top: 10, right: 10, bottom: 10, left: 10 };
    const _width = props.width - margin.left - margin.right - offset;
    const _height = props.height - margin.top - margin.bottom - offset;
    const width = _width,
        height = _height;

    let svg = d3.select(a)
        //在svg之前添加center元素以保证svg居中显示
        // .append("center")
        .append("svg")
        .attr("width", _width + margin.left + margin.right)
        .attr("height", _height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")"); //margin.left



    //Get Encoding
    const encoding = props.spec.encoding;
    if (encoding.size.aggregation === 'count') {
        encoding.size.field = 'COUNT';
    }
    // console.log(encoding);
    if (_.isEmpty(encoding) || !('size' in encoding) || _.isEmpty(encoding.size)) {
        svg.append("circle")
            .attr("cx", _width / 2)
            .attr("cy", _height / 2)
            .attr("r", _height / 2)
            .attr("fill", "pink");
        return svg;
    }

    // Style
    const style = props.spec.style;
    // Process Data
    let data = props.data;
    data = getAggregatedRows(data, encoding);
    let _focus = data.filter((d) => d[encoding.color.field] === style.focus)
    let _others = data.filter((d) => d[encoding.color.field] !== style.focus)
    const color_name = encoding.color.field,
          size_name = encoding.size.field
    let data_ = [
        {
            [color_name]: style.focus,
            [size_name]: _focus[0][size_name]
        },
        {
            [color_name]: 'Others',
            [size_name]: _others.reduce(function (acc, obj) { return acc + obj[size_name]; }, 0)
        }
    ]
    data = data_
    
    // make the focus to first
    data = data.sort(function(x,y){ return x[encoding.color.field] === style['focus'] ? -1 : y[encoding.color.field] === style['focus'] ? 1 : 0; });

    //Get categories
    // let dataCategories = getCategories(data, encoding);
    // let categories = Object.keys(dataCategories);

    //Color channel
    // let color;
    // if ('color' in encoding) {
    //     let colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    //     color = colorScale.domain(data.map(function (d) { return d[encoding.color.field]; }));
    // }
    

    // ------------START------------------
    let pie_style = style.style//'half_donut' //donut half_donut pie bar
    if (pie_style === 'donut') {
        //Compute the position of each group on the pie

        let pie = d3.pie()
            .value(function (d) { return d[encoding.size.field]; })
            .sort(null);
        let pieData = pie(data);

        //Build the pie chart
        let R = Math.min(height, width)
        let arc = d3.arc() //弧生成器
            .innerRadius(R / 2 - R / 4) //设置内半径
            .outerRadius(R / 2) //设置外半径
            .cornerRadius(function (d) {
                if (d.data[encoding.color.field] === style['focus']) {
                    return 5;
                } else {
                    return 0;
                }
            })
        let arc_ = d3.arc() //弧生成器
            .innerRadius(R / 2 - R / 4) //设置内半径
            .outerRadius(R / 2) //设置外半径

        let arcs = svg.append('g')
            .selectAll("g")
            .data(pieData)
            .enter()
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

        arcs.append("path")
            .attr("fill", function (d) {
                return Color.BAR;
            })
            .attr("d", function (d, i) {
                return arc_(d);
            });
        arcs.append("path")
            .attr("fill", function (d) {
                if (d.data[encoding.color.field] === style['focus']) {
                    return '#f8ce69';
                } else {
                    return Color.BAR;
                }
            })
            .attr("d", function (d, i) {
                return arc(d);
            });


        let focus_ = arcs.filter(function (d, i) {
            if (d.data[encoding.color.field] === style['focus']) {
                return d
            } return null
        })
        let focus_position = arc.centroid(focus_.node().__data__)
        let percent_focus = focus_.node().__data__.value / d3.sum(pieData, function (d, i) { return d.value })
        percent_focus = parseInt(percent_focus * 100) === 0 ? (percent_focus * 100).toFixed(1): parseInt(percent_focus * 100)
        let center_text = arcs.append('g')
            .append('text')
            .attr('x', 0)
            .attr('y', 0)
            .attr('font-family', 'sans-serif')
        center_text.append('tspan')
            .text(percent_focus)
            .attr('font-size', R * 0.2)
            .attr('text-anchor', 'middle')
        center_text.append("tspan")
            .text('percent')
            .attr('x', 0)
            .attr("dy", R * 0.15 * 0.6)
            .attr('font-size', R * 0.08)
            .attr('text-anchor', 'middle')
            .style('font-weight', 150);
        center_text.attr('y', function () {
            return -this.getBBox().y - this.getBBox().height / 2
        })

        let tip_svg = svg.append('g').attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
        let tip_rect = tip_svg.append('rect')
            .attr('x', focus_position[0])
            .attr('y', focus_position[1])
            .attr('width', 100)
            .attr('height', 100)
            .attr('fill', 'black')
            .attr('fill-opacity', 0.6)
            .attr('rx', 5)
            .attr('ry', 5)
        let tip_value = tip_svg.append('text')
            .attr('x', focus_position[0])
            .attr('y', function () {
                if (focus_position[1] > 0) return focus_position[1] + margin.top
                else return focus_position[1] - margin.top
            })
            .attr('font-family', 'sans-serif')
            // .attr('text-anchor', 'middle')
        tip_value.append('tspan')
            .text(style.focus)
            .attr('fill', 'white')
            .attr('opacity', 1)
            .attr('font-size', R * 0.06)
            .attr('text-anchor', 'middle');
        tip_value.append('tspan')
            .attr('x', focus_position[0])
            .attr("dy", R * 0.15 * 0.6)
            .text(d3.format(",")(focus_.node().__data__.value))
            .attr('fill', 'white')
            .attr('opacity', 1)
            .attr('font-size', R * 0.08)
            .attr('text-anchor', 'middle');
        tip_rect.attr('width', function () {
            return tip_value.node().getBBox().width + R * 0.07;
        })
            .attr('height', function () {
                return tip_value.node().getBBox().height + R * 0.07;
            })
            .attr('x', function () {
                return tip_value.node().getBBox().x - R * 0.07 / 2;
            })
            .attr('y', function () {
                return tip_value.node().getBBox().y - R * 0.07 / 2;
            })
        // triangle
        tip_svg.append('path')
            .attr('d', function () {
                let _text = tip_rect.node().getBBox();
                if (_text.y + _text.width / 2 <= 0) {
                    let string = `M ${_text.x + _text.width / 2 - R * 0.02}, ${_text.y + _text.height}
                    L ${_text.x + _text.width / 2 + R * 0.02}, ${_text.y + _text.height}
                    L ${_text.x + _text.width / 2}, ${_text.y + _text.height + R * 0.02}
                    L ${_text.x + _text.width / 2 - R * 0.02}, ${_text.y + _text.height} Z`
                    return string
                } else {
                    let string = `M ${_text.x + _text.width / 2 - R * 0.02}, ${_text.y}
                    L ${_text.x + _text.width / 2 + R * 0.02}, ${_text.y}
                    L ${_text.x + _text.width / 2}, ${_text.y - R * 0.02}
                    L ${_text.x + _text.width / 2 - R * 0.02}, ${_text.y} Z`
                    return string
                }
            })
            .attr('fill-opacity', 0.6);
    } else if (pie_style === 'half_donut') {
        let anglesRange = 0.5 * Math.PI;

        let pie = d3.pie()
            .value(function (d) { return d[encoding.size.field]; })
            .sort(null)
            .startAngle(anglesRange * -1)
            .endAngle(anglesRange);
        let pieData = pie(data);
        //Build the pie chart
        // let R = Math.min(height, width)
        let R = Math.min(0.8 * height, 0.5 * width)
        // let R = width
        let arc = d3.arc() //弧生成器
            .innerRadius(R - R / 4) //设置内半径
            .outerRadius(R) //设置外半径

        let arcs = svg.append('g')
            .selectAll("g")
            .data(pieData)
            .enter()
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + (height * 0.8) + ")")

        arcs.append("path")
            .attr("fill", function (d) {
                if (d.data[encoding.color.field] === style['focus']) {
                    return '#f8ce69';
                } else {
                    return Color.BAR;
                }
            })
            .attr('stroke', 'none')
            .attr("d", function (d, i) {
                return arc(d);
            });


        let focus_ = arcs.filter(d=> d.data[encoding.color.field] === style['focus'])
        let percent_focus = focus_.node().__data__.value / d3.sum(pieData, function (d, i) { return d.value })
        percent_focus =  (percent_focus * 100).toFixed(2) 
        let center_text = arcs.append('g')
            .append('text')
            .attr('x', 0)
            .attr('y', 0)
            .attr('alignment-baseline', 'baseline')
            .attr('font-family', 'sans-serif')
        center_text.append('tspan')
            .attr('x', 0)
            .text(percent_focus + '%')
            .attr('font-size', R * 0.3)
            .attr('text-anchor', 'middle')
        center_text.append('tspan')
            .attr('x', 0)
            .attr('dy', -R * 0.3)
            .text(style.focus)
            .attr('font-size', R * 0.18)
            .attr('text-anchor', 'middle')
    } else if (pie_style === 'pie') {
        //Compute the position of each group on the pie
        let pie = d3.pie()
            .value(function (d) { return d[encoding.size.field]; })
            .sort(null);
        let pieData = pie(data);

        //Build the pie chart
        let R = Math.min(height, width) * 0.8
        let arc_others = d3.arc() //弧生成器
            .innerRadius(0) //设置内半径
            .outerRadius(R / 2) //设置外半径
            .cornerRadius(4)
        let arc_focus = d3.arc() //弧生成器
            .innerRadius(0) //设置内半径
            .outerRadius((R / 0.8) / 2) //设置外半径
            .cornerRadius(4)
        let arcs = svg.append('g')
            .selectAll("g")
            .data(pieData)
            .enter()
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

        arcs.append("path")
            .attr("fill", function (d) {
                // return(color(d.data[encoding.color.field])); 
                if (d.data[encoding.color.field] === style['focus']) {
                    return '#f8ce69';
                } else {
                    return Color.BAR;
                    // return '#293543';
                }
            })
            .attr("stroke", "white")
            .style("stroke-width", 2)
            .attr("d", function (d, i) {
                // return arc(d);
                if (d.data[encoding.color.field] === style['focus']) {
                    return arc_focus(d);
                } else {
                    return arc_others(d);
                }
            });
        let focus_ = arcs.filter(function (d, i) {
            if (d.data[encoding.color.field] === style['focus']) {
                return d
            } return null
        })

        let focus_position = arc_focus.centroid(focus_.node().__data__)
        let percent_focus = focus_.node().__data__.value / d3.sum(pieData, function (d, i) { return d.value })
        percent_focus = (percent_focus * 100).toFixed(2)
        let tip_svg = svg.append('g').attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
        let tip_rect = tip_svg.append('text')
            .attr('x', focus_position[0])
            .attr('y', focus_position[1])
            .attr('text-anchor', 'middle')
            .attr('font-family', 'sans-serif')
        tip_rect.append('tspan')
            .attr('alignment-baseline', 'hanging')
            .text(percent_focus + '%')
            .attr('font-size', R * 0.08)
        tip_rect.append('tspan')
            .attr('x', focus_position[0])
            .attr('dy', -R * 0.01)
            .attr('alignment-baseline', 'baseline')
            .text(style.focus)
            .attr('font-size', R * 0.08)

    } else if (pie_style === 'bar') {
        let focus_ = data.filter(function (d, i) {
            if (d[encoding.color.field] === style['focus']) {
                return d
            } return null
        })
        let percent_focus = focus_[0][encoding.size.field] / d3.sum(data, function (d, i) { return d[encoding.size.field] })
        percent_focus = (percent_focus * 100).toFixed(2) 
        let length_size = d3.scaleLinear()
                .domain([0, d3.sum(data, function(d){ return d[encoding.size.field]; })])
                .range([ 0 , width * 0.8]);
        svg.append('rect')
            .attr('width', width * 0.8)
            .attr('height', height * 0.1)
            .attr('x', 0.1 * width)
            .attr('y', 0.6 * height)
            .attr('fill', Color.BAR)
        svg.append('rect')
            .attr('width', length_size(focus_[0][encoding.size.field]))
            .attr('height', height * 0.1)
            .attr('x', 0.1 * width)
            .attr('y', 0.6 * height)
            .attr('fill', '#f8ce69');
        svg.append('text')
           .attr('x', 0.5 * width)
           .attr('y', 0.5 * height)
           .attr('text-anchor', 'middle')
           .attr('alignment-baseline', 'baseline')
           .text(percent_focus + '%')
           .attr('font-size', height * 0.15)
           .attr('font-family', 'sans-serif')
        svg.append('text')
           .attr('x', 0.5 * width)
           .attr('y', 0.5 * height - height * 0.18)
           .attr('text-anchor', 'middle')
           .attr('alignment-baseline', 'baseline')
           .text(style.focus)
           .attr('font-size', height * 0.12)
           .attr('font-family', 'sans-serif')
    }
    return svg;
}

export default draw;