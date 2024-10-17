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
  isAdmin,
}) {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleDeleteClick = async () => {
    await axios.delete(
      `${API_URL}/api/users/${quiz.created_by}/quizzes/${quiz.quiz_id}`,
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
        <div className="quiz-card-questions">
          <span className="quiz-card-questions-span1">
            {quiz.questions.length}
          </span>
          {/* <span className="quiz-card-questions-span2">Questions</span> */}
        </div>
        <div className={`difficulty difficulty-${difficulty}`}>
          {/* <span>{getDifficulty(quiz.questions)}</span> */}
          <img src={`../src/assets/lightbulb-${difficulty}-icon.svg`} />
        </div>
      </>
      <Link className="quiz-card-play" to={`/quizzes/${quiz.quiz_id}`}>
        <JSXButton className="quiz-card-play-button" text="play" />
      </Link>

      {userId === quiz.created_by || isAdmin ? (
        <div className="update-delete">
          <JSXButton
            className={"quiz-card-update"}
            text="update"
            onClick={handleUpdateClick}
          />
          <JSXButton
            className={"quiz-card-delete"}
            text="delete"
            onClick={handleDeleteClick}
          />
        </div>
      ) : null}
    </div>
  );
}
