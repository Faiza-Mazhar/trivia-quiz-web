import React, { useEffect, useState } from "react";
import "./quiz-display.style.scss";

import QuestionHeader from "../../Components/QuestionHeader/question-header";
import CustomButton from "../../Components/CustomButton/custom-button";
import { shuffleAnswers, decodeHtmlEntities, getReply } from "./helper";

const QuizDisplay = ({ quizQuestions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answers, setAnswers] = useState();

  const [replyString, setReplyString] = useState(undefined);

  const {
    category,
    difficulty,
    question,
    correct_answer,
    incorrect_answers,
  } = quizQuestions[currentQuestion];

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
    if (currentQuestion < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setReplyString("");
    }
  };
  useEffect(() => {
    !answers && setAnswers(shuffleAnswers(correct_answer, incorrect_answers));
  }, [answers, correct_answer, incorrect_answers]);

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

      <form onSubmit={handleSubmit}>
        <div className="answers-container">
          {answers &&
            answers.map((answer) => {
              const decodedAnswer = decodeHtmlEntities(answer);
              return (
                <div key={decodedAnswer} className="answer-container">
                  <CustomButton
                    isAnswerButton={true}
                    value={decodedAnswer}
                    id={decodedAnswer}
                    onClick={handleChange}
                  >
                    {decodedAnswer}
                  </CustomButton>
                </div>
              );
            })}
        </div>

        <div className="submit-button">
          {!replyString && <CustomButton type="submit">SUBMIT</CustomButton>}
          {replyString && (
            <CustomButton onClick={nextQuestion}>Next</CustomButton>
          )}
        </div>
      </form>

      {replyString && <label>{replyString}</label>}
    </div>
  );
};

export default QuizDisplay;
