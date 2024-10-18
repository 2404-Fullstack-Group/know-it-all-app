// react imports
import { useEffect, useState } from "react";
import axios from "axios";
import { JSXInput } from "../Elements";

// component imports
import QuizCard from "../sections/QuizCard";
import GridTemplate from "../templates/GridTemplate";

import { getDifficulty } from "../../utilities/getDifficulty";

// asset imports
import difficultyIcon from "../../../public/lightbulb-icon.svg";
import veryEasyIcon from "../../../public/lightbulb-very-easy.svg";
import easyIcon from "../../../public/lightbulb-easy.svg";
import mediumIcon from "../../../public/lightbulb-medium.svg";
import hardIcon from "../../../public/lightbulb-hard.svg";
import veryHardIcon from "../../../public/lightbulb-very-hard.svg";

export default function BrowsePage({ userId, token, setUpdateQuiz, isAdmin }) {
  const [quizList, setQuizList] = useState([]);
  const [filteredQuizList, setFilteredQuizList] = useState([]);
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState(0);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [loading, setLoading] = useState(true); // New loading state
  const API_URL = import.meta.env.VITE_API_URL;

  const difficultyLevels = [
    "Difficulty",
    "Very Easy",
    "Easy",
    "Medium",
    "Hard",
    "Very Hard",
  ];

  const loadQuizzes = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get(`${API_URL}/api/quizzes/`);
      setQuizList(response.data);
      setFilteredQuizList(response.data);
    } catch (error) {
      console.error("Error loading quizzes", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const extractTags = (quizzes) => {
    const allTags = quizzes
      .flatMap((quiz) => quiz.questions.flatMap((question) => question.tags))
      .filter((tag, index, self) => self.indexOf(tag) === index) // remove duplicates
      .sort(); // sort in alphabetical order
    return allTags;
  };
  const filterList = () => {
    const filtered = quizList.filter((quiz) => {
      const searchTerm = search.toLowerCase();

      const searchMatch =
        quiz.category.toLowerCase().includes(searchTerm) ||
        quiz.questions.some((question) => {
          return (
            question.question.toLowerCase().includes(searchTerm) ||
            question.correctAnswer.toLowerCase().includes(searchTerm) ||
            question.incorrectAnswers.some((answer) =>
              answer.toLowerCase().includes(searchTerm)
            ) ||
            question.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
          );
        });

      const difficultyMatch =
        difficulty === 0 ||
        getDifficulty(quiz.questions) === difficultyLevels[difficulty];

      const tagMatch =
        selectedTag === "" ||
        quiz.questions.some((question) => question.tags.includes(selectedTag));

      return searchMatch && difficultyMatch && tagMatch;
    });

    setFilteredQuizList(filtered);
  };

  const handleDifficultyIcon = () => {
    if (difficulty === 0) {
      return difficultyIcon;
    }
    if (difficulty === 1) {
      return veryEasyIcon;
    }
    if (difficulty === 2) {
      return easyIcon;
    }
    if (difficulty === 3) {
      return mediumIcon;
    }
    if (difficulty === 4) {
      return hardIcon;
    }
    if (difficulty === 5) {
      return veryHardIcon;
    }
  };

  useEffect(() => {
    setUpdateQuiz(null);
    const fetchData = async () => {
      await loadQuizzes();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (quizList.length) {
      setTags(extractTags(quizList));
    }
  }, [quizList]);

  useEffect(() => {
    if (quizList.length) {
      filterList();
    }
  }, [search, difficulty, selectedTag]);

  return (
    <>
      <div className="filter-bar">
        <JSXInput
          className={"search-input"}
          placeholder={"Search..."}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          <option value="">All Tags</option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
        <div className="slider-container">
          <input
            id="difficulty-slider"
            type="range"
            min="0"
            max="5"
            value={difficulty}
            onChange={(e) => setDifficulty(Number(e.target.value))}
          />
          <img src={handleDifficultyIcon()} />
          <span>{difficultyLevels[difficulty]}</span>
        </div>
      </div>

      {loading ? (
        <p>Loading Quizzes...</p>
      ) : filteredQuizList.length ? (
        <GridTemplate>
          {filteredQuizList.map((quiz, index) => (
            <QuizCard
              key={index}
              quiz={quiz}
              userId={userId}
              token={token}
              loadQuizzes={loadQuizzes}
              setUpdateQuiz={setUpdateQuiz}
              isAdmin={isAdmin}
            />
          ))}
        </GridTemplate>
      ) : (
        <p>Cannot find quizzes matching your search...</p>
      )}
    </>
  );
}
