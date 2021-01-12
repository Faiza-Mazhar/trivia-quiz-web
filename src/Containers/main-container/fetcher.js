import { fetchData } from "../../helpers/fetcher";

const fetchQuestions = async (quizQueryParams) => {
  const url = generateQuizUrl(quizQueryParams);
  const response = await fetchData(url);
  return decodeData(response.results);
};

const decodeData = (data) => {
  if (data === {}) return;
  return data.map((questionItem) => {
    const correctAnswer = decodeHtmlEntities(questionItem.correct_answer);
    const answers = shuffleAnswers(
      correctAnswer,
      questionItem.incorrect_answers
    );
    const { category, type, difficulty, question } = questionItem;
    return {
      category: category,
      type: type,
      difficulty: difficulty,
      question: decodeHtmlEntities(question),
      correctAnswer: correctAnswer,
      answers: answers,
    };
  });
};

const decodeHtmlEntities = (str) => {
  return String(str)
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&uuml;/g, "ü")
    .replace(/&ntilde;/g, "ñ")
    .replace(/&rsquo;/g, "'");
};

const shuffleAnswers = (correctAnswer, wrongAnswers) => {
  if (wrongAnswers.length < 2) {
    return ["True", "False"];
  }
  const answers = [
    correctAnswer,
    ...wrongAnswers.map((answer) => decodeHtmlEntities(answer)),
  ];
  for (let i = answers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [answers[i], answers[j]] = [answers[j], answers[i]];
  }

  return answers;
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

  if (categoryId && category && category !== "Any") {
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
