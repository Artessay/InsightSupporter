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
        const width = 300  
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
            .attr("width", 300)
            .attr("height", 300);
        
        const filteredData = data.filter(datum => {
            if (datum.x < 300) {
                return datum
            }
        });

        // First run of the visualization
        update(filteredData);

    

        function update(data) {


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
                .attr('fill', (d) => shotColor(d.Isscore === "True"))
                .merge(circles)
                .transition(t)
                .attr('cy', (d) => d.y * 5 + 90)
                .attr('cx', (d) => d.x * 5.5 + 15)
                .attr('opacity', '1')
                .attr('r', 5);
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