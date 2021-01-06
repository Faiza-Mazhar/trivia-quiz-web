import React, { useState } from "react";
import Sidebar from "../sidebar/sidebar";

const MainContainer = () => {
  const [quizQueryParams, setQuizQueryParams] = useState();
  return (
    <div className="main-container">
      <Sidebar setQuizQueryParams={setQuizQueryParams} />
    </div>
  );
};

export default MainContainer;
