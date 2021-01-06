import { fetchData } from "../../helpers/fetcher";

const numQuestion = ["Any", "5", "10", "15"];
const difficultyLevel = ["Any", "Easy", "Medium", "Hard"];
const questionType = ["Any", "Multiple Choice", "True/False"];

const fetchCategoryData = async () => {
  const response = await fetchData("https://opentdb.com/api_category.php");
  return response.trivia_categories;
};

const getCategoryInfo = (data) => {
  if (!data) return;

  let categoriesArray = [];
  let categoriesIdsArray = [];

  data.forEach((category) => {
    categoriesArray.push(category.name);
    categoriesIdsArray.push(category.id);
  });

  return {
    categoriesInfo: categoriesArray,
    categoriesIdsInfo: categoriesIdsArray,
  };
};

export {
  numQuestion,
  difficultyLevel,
  questionType,
  fetchCategoryData,
  getCategoryInfo,
};
