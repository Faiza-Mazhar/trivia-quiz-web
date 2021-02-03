import React from "react";

import MainContainer from "../../../Containers/main-container/main-container";
import QuizDisplay from "../../../Containers/QuizDisplay/quiz-display";

import {
  fetchCategoryData,
  getCategoryInfo,
} from "../../../Containers/sidebar/helper";

import { fetchQuestions } from "../../../Containers/main-container/fetcher";
import {
  act,
  render,
  waitFor,
  screen,
  fireEvent,
  cleanup,
} from "@testing-library/react";

beforeEach(cleanup);

jest.mock("../../../Containers/sidebar/helper");
jest.mock("../../../Containers/main-container/fetcher");

const questions_response = {
  questions: [
    {
      answers: ["answer1", "answer2", "answer3", "answer4"],
      category: "Category 1",
      correctAnswer: "answer1",
      difficulty: "hard",
      question: "Question 1 Statement",
      type: "multiple",
    },
    {
      answers: ["True", "False"],
      category: "Category 2",
      correctAnswer: "True",
      difficulty: "hard",
      question: "Question 2 Statement",
      type: "boolean",
    },
  ],
};

const newQuestionResponse = {
  questions: [
    {
      answers: ["answer1", "answer2", "answer3", "answer4"],
      category: "Category 1",
      correctAnswer: "New correct answer1",
      difficulty: "hard",
      question: "New Question Statement 1",
      type: "multiple",
    },
  ],
};

const setup = async () => {
  const anyResponse = {};
  await fetchCategoryData.mockResolvedValue(anyResponse);

  getCategoryInfo.mockImplementationOnce(() => ({
    categoriesInfo: [" C1 ", "C2"],
    categoriesIdsInfo: [9, 10],
  }));

  await fetchQuestions
    .mockImplementationOnce(() => Promise.resolve(questions_response.questions))
    .mockImplementationOnce(() =>
      Promise.resolve(newQuestionResponse.questions)
    );
};

test("On load, if question data is unavailable, then render the `loading...` information label component", async () => {
  await setup();
  await act(async () => {
    const { getByText } = render(<MainContainer />);
    await waitFor(() => getByText("Loading..."));

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});

test("On load, if question data is available, then render the quiz display container", async () => {
  await setup();

  await act(async () => {
    const { getByText } = render(<MainContainer />);
    await waitFor(() => getByText("SUBMIT"));

    expect(screen.getByText("Question 1 Statement")).toBeInTheDocument();
  });
});

test("on click play button in side bar, it should update the state in the parent container", async () => {
  await setup();
  await act(async () => {
    const { getByText, rerender } = render(<MainContainer />);
    await waitFor(() => getByText("PLAY"));
    fireEvent.click(getByText("PLAY"));

    await waitFor(() => getByText("Question 1 Statement"));

    expect(screen.getByText("Question 1 Statement")).toBeInTheDocument();
    rerender(
      <MainContainer>
        <QuizDisplay />
      </MainContainer>
    );
    await waitFor(() => getByText("SUBMIT"));

    expect(screen.getByText("New Question Statement 1")).toBeInTheDocument();
  });
});

test("If user press Submit after checking a radio button, Your Answer statement is displayed", async () => {
  await setup();

  await act(async () => {
    const { getByText, getByLabelText } = render(<MainContainer />);
    await waitFor(() => getByText("SUBMIT"));

    const radioButton1 = getByLabelText("answer1");

    expect(radioButton1).not.toBeChecked();

    fireEvent.click(radioButton1, { target: { value: "answer1" } });
    expect(radioButton1).toBeChecked();

    fireEvent.click(getByText("SUBMIT"));

    await waitFor(() => getByText("NEXT"));
    expect(screen.getByText("Your answer: answer1")).toBeInTheDocument();
  });
});

test("If user press submit button without selecting any answer, an alert is displayed", async () => {
  jest.spyOn(window, "alert").mockImplementation(() => {});
  await setup();

  await act(async () => {
    const { getByText } = render(<MainContainer />);
    await waitFor(() => getByText("SUBMIT"));

    fireEvent.click(getByText("SUBMIT"));
    expect(window.alert).toBeCalledWith("Please select an answer");
  });
});

test("If user select a correct answer, then respective reply is displayed", async () => {
  await setup();

  await act(async () => {
    const { getByText, getByLabelText } = render(<MainContainer />);
    await waitFor(() => getByText("SUBMIT"));

    const radioButton1 = getByLabelText("answer1");

    expect(radioButton1).not.toBeChecked();

    fireEvent.click(radioButton1, { target: { value: "answer1" } });
    expect(radioButton1).toBeChecked();

    fireEvent.click(getByText("SUBMIT"));

    await waitFor(() => getByText("NEXT"));
    expect(screen.getByText("Yeah, You answer is correct")).toBeInTheDocument();
  });
});

test("If user select an incorrect answer, then respective reply is displayed", async () => {
  await setup();

  await act(async () => {
    const { getByText, getByLabelText } = render(<MainContainer />);

    await waitFor(() => getByText("SUBMIT"));
    const radioButton = getByLabelText("answer2");
    expect(radioButton).not.toBeChecked();

    fireEvent.click(radioButton, { target: { value: "answer2" } });
    expect(radioButton).toBeChecked();
    fireEvent.click(getByText("SUBMIT"));

    await waitFor(() => getByText("NEXT"));
    expect(
      screen.getByText(/Sorry, right answer is: answer1/i)
    ).toBeInTheDocument();
  });
});

test("On pressing the Next button, next question is rendered", async () => {
  await setup();

  await act(async () => {
    const { getByText, getByLabelText } = render(<MainContainer />);

    await waitFor(() => getByText("SUBMIT"));
    const radioButton = getByLabelText("answer1");
    expect(radioButton).not.toBeChecked();

    fireEvent.click(radioButton, { target: { value: "answer1" } });
    expect(radioButton).toBeChecked();
    fireEvent.click(getByText("SUBMIT"));

    await waitFor(() => getByText("NEXT"));

    fireEvent.click(getByText("NEXT"));

    expect(screen.getByText("Question 2 Statement")).toBeInTheDocument();
  });
});

test("If it is the last question, then by pressing next button, renders the score", async () => {
  await setup();

  await act(async () => {
    const { getByText, getByLabelText } = render(<MainContainer />);

    await waitFor(() => getByText("SUBMIT"));
    let radioButton = getByLabelText("answer1");
    expect(radioButton).not.toBeChecked();

    fireEvent.click(radioButton, { target: { value: "answer1" } });
    expect(radioButton).toBeChecked();
    fireEvent.click(getByText("SUBMIT"));

    await waitFor(() => getByText("NEXT"));
    fireEvent.click(getByText("NEXT"));

    expect(screen.getByText("Question 2 Statement")).toBeInTheDocument();

    await waitFor(() => getByText("SUBMIT"));
    radioButton = getByLabelText("True");
    expect(radioButton).not.toBeChecked();

    fireEvent.click(radioButton, { target: { value: "true" } });
    expect(radioButton).toBeChecked();
    fireEvent.click(getByText("SUBMIT"));

    await waitFor(() => getByText("NEXT"));
    fireEvent.click(getByText("NEXT"));

    expect(
      screen.getByText("You answered 1 questions correctly out of 2")
    ).toBeInTheDocument();
  });
});
