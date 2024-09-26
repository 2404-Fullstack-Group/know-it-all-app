// react imports
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// component imports
import { JSXButton } from "../Elements";

// function imports
import { getDifficulty } from "../../utilities/getDifficulty";

export default function QuizCard({ quiz_id }) {
  const [quiz, setQuiz] = useState(null); // Change to null

  const loadQuiz = async () => {
    const response = await axios.get(
      `http://localhost:3000/api/quizzes/${quiz_id}`
    );
    setQuiz(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    loadQuiz();
  }, [quiz_id]); // Add quiz_id as a dependency

  return (
    <div className="quiz-card">
      {quiz ? (
        <>
          <p>{quiz.category}</p>
          <p>{`${quiz.questions.length} Questions`}</p>
          <p>{getDifficulty(quiz.questions)}</p>
        </>
      ) : (
        <p>Loading quiz...</p>
      )}
      {/* Display the quiz category */}
      <Link to={`/quizzes/${quiz_id}`}>
        <JSXButton text="play" />
      </Link>
    </div>
  );
}
