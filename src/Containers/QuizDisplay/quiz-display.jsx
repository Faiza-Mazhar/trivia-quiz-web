import React, { useEffect, useState } from "react";
import "./quiz-display.style.scss";

import QuestionHeader from "../../Components/QuestionHeader/question-header";
import CustomButton from "../../Components/CustomButton/custom-button";
import QuestionFormComponent from "../../Components/QuestionComponent/question-component";
import { getReply } from "../../Components/QuestionComponent/helper";
import LabelInformation from "../../Components/InformationLabel/information-label";

import { auth, setUserScore } from "../../firebase/firebase.utils";

const QuizDisplay = ({ quizQuestions }) => {
  const [score, setScore] = useState(0);
  const [replyString, setReplyString] = useState(undefined);
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const [questions, setQuizQuestions] = useState(quizQuestions);
  const [selectedAnswer, setSelectedAnswer] = useState(undefined);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentUserId, setCurrentUserId] = useState(undefined);

  const resetState = () => {
    setCurrentQuestionIndex(0);
    //setSelectedAnswer(undefined);
    setReplyString(undefined);
    setIsLastQuestion(false);
    setScore(0);
  };

  useEffect(() => {
    resetState();
    setQuizQuestions(quizQuestions);
  }, [quizQuestions]);

  useEffect(() => {
    !currentUserId &&
      auth.onAuthStateChanged((user) => {
        setCurrentUserId(user.uid);
      });
  }, [currentUserId]);

  let { category, difficulty, question, correctAnswer, answers } =
    questions[currentQuestionIndex] || {};

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedAnswer === undefined) {
      alert("Please select an answer");
      return;
    }

    if (selectedAnswer !== correctAnswer) {
      setReplyString(getReply(correctAnswer));
    } else {
      setReplyString(getReply());
      setScore(score + 1);
    }
  };

  const handleChange = (value) => {
    setSelectedAnswer(value);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setReplyString(undefined);
      setSelectedAnswer(undefined);
    } else {
      setIsLastQuestion(true);
    }
  };

  if (isLastQuestion) {
    const totalQuestions = questions.length;
    const information = `You answered ${score} questions correctly out of ${totalQuestions}`;

    setUserScore({ currentUserId, category, score, totalQuestions });
    return (
      <div className="quiz-container">
        <LabelInformation information={information} />
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <QuestionHeader
        className="question-header"
        category={category}
        questionNumber={currentQuestionIndex}
        totalQuestions={quizQuestions.length}
        difficulty={difficulty}
      />

      {!isLastQuestion && (
        <QuestionFormComponent
          question={question}
          answers={answers}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          showSubmitButton={replyString === undefined}
        />
      )}

      {replyString && (
        <div className="label-container">
          <label className="label">{`Your answer: ${selectedAnswer}`}</label>
          <label className="label">{replyString}</label>
          <div className="button">
            <CustomButton onClick={handleNextQuestion}>NEXT</CustomButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizDisplay;
