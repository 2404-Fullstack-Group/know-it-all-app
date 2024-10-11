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

  useEffect(() => {
    setUpdateQuiz(quiz);
  }, []);

  return (
    <div className={"quiz-card " + (category ? ` quiz-${category}` : null)}>
      <>
        <h3>{quiz.category}</h3>
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
