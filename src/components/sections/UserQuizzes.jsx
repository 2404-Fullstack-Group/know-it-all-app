import GridTemplate from "../templates/GridTemplate";
import QuizCard from "./QuizCard";
export default function UserQuizzes({ userQuizList, setUpdateQuiz }) {
  return (
    <div className="user-quizzes">
      <GridTemplate>
        {userQuizList.length ? (
          userQuizList.map((quiz, index) => (
            <QuizCard key={index} quiz={quiz} setUpdateQuiz={setUpdateQuiz} />
          ))
        ) : (
          <p>No quizzes available.</p>
        )}
      </GridTemplate>
    </div>
  );
}
