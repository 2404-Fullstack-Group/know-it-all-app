// react imports
import { useEffect, useState } from "react";
import axios from "axios";
import { JSXInput } from "../Elements";

// component imports
import QuizCard from "../sections/QuizCard";
import GridTemplate from "../templates/GridTemplate";


export default function BrowsePage({ userId, token, setUpdateQuiz }) {
  const [quizList, setQuizList] = useState([]);
  const [filteredQuizList, setFilteredQuizList] = useState([]);
  const [search, setSearch] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  const loadQuizzes = async () => {
    const response = await axios.get(`${API_URL}/api/quizzes/`);
    setQuizList(response.data);
    setFilteredQuizList(response.data);
  };

  const filterList = () => {
    setFilteredQuizList(
      quizList.filter((quiz) => {
        const category = quiz.category.toLowerCase();
        if (category.includes(search.toLowerCase())) {
          return true;
        }
        const questions = quiz.questions;
        for (let i = 0; i < questions.length; i++) {
          const tags = questions[i].tags;
          if (tags.length > 0) {
            for (let j = 0; j < tags.length; j++) {
              const tag = tags[j].toLowerCase();
              if (tag.includes(search.toLowerCase())) {
                return true;
              }
            }
          }
        }
      })
    );
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
      filterList();
    }
  }, [search]);
  return (
    <>
      <JSXInput
        placeholder={"Search..."}
        onChange={(e) => setSearch(e.target.value)}
      />
      <GridTemplate>
        {filteredQuizList.length ? (
          filteredQuizList.map((quiz, index) => (
            <QuizCard
              key={index}
              quiz={quiz}
              userId={userId}
              token={token}
              loadQuizzes={loadQuizzes}
              setUpdateQuiz={setUpdateQuiz}
            />
          ))
        ) : (
          <p>Loading Quizzes...</p>
        )}
      </GridTemplate>
    </>
  );
}
