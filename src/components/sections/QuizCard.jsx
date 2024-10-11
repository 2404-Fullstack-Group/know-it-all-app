// react imports
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// component imports
import { JSXButton } from "../Elements";

// function imports
import { getDifficulty } from "../../utilities/getDifficulty";

export default function QuizCard({
  quiz,
  userId,
  token,
  loadQuizzes,
  setUpdateQuiz,
}) {
  const navigate = useNavigate();
  const handleDeleteClick = async () => {
    await axios.delete(
      `https://know-it-all-app.onrender.com/api/users/${userId}/quizzes/${quiz.quiz_id}`,
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

  return (
    <div className="quiz-card">
      <>
        <p>{quiz.category}</p>
        <p>{`${quiz.questions.length} Questions`}</p>
        <p>{getDifficulty(quiz.questions)}</p>
      </>
      <Link to={`/quizzes/${quiz.quiz_id}`}>
        <JSXButton text="play" />
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
