import React from "react";
import CustomButton from "../../Components/CustomButton/custom-button";
import RadioButton from "../../Components/RadioButton/radio-button";
import { decodeHtmlEntities } from "./helper";

import "./question-component.style.scss";
const QuestionFormComponent = ({
  question,
  answers,
  handleSubmit,
  handleChange,
  showSubmitButton,
  currentSelectedValue,
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
                  <RadioButton
                    name={"answers"}
                    value={decodedAnswer}
                    key={decodedAnswer + "radio"}
                    onClick={handleChange}
                    currentSelectedValue={currentSelectedValue}
                  />
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
