import React from "react";

import Sidebar from "../../../Containers/sidebar/sidebar";
import MainContainer from "../../../Containers/main-container/main-container";
import QuizDisplay from "../../../Containers/QuizDisplay/quiz-display";

import {
  fetchCategoryData,
  getCategoryInfo,
} from "../../../Containers/sidebar/helper";

import { fetchQuestions } from "../../../Containers/main-container/fetcher";
import { act, render, cleanup, fireEvent } from "@testing-library/react";

afterEach(cleanup);
jest.mock("../../../Containers/sidebar/helper");
jest.mock("../../../Containers/main-container/fetcher");

const categories = {
  trivia_categories: [
    {
      id: 9,
      name: "General Knowledge ",
    },
    {
      id: 10,
      name: "Entertainment: Books ",
    },
  ],
};

const questions = {
  results: [
    {
      category: "Science & Nature",
      type: "multiple",
      difficulty: "medium",
      question: "What is the unit of electrical capacitance?",
      correct_answer: "Farad",
      incorrect_answers: ["Gauss", "Henry", "Watt"],
    },
    {
      category: "Entertainment: Film",
      type: "multiple",
      difficulty: "hard",
      question:
        "The film Mad Max: Fury Road features the Dies Irae from which composer&#039;s requiem?",
      correct_answer: "Verdi",
      incorrect_answers: ["Mozart", "Berlioz", "Brahms"],
    },
  ],
};

test.only("on click play button in side bar, it should update the state in the parent container", async () => {
  await fetchCategoryData.mockResolvedValue(categories.trivia_categories);

  getCategoryInfo.mockImplementationOnce(() => ({
    categoriesInfo: [" C1 ", "C2"],
    categoriesIdsInfo: [9, 10],
  }));

  await fetchQuestions.mockResolvedValue(questions);

  await act(async () => {
    const { container, getByText, rerender } = render(
      <MainContainer>
        <Sidebar />
        <QuizDisplay quizQuestions={""} />
      </MainContainer>
    );

    fireEvent.click(getByText("PLAY"));
  });
});
