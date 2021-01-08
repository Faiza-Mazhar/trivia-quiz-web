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
    "Select Category",
    "Any",
    ["Any", ...categories]
  );

  const [selectedNumQuestion, NumQuestionDropdown] = useDropDown(
    "Select Number of Questions",
    "5",
    numQuestion
  );

  const [selectedDifficultyLevel, DifficultyLevelDropdown] = useDropDown(
    "Select Difficulty Level",
    "Any",
    difficultyLevel
  );

  const [selectedQuestionType, QuestionTypeDropdown] = useDropDown(
    "Select Questions Type",
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
