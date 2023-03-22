import { Space } from "antd";
import CustomSelect from "./CustomSelect";

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
                        label="type"
                        options={typeOptions}
                        defaultValue="value"
                        onChange={handleTypeChange}
                    />
                    <CustomSelect
                        label="visualization"
                        options={typeOptions}
                        defaultValue="value"
                        onChange={handleTypeChange}
                    />
                    <CustomSelect
                        label="measure"
                        options={typeOptions}
                        defaultValue="value"
                        onChange={handleTypeChange}
                    />
                    <CustomSelect
                        label="subspace"
                        options={typeOptions}
                        defaultValue="value"
                        onChange={handleTypeChange}
                    />
                </div>
                {/* <Select></Select> */}
            </Space>
        </div>
    );
}

export default SelectPanel;