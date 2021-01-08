import React from "react";
import "./question-header.style.scss";

const QuestionHeader = ({
  category,
  questionNumber,
  totalQuestions,
  difficulty,
}) => {
  const difficultyLevel =
    difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  return (
    <div className="question-header">
      <div className="category">{`Category: ${category}`}</div>
      <div className="question-number">{`Question: ${
        questionNumber + 1
      }/${totalQuestions}`}</div>
      <div className="difficulty">{`Difficulty: ${difficultyLevel}`}</div>
    </div>
  );
};

export default QuestionHeader;
