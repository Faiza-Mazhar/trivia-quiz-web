import { useState } from "react";

const useRadioButtons = (name, handleChange) => {
  const [value, setValue] = useState(null);

  const handleClick = ({ target }) => {
    setValue(target.value);
    handleChange(target.value);
  };

  const inputProps = {
    name,
    type: "radio",
    onClick: handleClick,
  };

  return [value, inputProps];
};

export default useRadioButtons;
