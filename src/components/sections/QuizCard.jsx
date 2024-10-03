// react imports
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// component imports
import { JSXButton } from "../Elements";

// function imports
import { getDifficulty } from "../../utilities/getDifficulty";

export default function QuizCard({ quiz }) {

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
    </div>
  );
}
