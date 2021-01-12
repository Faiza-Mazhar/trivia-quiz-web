import React, { useState, useEffect } from "react";
import useDropDown from "../../Components/Dropdown/use-dropdown";
import CustomButton from "../../Components/CustomButton/custom-button";
import "./sidebar.style.scss";

import {
  numQuestion,
  difficultyLevel,
  questionType,
  fetchCategoryData,
  getCategoryInfo,
} from "./helper";

const Sidebar = ({ setQuizQueryParams }) => {
  const [categories, setCategories] = useState([]);
  const [categoriesIds, setCategoriesIds] = useState([]);

  useEffect(() => {
    fetchCategoryData().then((res) => {
      const { categoriesInfo, categoriesIdsInfo } = getCategoryInfo(res);

      setCategories(categoriesInfo);
      setCategoriesIds(categoriesIdsInfo);
    });
  }, []);

  const [selectedCategory, CategoriesDropdown] = useDropDown(
    "Category",
    "Any",
    ["Any", ...categories]
  );

  const [selectedNumQuestion, NumQuestionDropdown] = useDropDown(
    "Number of Questions",
    "5",
    numQuestion
  );

  const [selectedDifficultyLevel, DifficultyLevelDropdown] = useDropDown(
    "Difficulty Level",
    "Any",
    difficultyLevel
  );

  const [selectedQuestionType, QuestionTypeDropdown] = useDropDown(
    "Questions Type",
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
      <div className="dropdown-menu">
        <CategoriesDropdown />
        <NumQuestionDropdown />
        <DifficultyLevelDropdown />
        <QuestionTypeDropdown />
      </div>

      <div className="custom-button-container">
        <CustomButton onClick={onPlayButtonClick} type="button">
          PLAY
        </CustomButton>
      </div>
    </div>
  );
};

export default Sidebar;
