const getReply = (correctAnswer) => {
  if (correctAnswer) {
    return `Sorry, right answer is: ${correctAnswer}`;
  } else {
    return "Yeah, You answer is correct";
  }
};

export { getReply };
