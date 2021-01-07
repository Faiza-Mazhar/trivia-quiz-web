import React from "react";
import "./quiz-display.style.scss";

const QuizDisplay = ({ initialString }) => {
  return <div className="quiz-container">{initialString}</div>;
};

export default QuizDisplay;
