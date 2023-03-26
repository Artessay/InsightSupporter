import { Space } from "antd";
import CustomSelect from "./CustomSelect";
import Subspace from "./Subspace";

const chartOptions = [
    "Area Chart", "Bar Chart", "Flow Chart", 
    "IsoType Chart", "Line Chart", "Pie Chart",
    "Shot Chart", "Stacked Bar Chart", "Text Chart", 
    ""
];

const measureOptions = [
    "count", "% on Made", ""
];

const typeOptions = [
    "value", "distribution", "extreme"
];

function GetDatas( {sentenceList} ) {
    let data = [];
    for (let i = 0; i < sentenceList.length; ++i) {
        if (sentenceList[i].S_Ischart === "Yes") {
            let needs = sentenceList[i].S_Chartneed;
            for (let j = 0; j < needs.length; ++j) {
                data.push(needs[j])
            }
        }
    }
    return data;
}

const SelectPanel = (props) => {
    const { sentenceList, index } = props;
    let data = GetDatas({sentenceList});
    // console.log(data)

    const handleTypeChange = (value, option) => {
        console.log(`Selected ${value} with option ${option}`);
    };

    if (data.length > 0) {
        if (index >= data.length) {
            console.log("Program Error, Debug needed");
            return <></>
        }

        let chartData = data[index];
        let subspace = chartData.Subspace[0]
        let subspaceKey = Object.keys(subspace);
        // console.log(subspaceKey)
        let subspaceValue = [];
        let subspaceList = [];
        for (let i = 0; i < subspaceKey.length; ++i) {
            subspaceValue.push(subspace[subspaceKey[i]]);
            subspaceList.push(subspaceKey[i] + ' = ' + subspaceValue[i]);
        }
        // console.log(subspaceList)

        return (
            <div id="select-panel">
                <Space
                    align="start"
                    direction="vertical"
                    size='large'
                >
                    <div>
                        <CustomSelect
                            label="chart type"
                            options={chartOptions}
                            defaultValue={chartData.Chart_Type}
                            onChange={handleTypeChange}
                        />
                        <br></br>
                        <CustomSelect
                            label="measure"
                            options={measureOptions}
                            defaultValue={chartData.Measure}
                            onChange={handleTypeChange}
                        />
                        <br></br>
                        <CustomSelect
                            label="breakdown"
                            options={typeOptions}
                            defaultValue={chartData.Breakdown}
                            onChange={handleTypeChange}
                        />
                        <br></br>
                        {/* <CustomSelect
                            label="subspace"
                            options={subspaceList}
                            defaultValue="+"
                            onChange={handleTypeChange}
                        /> */}
                        <Subspace
                            label="subspace"
                            options={subspaceList}
                            defaultValue="+"
                            onChange={handleTypeChange}
                            style={{
                                // position: "relative", 
                            }}
                        />
                    </div>
                </Space>
            </div>
        );
    }
    else {
        return <></>
    }
}

export default SelectPanel;