import React from "react";
import "./information-label.style.scss";

const InformationLabel = ({ information }) => (
  <div className="label-container">
    <label className="label">{information}</label>
  </div>
);

export default InformationLabel;
