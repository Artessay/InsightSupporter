import React from "react";
// import * as d3 from 'd3';
import './js/d3-tip.js';
// import './js/d3.min.js';

export default class Shot extends React.Component {
    constructor(props){
        super(props)
        this.myRef = React.createRef();

        const {Data} = this.props;
        let dataList = []
        for ( let key in Data ) {
            if (Data.hasOwnProperty(key)) {
                const quarterData = Data[key];
                dataList.push(quarterData);
            }
        }

        this.state = {
            data: dataList
        }
    }

    drawModel = () => {
        const height = 300
        const width = 600  
        var courtUrl = "./img/court.png";

        let { data } = this.state;

        const g = d3
            // .select('#shotc')
            .select(this.myRef.current)
            .append('svg')
            .attr('viewBox', `0 0 ${width} ${height}`)
            .append('g');

    /*  g.append("svg:svg")
            .attr("background-color", "#151526"); */

            g.append("svg:image")
            .attr("id", "image-url")
            .attr("xlink:href", courtUrl)
            .attr("width", 600)
            .attr("height", 340);
        
        const filteredData = data.filter(datum => {
            if (datum.x < 300) {
                return datum
            }
        });

        // First run of the visualization
        update(filteredData);

    

        function update(data) {
            // Tooltip
            const tip = d3
                .tip()
                .attr('class', 'd3-tip')
                .html(function(d) {
                    let makeOrMiss = d.srcElement.__data__.scoringPlay === "True" ? 'Made' : 'Missed';
                    let text = "<strong>actionType</strong> <span style='color:gold'>" + d.srcElement.__data__.actionType + '</span><br>';
                /*   text += "<strong>Opponent</strong> <span style='color:gold'>" + d.opponent + '</span><br>';
                    text += "<strong>Shot Range</strong> <span style='color:gold'>" + d.action_type + '</span><br>';
                    text +=
                        "<strong>Shot Distance</strong> <span style='color:gold'>" +
                        d.shot_distance +
                        ' feet' +
                        '</span><br>';
                    text += "<strong>Made or Missed</strong> <span style='color:gold'>" + makeOrMiss + '</span><br>'; */
                    return text;
                });
            g.call(tip);

            //colors for circles
            const shotColor = d3
                .scaleOrdinal()
                .domain([1, 0])
                .range(['Red', 'Blue']);

            const t = d3.transition().duration(100);

        

            // JOIN new data with old elements.
            const circles = g.selectAll('circle').data(data, function(d) {
                return d;
            });

            // EXIT old elements not present in new data.
            circles
                .exit()
                .attr('class', 'exit')
                .remove();

            // ENTER new elements present in new data.
            circles
                .enter()
                .append('circle')
                .attr('class', 'enter')
                .attr('fill', (d) => shotColor(d.scoringPlay === "True"))
                .on('mouseover', tip.show)
                .on('mouseout', tip.hide)
                .merge(circles)
                .transition(t)
                .attr('cy', (d) => d.y * 10 + 55)
                .attr('cx', (d) => d.x * 10 + 55)
                .attr('opacity', '0.6')
                .attr('r', 8);
        }
    }

    componentDidMount() {
        this.drawModel();
    }

    componentDidUpdate(){
        // this.drawModel();
    }

    render() {
        return (
            <div 
                ref={this.myRef}  
                id="shotc" 
                class="shotc"
                style={{
                    width: 300,
                    height: 300,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(117, 117, 117, 0.3)'
                }}
                // style={{
                //     transform: "scale(0.6)"
                // }}
            ></div>
        )
    }
}