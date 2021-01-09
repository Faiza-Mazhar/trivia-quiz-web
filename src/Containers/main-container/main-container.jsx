import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/sidebar";
import QuizDisplay from "../QuizDisplay/quiz-display";
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

  console.log({ quizQuestions });
  return (
    <div className="main-container">
      <div className="sidebar-container">
        <Sidebar setQuizQueryParams={setQuizQueryParams} />
      </div>

      <div className="quiz-display-container">
        {quizQuestions && <QuizDisplay quizQuestions={quizQuestions} />}
      </div>
    </div>
  );
};

export default MainContainer;
