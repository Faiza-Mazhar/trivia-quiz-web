import "./scores-layout.style.scss";

const ScoresLayout = ({ scores }) => {
  return (
    <div>
      <div className="score-container headings">
        <div className="index">No.</div>
        <div className="category">Category</div>
        <div className="score-layout">
          <div className="score">Score</div>
        </div>
      </div>

      {scores &&
        scores.map(({ score, category }, index) => (
          <div key={index} className="score-container">
            <div className="index">{index + 1}</div>
            <div className="category">{category}</div>
            <div className="score-layout">
              <div>{score}</div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ScoresLayout;
