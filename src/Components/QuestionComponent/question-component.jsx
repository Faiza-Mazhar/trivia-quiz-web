import React from "react";
import CustomButton from "../../Components/CustomButton/custom-button";
import { decodeHtmlEntities } from "./helper";

import "./question-component.style.scss";
const QuestionFormComponent = ({
  question,
  answers,
  handleSubmit,
  handleChange,
  showSubmitButton,
}) => {
  return (
    <div>
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
          {showSubmitButton && (
            <CustomButton type="submit">SUBMIT</CustomButton>
          )}
        </div>
      </form>
    </div>
  );
};

export default QuestionFormComponent;
