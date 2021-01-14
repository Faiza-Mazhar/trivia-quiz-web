import "./scores-layout.style.scss";

const ScoresLayout = ({ scores }) => {
  return (
    <div>
      <div className="score-container headings">
        <div className="index">No.</div>
        <div className="category">Category</div>
        <div className="score">Score</div>
      </div>

      {scores &&
        scores.map(({ score, category }, index) => (
          <div key={index} className="score-container">
            <div className="index">{index + 1}</div>
            <div className="category">{category}</div>
            <div className="score">{score}</div>
          </div>
        ))}
    </div>
  );
};

export default ScoresLayout;
