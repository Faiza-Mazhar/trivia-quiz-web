import React from "react";
import CustomButton from "../../Components/CustomButton/custom-button";
import RadioButton from "../../Components/RadioButton/radio-button";
import useRadioButtons from "../RadioButton/use-radio-button";
import { decodeHtmlEntities } from "./helper";

import "./question-component.style.scss";
const QuestionFormComponent = ({
  question,
  answers,
  handleSubmit,
  handleChange,
  showSubmitButton,
}) => {
  const [ans, answerInputProps] = useRadioButtons("answers", handleChange);

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
                    value={decodedAnswer}
                    key={decodedAnswer}
                    inputProps={answerInputProps}
                    answer={ans}
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
