import QuestionHeader from "../../../Components/QuestionHeader/question-header";
import renderer from "react-test-renderer";

test("Question Header, if no props are set", () => {
  const component = renderer.create(<QuestionHeader />);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Question Header, with information", () => {
  const component = renderer.create(
    <QuestionHeader
      category={"Category"}
      questionNumber={1}
      totalQuestions={5}
      difficulty={"hard"}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
