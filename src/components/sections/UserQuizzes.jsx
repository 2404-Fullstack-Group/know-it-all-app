import { useState } from "react";
import GridTemplate from "../templates/GridTemplate";
import QuizCard from "./QuizCard";
export default function UserQuizzes({ userQuizList }) {
  
  return (
    <div className="user-quizzes">
      <GridTemplate>
        {userQuizList.length > 0 ? (
          userQuizList.map((quiz, index) => (
            <QuizCard key={index} quiz_id={quiz.id} />
          ))
        ) : (
          <p>No quizzes available.</p>
        )}
      </GridTemplate>
    </div>
  );
}
