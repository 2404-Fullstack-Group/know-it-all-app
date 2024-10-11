// react imports
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// component imports
import { JSXButton } from "../Elements";

// function imports
import { getDifficulty } from "../../utilities/getDifficulty";
import { useEffect, useState } from "react";

export default function QuizCard({
  quiz,
  userId,
  token,
  loadQuizzes,
  setUpdateQuiz,
}) {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleDeleteClick = async () => {
    await axios.delete(
      `${API_URL}/api/users/${userId}/quizzes/${quiz.quiz_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    await loadQuizzes();
  };
  const handleUpdateClick = () => {
    setUpdateQuiz(quiz);
    navigate("/create/quiz-maker");
  };

  const handleClassName = (name) => {
    return name.toLowerCase().replace(/&/g, "and").replace(/\s+/g, "-");
  };
  useEffect(() => {
    setCategory(handleClassName(quiz.category));
    setDifficulty(handleClassName(getDifficulty(quiz.questions)));
  }, [quiz]);

  useEffect(() => {
    setUpdateQuiz(quiz);
  }, []);

  return (
    <div className={"quiz-card" + (category ? ` quiz-card-${category}` : "")}>
      <>
        <h3>{quiz.category}</h3>
        <p>{`${quiz.questions.length} Questions`}</p>
        <p className={`difficulty-${difficulty}`}>
          {getDifficulty(quiz.questions)}
        </p>
      </>
      <Link className="quiz-card-play" to={`/quizzes/${quiz.quiz_id}`}>
        <JSXButton className="quiz-card-play-button" text="play" />
      </Link>

      {userId === quiz.created_by ? (
        <>
          <JSXButton text="update" onClick={handleUpdateClick} />
          <JSXButton text="delete" onClick={handleDeleteClick} />
        </>
      ) : null}
    </div>
  );
}
