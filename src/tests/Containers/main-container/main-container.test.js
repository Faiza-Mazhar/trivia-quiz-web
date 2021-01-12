import React from "react";

import Sidebar from "../../../Containers/sidebar/sidebar";
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
} from "@testing-library/react";

jest.mock("../../../Containers/sidebar/helper");
jest.mock("../../../Containers/main-container/fetcher");

const questions_response = {
  questions: [
    {
      answers: ["answer1", "answer2", "answer3", "answer4"],
      category: "Category 1",
      correctAnswer: "correct answer1",
      difficulty: "hard",
      question: "Question 1 Statement",
      type: "multiple",
    },
    {
      answers: ["True", "False"],
      category: "Category 2",
      correctAnswer: "correct answer2",
      difficulty: "hard",
      question: "Question 2 Statement",
      type: "boolean",
    },
  ],
};

test("On load, if question data is unavailable, the render the information label component", async () => {
  const anyResponse = {};
  await fetchCategoryData.mockResolvedValue(anyResponse);

  getCategoryInfo.mockImplementationOnce(() => ({
    categoriesInfo: [" C1 ", "C2"],
    categoriesIdsInfo: [9, 10],
  }));

  await fetchQuestions.mockResolvedValue(questions_response.questions);

  await act(async () => {
    const { getByText } = render(<MainContainer />);
    await waitFor(() => getByText("Loading..."));

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});

test("On load, if question data is available, the render the quiz display container", async () => {
  const anyResponse = {};
  await fetchCategoryData.mockResolvedValue(anyResponse);

  getCategoryInfo.mockImplementationOnce(() => ({
    categoriesInfo: [" C1 ", "C2"],
    categoriesIdsInfo: [9, 10],
  }));

  await fetchQuestions.mockResolvedValue(questions_response.questions);

  await act(async () => {
    const { getByText } = render(<MainContainer />);
    await waitFor(() => getByText("SUBMIT"));

    expect(screen.getByText("Question 1 Statement")).toBeInTheDocument();
  });
});

test.only("on click play button in side bar, it should update the state in the parent container", async () => {
  const anyResponse = {};
  await fetchCategoryData.mockResolvedValue(anyResponse);

  getCategoryInfo.mockImplementationOnce(() => ({
    categoriesInfo: [" C1 ", "C2"],
    categoriesIdsInfo: [9, 10],
  }));

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
      {
        answers: ["answer1", "answer2", "answer3", "answer4"],
        category: "Category 1",
        correctAnswer: "New correct answer 2",
        difficulty: "hard",
        question: "New Question Statement 2",
        type: "multiple",
      },
    ],
  };

  await fetchQuestions
    .mockImplementationOnce(() => Promise.resolve(questions_response.questions))
    .mockImplementationOnce(() =>
      Promise.resolve(newQuestionResponse.questions)
    );

  await act(async () => {
    const { getByText, rerender } = render(<MainContainer />);
    await waitFor(() => getByText("PLAY"));
    fireEvent.click(getByText("PLAY"));

    rerender(
      <MainContainer>
        <QuizDisplay quizQuestions={newQuestionResponse.questions} />
      </MainContainer>
    );
    await waitFor(() => getByText("New Question Statement 1"));

    expect(screen.getByText("New Question Statement 1")).toBeInTheDocument();
  });
});
