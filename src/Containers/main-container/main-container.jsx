import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/sidebar";
import QuizDisplay from "../QuizDisplay/quiz-display";
import { fetchQuestions } from "./fetcher";
import "./main-container.style.scss";

const MainContainer = () => {
  const [quizQueryParams, setQuizQueryParams] = useState();
  const [quizQuestions, setQuizQuestions] = useState();

  useEffect(() => {
    fetchQuestions(quizQueryParams).then((questions) => {
      setQuizQuestions(questions);
    });
  }, [quizQueryParams]);

  return (
    <div className="main-container">
      <Sidebar setQuizQueryParams={setQuizQueryParams} className="sidebar" />
      <QuizDisplay quizQuestions={quizQuestions} className="quiz-display" />
    </div>
  );
};

export default MainContainer;
