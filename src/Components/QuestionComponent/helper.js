const shuffleAnswers = (correctAnswer, wrongAnswers) => {
  if (wrongAnswers.length < 2) {
    return ["True", "False"];
  }
  const answers = [correctAnswer, ...wrongAnswers];
  for (let i = answers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [answers[i], answers[j]] = [answers[j], answers[i]];
  }

  return answers;
};

const decodeHtmlEntities = (str) => {
  return String(str)
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&uuml;/g, "ü")
    .replace(/&rsquo;/g, "'");
};

const getReply = (correctAnswer) => {
  if (correctAnswer) {
    return `Sorry, right answer is: ${correctAnswer}`;
  } else {
    return "Yeah, You answer is correct";
  }
};

export { shuffleAnswers, decodeHtmlEntities, getReply };
