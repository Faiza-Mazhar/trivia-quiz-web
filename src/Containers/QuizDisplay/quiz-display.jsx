import React, { useEffect, useState } from "react";
import "./quiz-display.style.scss";

import QuestionHeader from "../../Components/QuestionHeader/question-header";
import CustomButton from "../../Components/CustomButton/custom-button";
import QuestionFormComponent from "../../Components/QuestionComponent/question-component";
import { getReply } from "../../Components/QuestionComponent/helper";
import LabelInformation from "../../Components/InformationLabel/information-label";

const QuizDisplay = ({ quizQuestions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(undefined);
  const [replyString, setReplyString] = useState(undefined);
  const [questions, setQuizQuestions] = useState(quizQuestions);
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const [score, setScore] = useState(0);

  const resetState = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(undefined);
    setReplyString(undefined);
    setIsLastQuestion(false);
    setScore(0);
  };

  useEffect(() => {
    resetState();
    setQuizQuestions(quizQuestions);
  }, [quizQuestions]);

  useEffect(() => {
    setIsLastQuestion(currentQuestionIndex === questions.length - 1);
  }, [currentQuestionIndex, questions.length]);

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
    }
  };

  if (isLastQuestion) {
    const information = `You answered ${score} questions correctly out of ${questions.length}`;
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
