const ScoresLayout = ({ scores }) => {
  return <div>{scores && scores.map(({ score }) => <div>{score}</div>)}</div>;
};

export default ScoresLayout;
