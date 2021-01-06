import React, { useState, useEffect } from "react";
import useDropDown from "../../Components/Dropdown/use-dropdown";
import CustomButton from "../../Components/CustomButton/custom-button";
import "./sidebar.style.scss";
import axios from "axios";

import { numQuestion, difficultyLevel, questionType } from "./helper";

const Sidebar = ({ setQuizQueryParams }) => {
  const [categories, setCategories] = useState([]);
  const [categoriesIds, setCategoriesIds] = useState([]);

  useEffect(() => {
    if (categories.length === 0) {
      let categories_info;
      let categoriesArray = [];
      let categoriesIdsArray = [];
      axios.get("https://opentdb.com/api_category.php").then((response) => {
        categories_info = response.data.trivia_categories;

        categories_info.forEach((category) => {
          categoriesArray.push(category.name);
          categoriesIdsArray.push(category.id);
        });

        setCategories(categoriesArray);
        setCategoriesIds(categoriesIdsArray);
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

  const onPlayButtonClick = () => {
    setQuizQueryParams({
      category: selectedCategory,
      categoryId: categoriesIds[categories.indexOf(selectedCategory)],
      numQuestion: selectedNumQuestion,
      difficultyLevel: selectedDifficultyLevel,
      questionType: selectedQuestionType,
    });
  };

  return (
    <div className="sidebar">
      <CategoriesDropdown />
      <NumQuestionDropdown />
      <DifficultyLevelDropdown />
      <QuestionTypeDropdown />
      <CustomButton onClick={onPlayButtonClick} type="button">
        PLAY
      </CustomButton>
    </div>
  );
};

export default Sidebar;
