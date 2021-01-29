import React from "react";
import CustomButton from "../../Components/CustomButton/custom-button";
import RadioButton from "../../Components/RadioButton/radio-button";
import useRadioButtons from "../RadioButton/use-radio-button";

import "./question-component.style.scss";
const QuestionFormComponent = ({
  question,
  answers,
  handleSubmit,
  handleChange,
  showSubmitButton,
}) => {
  const [, answerInputProps] = useRadioButtons("answers", handleChange);

  return (
    <div>
      <div className="question">{question}</div>

      <form onSubmit={handleSubmit}>
        {showSubmitButton && (
          <div>
            <div className="answers-container">
              {answers &&
                answers.map((answer) => {
                  return (
                    <div key={answer} className="answer-container">
                      <RadioButton
                        value={answer}
                        key={answer}
                        inputProps={answerInputProps}
                      />
                    </div>
                  );
                })}
            </div>

            <div className="submit-button">
              <CustomButton type="submit">SUBMIT</CustomButton>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default QuestionFormComponent;
