import React, { useState } from "react";
import "./quiz-display.style.scss";

import QuestionHeader from "../../Components/QuestionHeader/question-header";
import { decodeHtmlEntities } from "../../helpers/fetcher";

const QuizDisplay = ({ quizQuestions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const { category, difficulty, question } = quizQuestions[currentQuestion];
  return (
    <div className="quiz-container">
      <QuestionHeader
        className="question-header"
        category={category}
        questionNumber={currentQuestion}
        totalQuestions={quizQuestions.length}
        difficulty={difficulty}
      />

      <div className="question">{decodeHtmlEntities(question)}</div>
    </div>
  );
};

export default QuizDisplay;
