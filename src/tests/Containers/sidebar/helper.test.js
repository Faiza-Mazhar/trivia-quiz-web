import {
  fetchCategoryData,
  getCategoryInfo,
} from "../../../Containers/sidebar/helper";

test("fetchCategoryData", async () => {
  await fetchCategoryData().then((response) => {
    expect(response.length).toBeGreaterThan(0);
  });
});

test("getCategoryInfo", () => {
  const data = [
    {
      id: 9,
      name: "General Knowledge",
    },
    {
      id: 10,
      name: "Entertainment: Books",
    },
  ];

  const expected = {
    categoriesInfo: ["General Knowledge", "Entertainment: Books"],
    categoriesIdsInfo: [9, 10],
  };

  expect(getCategoryInfo(data)).toEqual(expected);
});
