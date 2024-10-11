import { useState } from "react";
import GridTemplate from "../templates/GridTemplate";
import QuizCard from "./QuizCard";
export default function UserQuizzes({ userQuizList, setUpdateQuiz, token, loadQuizzes, user_id }) {
  return (
    <div className="user-quizzes">
      <GridTemplate>
        {userQuizList.length ? (
          userQuizList.map((quiz, index) => (
            <QuizCard
              key={index}
              quiz={quiz}
              userId={user_id}
              token={token}
              loadQuizzes={loadQuizzes}
              setUpdateQuiz={setUpdateQuiz}
            />
          ))
        ) : (
          <p>No quizzes available.</p>
        )}
      </GridTemplate>
    </div>
  );
}
