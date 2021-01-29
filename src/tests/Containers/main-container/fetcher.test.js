import {
  fetchQuestions,
  generateQuizUrl,
} from "../../../Containers/main-container/fetcher";

test("generateQuizUrl should return correct url for default parameters", () => {
  const quizQueryParams = {
    category: "Any",
    categoryId: undefined,
    difficultyLevel: "Any",
    numQuestion: "5",
    questionType: "Any",
  };
  expect(generateQuizUrl(quizQueryParams)).toBe(
    "https://opentdb.com/api.php?amount=5"
  );
});

test("generateQuizUrl should append category id if category is present", () => {
  const quizQueryParams = {
    category: "Books",
    categoryId: 1,
    difficultyLevel: "Any",
    numQuestion: "5",
    questionType: "Any",
  };
  expect(generateQuizUrl(quizQueryParams)).toBe(
    "https://opentdb.com/api.php?amount=5&category=1"
  );
});

test("generateQuizUrl should append difficulty level if it is present", () => {
  const quizQueryParams = {
    category: "Books",
    categoryId: 1,
    difficultyLevel: "Hard",
    numQuestion: "5",
    questionType: "Any",
  };
  expect(generateQuizUrl(quizQueryParams)).toBe(
    "https://opentdb.com/api.php?amount=5&category=1&difficulty=hard"
  );
});

test("generateQuizUrl should append boolean question type if it is present", () => {
  const quizQueryParams = {
    category: "Books",
    categoryId: 1,
    difficultyLevel: "Hard",
    numQuestion: "5",
    questionType: "True/False",
  };
  expect(generateQuizUrl(quizQueryParams)).toBe(
    "https://opentdb.com/api.php?amount=5&category=1&difficulty=hard&type=boolean"
  );
});

test("generateQuizUrl should append - multiple - question type if it is present", () => {
  const quizQueryParams = {
    category: "Books",
    categoryId: 1,
    difficultyLevel: "Hard",
    numQuestion: "5",
    questionType: "Multiple Choice",
  };
  expect(generateQuizUrl(quizQueryParams)).toBe(
    "https://opentdb.com/api.php?amount=5&category=1&difficulty=hard&type=multiple"
  );
});

test("fetchQuestions should return the question JSON array", async () => {
  const quizQueryParams = {
    category: "Any",
    categoryId: undefined,
    difficultyLevel: "Any",
    numQuestion: "5",
    questionType: "Any",
  };

  await fetchQuestions(quizQueryParams).then((response) => {
    expect(response.length).toBe(5);
  });
});
