import React, { useState, useEffect } from "react";
import useDropDown from "../../Components/Dropdown/use-dropdown";
import "./sidebar.style.scss";
import axios from "axios";

import { numQuestion, difficultyLevel, questionType } from "./helper";

const Sidebar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (categories.length === 0) {
      let categories_info;
      let categoriesArray = [];
      axios.get("https://opentdb.com/api_category.php").then((response) => {
        categories_info = response.data.trivia_categories;
        categories_info.forEach((category) => {
          categoriesArray.push(category.name);
        });

        setCategories(categoriesArray);
      });
    }
  }, [categories]);

  const [selectedCategory, CategoriesDropdown] = useDropDown(
    "Select Category",
    "Any",
    ["Any", ...categories]
  );

  const [selectedNumQuestion, NumQuestionDropdown] = useDropDown(
    "Select Number of Questions",
    "Any",
    numQuestion
  );

  const [selectedDifficultyLevel, DifficultyLevelDropdown] = useDropDown(
    "Select Difficulty Level",
    "Any",
    difficultyLevel
  );

  const [selectedQuestionType, QuestionTypeDropdown] = useDropDown(
    "Select Difficulty Level",
    "Any",
    questionType
  );

  return (
    <div className="sidebar">
      <CategoriesDropdown />
      <NumQuestionDropdown />
      <DifficultyLevelDropdown />
      <QuestionTypeDropdown />
    </div>
  );
};

export default Sidebar;
