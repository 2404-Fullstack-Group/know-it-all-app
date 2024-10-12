// react imports
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

// component imports
import Quiz from "../sections/Quiz";

export default function QuizPage() {
  const { quiz_id } = useParams();
  const [quiz, setQuiz] = useState({
    quiz_id: "",
    questions: Array(1).fill({
      category: "",
      difficulty: "",
      question: "",
      correctAnswer: "",
      incorrectAnswers: Array(3).fill(""),
      tags: Array(3).fill(""),
      type: "Multiple Choice",
    }),
  });
  const API_URL = import.meta.env.VITE_API_URL;

  const loadQuiz = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/quizzes/${quiz_id}`);
      setQuiz(response.data);
    } catch (error) {
      console.error("Error loading quiz:", error);
    }
  };

  useEffect(() => {
    loadQuiz();
  }, [quiz_id]);

  return <div>{quiz ? <Quiz quiz={quiz} /> : <p>Loading quiz...</p>}</div>;
}
