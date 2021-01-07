import React, { useState } from "react";
import Sidebar from "../sidebar/sidebar";
import QuizDisplay from "../QuizDisplay/quiz-display";

import "./main-container.style.scss";

const MainContainer = () => {
  const [quizQueryParams, setQuizQueryParams] = useState();

  let initialString = () =>
    quizQueryParams ? "Play Quiz" : "Please select Quiz options and hit play";

  return (
    <div className="main-container">
      <Sidebar setQuizQueryParams={setQuizQueryParams} className="sidebar" />
      <QuizDisplay initialString={initialString()} className="quiz-display" />
    </div>
  );
};

export default MainContainer;
