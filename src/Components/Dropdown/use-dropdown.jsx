import React, { useState } from "react";
import "./use-dropdown.style.scss";

const useDropdown = (label, defaultState, options) => {
  const [state, updateState] = useState(defaultState);
  const id = `use-dropdown-${label.replace(" ", "").toLowerCase()}`;
  const Dropdown = () => (
    <div className="dropdown-container">
      <label htmlFor={id} className="dropdown-label">
        {label}
        <select
          className="dropdown-select"
          id={id}
          value={state}
          onChange={(e) => updateState(e.target.value)}
          disabled={!options.length}
        >
          {options.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
    </div>
  );

  return [state, Dropdown, updateState];
};

export default useDropdown;
