import React from "react";
import { Select, Space } from "antd";
import './CustomSelect.css'

const { Option } = Select;

const Subspace = ({ label, options, defaultValue, onChange }) => {
  const handleSelectChange = (value, option) => {
    onChange && onChange(value, option);
  };

  return (
    <div className="subspace" style={{ display: "flex", alignItems: "center" }}>
        <label 
            style={{ 
                minWidth: 100,
                marginRight: "10px", 
                justifyContent: 'center',
                backgroundColor: 'black',
                color: 'white'
            }}
        >
            {label}
        </label>
        
        <Space
            align="start"
            direction="vertical"
            size='small'
        >
            {
                options.map((option) => (
                    <Select
                        key={option}
                        defaultValue={option}
                        style={{ 
                        minWidth: 150,
                        maxWidth: 150,
                        }}
                        onChange={handleSelectChange}
                    >
                        {options.map((option) => (
                            <Option key={option} value={option}>
                                {option}
                            </Option>
                        ))}
                    </Select>
                ))
            }

            <Select
                key={defaultValue}
                defaultValue={defaultValue}
                style={{ 
                minWidth: 150,
                }}
                onChange={handleSelectChange}
            >
                {options.map((option) => (
                <Option key={option} value={option}>
                    {option}
                </Option>
                ))}
            </Select>
        </Space>
    </div>
  );
};

export default Subspace;