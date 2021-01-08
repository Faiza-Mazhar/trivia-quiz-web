import React from "react";
import "./quiz-display.style.scss";

const QuizDisplay = ({ quizQuestions }) => {
  return <div className="quiz-container">{JSON.stringify(quizQuestions)}</div>;
};

export default QuizDisplay;
