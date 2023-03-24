import React, { useState } from 'react';
import TextArea from './TextArea';

function App() {
  const [data, setData] = useState("Hello, world!");

  const handleInputChange = (event) => {
    setData(event.target.value);
  }

  const handleTextAreaChange = (value) => {
    setData(value);
  }

  return (
    <div>
      <label>输入数据：</label>
      <input value={data} onChange={handleInputChange} />
      <br />
      <label>显示数据：</label>
      <TextArea data={data} onChange={handleTextAreaChange} />
    </div>
  );
}

export default App;