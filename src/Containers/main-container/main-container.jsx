import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/sidebar";
import QuizDisplay from "../QuizDisplay/quiz-display";

import LabelInformation from "../../Components/InformationLabel/information-label";
import { fetchQuestions } from "./fetcher";
import "./main-container.style.scss";

const MainContainer = () => {
  const defaultState = {
    category: "Any",
    categoryId: undefined,
    numQuestion: 5,
    difficultyLevel: "Any",
    questionType: "multiple",
  };
  const [quizQueryParams, setQuizQueryParams] = useState(defaultState);
  const [quizQuestions, setQuizQuestions] = useState();

  useEffect(() => {
    quizQueryParams &&
      fetchQuestions(quizQueryParams).then((questions) => {
        setQuizQuestions(questions);
      });
  }, [quizQueryParams]);

  return (
    <div className="main-container">
      <div className="sidebar-container">
        <Sidebar setQuizQueryParams={setQuizQueryParams} />
      </div>

      <div className="quiz-display-container">
        {quizQuestions && <QuizDisplay quizQuestions={quizQuestions} />}
        {!quizQuestions && (
          <div className="information-container">
            <LabelInformation information={"Loading..."} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MainContainer;
