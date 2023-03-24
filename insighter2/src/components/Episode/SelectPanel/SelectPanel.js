import { Space } from "antd";
import CustomSelect from "./CustomSelect";

const chartOptions = [
    "Text Chart", "Bar Chart", "Stacked Bar Chart", "Pie Chart",
    "Area Chart", "Shot Chart"
];

const measureOptions = [
    "count"
];

const typeOptions = [
    "value", "distribution", "extreme"
];

const SelectPanel = () => {
    const handleTypeChange = (value, option) => {
        console.log(`Selected ${value} with option ${option}`);
    };

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
                        defaultValue="Text Chart"
                        onChange={handleTypeChange}
                    />
                    <br></br>
                    <CustomSelect
                        label="measure"
                        options={measureOptions}
                        defaultValue="count"
                        onChange={handleTypeChange}
                    />
                    <br></br>
                    <CustomSelect
                        label="visualization"
                        options={typeOptions}
                        defaultValue="value"
                        onChange={handleTypeChange}
                    />
                    <br></br>
                    <CustomSelect
                        label="subspace"
                        options={typeOptions}
                        defaultValue="+"
                        onChange={handleTypeChange}
                    />
                </div>
                {/* <Select></Select> */}
            </Space>
        </div>
    );
}

export default SelectPanel;