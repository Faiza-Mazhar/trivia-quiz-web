import React from "react";
import "./radio-button.style.scss";
const RadioButton = ({ name, value, onClick }) => {
  return (
    <label className="card">
      {value}
      <input
        type="radio"
        name={name}
        value={value}
        id={value}
        onClick={onClick}
      />
    </label>
  );
};

export default RadioButton;
