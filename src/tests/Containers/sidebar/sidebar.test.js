import React from "react";

import Sidebar from "../../../Containers/sidebar/sidebar";
import {
  fetchCategoryData,
  getCategoryInfo,
} from "../../../Containers/sidebar/helper";

import { act, render, cleanup, waitFor } from "@testing-library/react";

afterEach(cleanup);

jest.mock("../../../Containers/sidebar/helper");

test("Sidebar component should fetch categories information and populate the category dropdown on loading the page", async () => {
  const anyResponse = {};
  await fetchCategoryData.mockResolvedValue(anyResponse);

  getCategoryInfo.mockImplementationOnce(() => ({
    categoriesInfo: [" C1 ", "C2"],
    categoriesIdsInfo: [9, 10],
  }));

  await act(async () => {
    const { getByText } = render(<Sidebar />);

    await waitFor(() => getByText("C1"));

    expect(await fetchCategoryData).toHaveBeenCalled();
    expect(await fetchCategoryData).toHaveBeenCalledTimes(1);

    expect(getByText(/Category/i).textContent).toBe("CategoryAny C1 C2");
  });
});
