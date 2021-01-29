import QuestionFormComponent from "../../../Components/QuestionComponent/question-component";
import renderer from "react-test-renderer";

const questionData = {
  answers: ["answer1", "answer2", "answer3", "answer4"],
  category: "Category 1",
  correctAnswer: "answer1",
  difficulty: "hard",
  question: "Question 1 Statement",
  type: "multiple",
};

test("Question component shows the questions and submit button if showSubmitButton set as true", () => {
  const component = renderer.create(
    <QuestionFormComponent
      question={questionData.question}
      answers={questionData.answers}
      handleSubmit={jest.fn()}
      handleChange={jest.fn()}
      showSubmitButton={true}
    />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Question component to show with submit button set as false", () => {
  const component = renderer.create(
    <QuestionFormComponent
      question={questionData.question}
      answers={questionData.answers}
      handleSubmit={jest.fn()}
      handleChange={jest.fn()}
      showSubmitButton={false}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
