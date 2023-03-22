import PieChart from './piechart';
import BarChart from './barchart';
import StackedBarChart from './stackedBarChart';

function ChartGenerator( { sentenceList } ) {
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
                console.log(need.Chart_Type)
                if (need.Chart_Type === "Pie Chart") {
                    charts.push(
                        <PieChart Data = {need.Chart_Data[0]["1"]}></PieChart>
                    );
                } else if (need.Chart_Type === "Bar Chart") {
                    console.log("Bar　Ｂａｒ")
                    charts.push(
                        <BarChart Data = {need.Chart_Data[0]}></BarChart>
                    );
                } else if (need.Chart_Type === "Stacked Bar Chart") {
                    charts.push(
                        <StackedBarChart Data = {need.Chart_Data[0]}></StackedBarChart>
                    );
                } else {
                    // do nothing
                }
            }
        }
    }

    return <>{charts}</>;
}

export default ChartGenerator;