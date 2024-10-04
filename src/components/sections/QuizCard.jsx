// react imports
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// component imports
import { JSXButton } from "../Elements";

// function imports
import { getDifficulty } from "../../utilities/getDifficulty";

export default function QuizCard({ quiz, userId, token, loadQuizzes }) {
  const handleUpdateClick = () => {};

  const handleDeleteClick = async () => {
    await axios.delete(`http://localhost:3000/api/users/${userId}/quizzes/${quiz.quiz_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    await loadQuizzes()
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
