import React from "react";
import "./custom-button.style.scss";

const CustomButton = ({
  children,
  isGoogleSignIn,
  isAnswerButton,
  ...otherProps
}) => {
  const classNames = () => {
    let classNames = "custom-button";

    if (isGoogleSignIn) {
      classNames += " google-sign-in";
    }

    if (isAnswerButton) {
      classNames += " answer";
    }

    return classNames;
  };
  return (
    <button className={classNames()} {...otherProps}>
      {children}
    </button>
  );
};
export default CustomButton;
