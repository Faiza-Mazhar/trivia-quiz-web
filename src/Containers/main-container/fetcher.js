import { fetchData } from "../../helpers/fetcher";

const fetchQuestions = async (quizQueryParams) => {
  const url = generateQuizUrl(quizQueryParams);
  const response = await fetchData(url);

  return response.results;
};

const generateQuizUrl = ({
  category,
  categoryId,
  difficultyLevel,
  numQuestion,
  questionType,
}) => {
  let quizURL = "https://opentdb.com/api.php?";

  quizURL = numQuestion && `${quizURL}amount=${numQuestion}`;

  if (categoryId && category !== "Any") {
    quizURL = `${quizURL}&category=${categoryId}`;
  }

  if (difficultyLevel && difficultyLevel !== "Any") {
    const level = difficultyLevel.toLowerCase();
    quizURL = `${quizURL}&difficulty=${level}`;
  }

  if (questionType && questionType !== "Any") {
    const type = questionType === "True/False" ? "boolean" : "multiple";
    quizURL = `${quizURL}&type=${type}`;
  }

  return quizURL;
};

export { fetchQuestions, generateQuizUrl };
