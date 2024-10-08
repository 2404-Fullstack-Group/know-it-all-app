import { useEffect, useState } from "react";
import { JSXSpan } from "../Elements";
import Question from "./Question";
import axios from "axios";

export default function RandomQuiz() {
  const [userAnswer, setUserAnswer] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState({
    id: "",
    question: "",
    correctAnswer: "",
    incorrectAnswers: [],
  });

  const newQuestion = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/questions/random",
      {
        params: {
          questionCount: 1,
        },
      }
    );
    setCurrentQuestion(response.data[0]);
  };

  const handleAnswerChange = (questionId, answer) => {
    setUserAnswer((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  useEffect(() => {
    newQuestion();
  }, []);

  return (
    <>
      <Question 
        question={currentQuestion}
        selectedAnswer={userAnswer[currentQuestion.id]}
        onAnswerChange={handleAnswerChange}
      />
    </>
  );
}
