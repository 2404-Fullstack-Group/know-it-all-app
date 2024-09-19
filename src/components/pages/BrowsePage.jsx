// react imports
import { useEffect, useState } from "react";
import axios from "axios";
import QuizCard from "../sections/QuizCard";
import GridTemplate from "../templates/GridTemplate";

export default function BrowsePage() {
  const [quizList, setQuizList] = useState([]);

  const loadQuizzes = async () => {
    const response = await axios.get("http://localhost:3000/api/quizzes/");
    setQuizList(response.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadQuizzes();
    };
    fetchData();
  }, []);
  return (
    <>
      {" "}
      <GridTemplate>
        {quizList.length > 0 ? (
          quizList.map((quiz, index) => (
            <QuizCard key={index} quiz_id={quiz.id} />
          ))
        ) : (
          <p>No quizzes available.</p>
        )}
      </GridTemplate>
    </>
  );
}
