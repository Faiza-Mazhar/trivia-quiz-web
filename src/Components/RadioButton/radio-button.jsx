import React from "react";
import "./radio-button.style.scss";
const RadioButton = ({ value, inputProps }) => {
  return (
    <label className="radio-button-label">
      {value}
      <input value={value} {...inputProps} />
    </label>
  );
};

export default RadioButton;
