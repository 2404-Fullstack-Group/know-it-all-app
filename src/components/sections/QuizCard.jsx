// react imports
import { useEffect, useState } from "react";
import axios from "axios";

export default function QuizCard({ quiz_id }) {
  const [quiz, setQuiz] = useState([]);

  const loadQuiz = async () => {
    const response = await axios.get(
      `http://localhost:3000/api/quizzes/${quiz_id}`
    );
    setQuiz(response.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadQuiz();
    };
    fetchData();
    console.log(quiz);
  }, []);
  return (
    <div className="quiz-card">{quiz[0] ? <p>{quiz[0].quiz_id}</p> : null}</div>
  );
}
