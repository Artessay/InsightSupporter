import React from "react";
import * as d3 from "d3";
import './css/style.css'

const shotData = [
    {"id": "4013608539", "sequenceNumber": "9", "type": {"id": "92", "text": "Jump Shot"}, "text": "Joel Embiid makes 18-foot jumper", "awayScore": 2, "homeScore": 0, "period": {"number": 1, "displayValue": "1st Quarter"}, "clock": {"displayValue": "11:24"}, "scoringPlay": "True", "scoreValue": 2, "team": {"id": "20"}, "participants": [{"athlete": {"id": "3059318"}}], "wallclock": "2022-03-16T23:11:08Z", "shootingPlay": "True", "coordinate": {"x": 28, "y": 18}, "actionType": "Jump Shot"}, 
    {"id": "40136085327", "sequenceNumber": "27", "type": {"id": "137", "text": "Turnaround Fade Away Jump Shot"}, "text": "Joel Embiid makes 12-foot two point shot", "awayScore": 6, "homeScore": 2, "period": {"number": 1, "displayValue": "1st Quarter"}, "clock": {"displayValue": "9:35"}, "scoringPlay": "True", "scoreValue": 2, "team": {"id": "20"}, "participants": [{"athlete": {"id": "3059318"}}], "wallclock": "2022-03-16T23:13:48Z", "shootingPlay": "True", "coordinate": {"x": 27, "y": 12}, "actionType": "Turnaround Fade Away Jump Shot"}, 
    {"id": "40136085350", "sequenceNumber": "50", "type": {"id": "137", "text": "Turnaround Fade Away Jump Shot"}, "text": "Joel Embiid makes 11-foot two point shot", "awayScore": 16, "homeScore": 4, "period": {"number": 1, "displayValue": "1st Quarter"}, "clock": {"displayValue": "7:02"}, "scoringPlay": "True", "scoreValue": 2, "team": {"id": "20"}, "participants": [{"athlete": {"id": "3059318"}}], "wallclock": "2022-03-16T23:20:24Z", "shootingPlay": "True", "coordinate": {"x": 15, "y": 4}, "actionType": "Turnaround Fade Away Jump Shot"}, 
    {"id": "40136085359", "sequenceNumber": "59", "type": {"id": "137", "text": "Turnaround Fade Away Jump Shot"}, "text": "Joel Embiid makes 12-foot two point shot", "awayScore": 21, "homeScore": 6, "period": {"number": 1, "displayValue": "1st Quarter"}, "clock": {"displayValue": "5:57"}, "scoringPlay": "True", "scoreValue": 2, "team": {"id": "20"}, "participants": [{"athlete": {"id": "3059318"}}], "wallclock": "2022-03-16T23:21:28Z", "shootingPlay": "True", "coordinate": {"x": 22, "y": 12}, "actionType": "Turnaround Fade Away Jump Shot"}, 
    {"id": "40136085377", "sequenceNumber": "77", "type": {"id": "115", "text": "Driving Dunk Shot"}, "text": "Joel Embiid makes driving dunk (James Harden assists)", "awayScore": 24, "homeScore": 10, "period": {"number": 1, "displayValue": "1st Quarter"}, "clock": {"displayValue": "4:32"}, "scoringPlay": "True", "scoreValue": 2, "team": {"id": "20"}, "participants": [{"athlete": {"id": "3059318"}}, {"athlete": {"id": "3992"}}], "wallclock": "2022-03-16T23:24:56Z", "shootingPlay": "True", "coordinate": {"x": 26, "y": 0}, "actionType": "Driving Dunk Shot"}, 
    {"id": "40136085394", "sequenceNumber": "94", "type": {"id": "131", "text": "Pullup Jump Shot"}, "text": "Joel Embiid makes pullup jump shot (Tyrese Maxey assists)", "awayScore": 26, "homeScore": 10, "period": {"number": 1, "displayValue": "1st Quarter"}, "clock": {"displayValue": "3:34"}, "scoringPlay": "True", "scoreValue": 2, "team": {"id": "20"}, "participants": [{"athlete": {"id": "3059318"}}, {"athlete": {"id": "4431678"}}], "wallclock": "2022-03-16T23:26:22Z", "shootingPlay": "True", "coordinate": {"x": 25, "y": 10}, "actionType": "Pullup Jump Shot"}, 
    {"id": "401360853138", "sequenceNumber": "138", "type": {"id": "95", "text": "Layup Shot"}, "text": "Moses Brown blocks Joel Embiid's layup", "awayScore": 28, "homeScore": 19, "period": {"number": 1, "displayValue": "1st Quarter"}, "clock": {"displayValue": "48.2"}, "scoringPlay": "False", "scoreValue": 0, "team": {"id": "20"}, "participants": [{"athlete": {"id": "3059318"}}, {"athlete": {"id": "4397126"}}], "wallclock": "2022-03-16T23:33:50Z", "shootingPlay": "True", "coordinate": {"x": 24, "y": 0}, "actionType": "Layup Shot"}
]

class ShotChart extends React.Component{
    constructor(props){
        super(props)

        this.myRef = React.createRef();

        const { Data } = this.props;
        let dataList = [
            Number(Data.Made),
            Number(Data.Miss)
        ]

        // console.log(dataList)

        this.state = {
            // Define the data
            data : dataList,
            
            // Define the colors
            colors : ["#98abc5", "#8a89a6"],
        }
    }

    drawModel = () => {
        let { data, colors } = this.state;
        
        const height = 600
        const width = 995
        const g = d3
            .select(this.myRef.current)
            // .select('.shotChart')
            .append('svg')
            .attr('viewBox', `0 0 ${height} ${width}`)
            .append('g');

        const filteredData = shotData.filter(datum => {
            if (datum.coordinate.x < 300) {
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
                    let makeOrMiss = d.scoringPlay === "True" ? 'Made' : 'Missed';
                    let text = "<strong>actionType</strong> <span style='color:gold'>" + d.actionType + '</span><br>';
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
                const circles = g.selectAll('circle').data(shotData, function(d) {
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
                .attr('cy', (d) => d.coordinate.y * 10 + 55)
                .attr('cx', (d) => d.coordinate.x * 10 + 55)
                .attr('opacity', '0.6')
                .attr('r', 8);
        }
    }

    componentDidMount(){
        this.drawModel();
    }

    componentDidUpdate(){
        // this.drawModel();
    }

    render(){
        return (
            <>
                <div  class="shotChartBackground"></div>
                <div
                    ref={this.myRef} 
                    className="shotChart"
                >
                </div>
            </>
            
        )
    }
}

export default ShotChart;