import React from "react";
import useDropDown from "../../Components/Dropdown/use-dropdown";
import "./sidebar.style.scss";

import fetchCategories from "./fetcher";
const Sidebar = () => {
  const [category, CategoriesDropdown] = useDropDown("Select Category", "Any", [
    "Any",
    ...fetchCategories(),
  ]);
  const [
    numQuestions,
    NumQuestionDropdown,
  ] = useDropDown("Select Number of Questions", "Any", [
    "Any",
    "5",
    "10",
    "15",
  ]);
  const [
    difficultyLevel,
    DifficultyLevelDropdown,
  ] = useDropDown("Select Difficulty Level", "Any", [
    "Any",
    "Easy",
    "Medium",
    "Hard",
  ]);

  const [
    questionType,
    QuestionTypeDropdown,
  ] = useDropDown("Select Difficulty Level", "Any", [
    "Any",
    "Multiple Choice",
    "True/False",
  ]);

  return (
    <div className="sidebar">
      <CategoriesDropdown />
      <NumQuestionDropdown />
      <DifficultyLevelDropdown />
      <QuestionTypeDropdown />

      {console.log({ numQuestions })}
      {console.log({ difficultyLevel })}
      {console.log({ questionType })}
      {console.log({ category })}
    </div>
  );
};

export default Sidebar;
