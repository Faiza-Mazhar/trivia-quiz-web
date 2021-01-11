import React from "react";
import "./radio-button.style.scss";
const RadioButton = ({ value, inputProps }) => {
  return (
    <label className="card">
      {value}
      <input value={value} {...inputProps} />
    </label>
  );
};

export default RadioButton;
