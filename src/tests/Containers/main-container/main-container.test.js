import React from "react";

import Sidebar from "../../../Containers/sidebar/sidebar";
import MainContainer from "../../../Containers/main-container/main-container";

import {
  fetchCategoryData,
  getCategoryInfo,
} from "../../../Containers/sidebar/helper";

import { act, render, cleanup, fireEvent } from "@testing-library/react";

afterEach(cleanup);
jest.mock("../../../Containers/sidebar/helper");

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

//TO-DO
test("on click play button in side bar, it should update the state in the parent container", async () => {
  await fetchCategoryData.mockResolvedValue(categories.trivia_categories);

  getCategoryInfo.mockImplementationOnce(() => ({
    categoriesInfo: [" General Knowledge ", "Entertainment: Books"],
    categoriesIdsInfo: [9, 10],
  }));

  await act(async () => {
    const { container, getByText } = render(
      <MainContainer>
        <Sidebar />
      </MainContainer>
    );

    fireEvent.click(getByText("PLAY"));
  });
});
