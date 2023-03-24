import AreaChart from './areachart';
import PieChart from './piechart';
import BarChart from './barchart';
import Shot from './Shot/Shot'
import StackedBarChart from './stackedBarChart';
import LineChart from './linechart';

function GetChartList( {sentenceList} ) {
    let charts = [];
    // console.log(sentenceList)

    for (let i = 0; i < sentenceList.length; ++i) {
        // console.log(sentenceList[i])
        if (sentenceList[i].S_Ischart === "Yes") {
            // console.log("chart")
            // console.log(sentenceList[i].S_Chartneed)
            let needs = sentenceList[i].S_Chartneed;
            for (let j = 0; j < needs.length; ++j) {
                let need = needs[j];
                // console.log(need.Chart_Type)
                if (need.Chart_Type === "Pie Chart") {
                    charts.push(
                        <PieChart Data = {need.Chart_Data[0]["1"]}></PieChart>
                    );
                } else if (need.Chart_Type === "Bar Chart") {
                    charts.push(
                        <BarChart Data = {need.Chart_Data[0]}></BarChart>
                    );
                } else if (need.Chart_Type === "Stacked Bar Chart") {
                    charts.push(
                        <StackedBarChart Data = {need.Chart_Data[0]}></StackedBarChart>
                    );
                } else if (need.Chart_Type === "Area Chart" ) {
                    charts.push(
                        <AreaChart></AreaChart>
                        // <FunAreaChart></FunAreaChart>
                    )
                } else if (need.Chart_Type === "Shot Chart" ) {
                    charts.push(
                        <Shot Data = {need.Chart_Data[0]}></Shot>
                    )
                } else if (need.Chart_Type === "Line Chart" ) {
                    charts.push(
                        <LineChart Data = {need.Chart_Data[0]}></LineChart>
                    )
                } else {
                    // do nothing
                }
            }
        }
    }

    return charts;
}

function ChartGenerator( { sentenceList } ) {
    return <>{GetChartList({sentenceList})}</>
}

export function GetChart( { sentenceList, index } ) {
    return <>{GetChartList({sentenceList})[index]}</>
}

export default ChartGenerator;