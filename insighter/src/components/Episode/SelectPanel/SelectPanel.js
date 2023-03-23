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
                        label="Chart Type"
                        options={chartOptions}
                        defaultValue="Text Chart"
                        onChange={handleTypeChange}
                    />
                    <CustomSelect
                        label="measure"
                        options={measureOptions}
                        defaultValue="count"
                        onChange={handleTypeChange}
                    />
                    <CustomSelect
                        label="visualization"
                        options={typeOptions}
                        defaultValue="value"
                        onChange={handleTypeChange}
                    />
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