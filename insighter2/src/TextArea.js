import React from 'react';

function TextArea(props) {
  const handleChange = (event) => {
    props.onChange(event.target.value);
  }

  return (
    <textarea value={props.data} onChange={handleChange} />
  );
}

export default TextArea;