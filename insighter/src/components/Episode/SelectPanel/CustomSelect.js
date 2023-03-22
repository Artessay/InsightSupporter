import React from "react";
import { Select } from "antd";

const { Option } = Select;

const CustomSelect = ({ label, options, defaultValue, onChange }) => {
  const handleSelectChange = (value, option) => {
    onChange && onChange(value, option);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <label 
        style={{ 
          minWidth: 100, 
          marginRight: "10px", 
          justifyContent: 'center',
          backgroundColor: '#383f5e',
          color: '#fff'
        }}
      >
        {label}
      </label>
      <Select
        defaultValue={defaultValue}
        style={{ minWidth: 120 }}
        onChange={handleSelectChange}
      >
        {options.map((option) => (
          <Option key={option} value={option}>
            {option}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default CustomSelect;