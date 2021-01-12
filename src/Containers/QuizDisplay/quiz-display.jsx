import React, { useEffect, useState } from "react";
import "./quiz-display.style.scss";

import QuestionHeader from "../../Components/QuestionHeader/question-header";
import CustomButton from "../../Components/CustomButton/custom-button";
import QuestionFormComponent from "../../Components/QuestionComponent/question-component";
import {
  shuffleAnswers,
  getReply,
} from "../../Components/QuestionComponent/helper";

const QuizDisplay = ({ quizQuestions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(undefined);
  const [answers, setAnswers] = useState(undefined);
  const [replyString, setReplyString] = useState(undefined);
  const [questions, setQuizQuestions] = useState(quizQuestions);
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const [score, setScore] = useState(0);

  const resetState = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(undefined);
    setAnswers(undefined);
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

  let {
    category,
    difficulty,
    question,
    correct_answer,
    incorrect_answers,
  } = questions[currentQuestionIndex];

  useEffect(() => {
    !answers &&
      setAnswers([...shuffleAnswers(correct_answer, incorrect_answers)]);
    setReplyString(undefined);
  }, [answers, correct_answer, incorrect_answers]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedAnswer === undefined) {
      alert("Please select an answer");
      return;
    }

    if (selectedAnswer !== correct_answer) {
      setReplyString(getReply(correct_answer));
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
      setAnswers(undefined);
      setSelectedAnswer(undefined);
    }
  };

  if (isLastQuestion) {
    return (
      <div className="quiz-container">
        <div className="label-container">
          <label className="label">{`You answered ${score} questions correctly out of ${questions.length}`}</label>
        </div>
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
