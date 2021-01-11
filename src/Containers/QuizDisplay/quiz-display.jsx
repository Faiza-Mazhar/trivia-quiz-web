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
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answers, setAnswers] = useState();
  const [replyString, setReplyString] = useState(undefined);
  const [questions] = useState(quizQuestions);

  let {
    category,
    difficulty,
    question,
    correct_answer,
    incorrect_answers,
  } = questions[currentQuestionIndex];

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedAnswer === "") {
      alert("Please select an answer");
      return;
    }

    if (selectedAnswer !== correct_answer) {
      setReplyString(getReply(correct_answer));
    } else {
      setReplyString(getReply());
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    setSelectedAnswer(event.target.value);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length) {
      const index = currentQuestionIndex + 1;
      setCurrentQuestionIndex(index);
      setReplyString("");
      setAnswers();
    }
  };
  useEffect(() => {
    !answers &&
      setAnswers([...shuffleAnswers(correct_answer, incorrect_answers)]);

    setReplyString("");
  }, [answers, correct_answer, incorrect_answers]);

  return (
    <div className="quiz-container">
      <QuestionHeader
        className="question-header"
        category={category}
        questionNumber={currentQuestionIndex}
        totalQuestions={quizQuestions.length}
        difficulty={difficulty}
      />

      <QuestionFormComponent
        question={question}
        answers={answers}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />

      {replyString && <label>{replyString}</label>}
      <div className="submit-button">
        <CustomButton onClick={nextQuestion}>Next</CustomButton>
      </div>
    </div>
  );
};

export default QuizDisplay;
