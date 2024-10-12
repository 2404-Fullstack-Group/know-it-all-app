import { useEffect, useState } from "react";
import { JSXSpan, JSXButton } from "../Elements";
import Question from "./Question";
import axios from "axios";

export default function RandomQuiz() {
  const [userAnswer, setUserAnswer] = useState({});
  const [streak, setStreak] = useState(0);
  const [difficulty, setDifficulty] = useState("easy");
  const [showCorrect, setShowCorrect] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({
    id: "",
    question: "",
    correctAnswer: "",
    incorrectAnswers: [],
  });
  const API_URL = import.meta.env.VITE_API_URL;

  const newQuestion = async () => {
    const response = await axios.get(`${API_URL}/api/questions/random`, {
      params: {
        questionCount: 1,
        difficulty: difficulty,
      },
    });
    setCurrentQuestion(response.data[0]);
  };

  const handleAnswerChange = (questionId, answer) => {
    setUserAnswer((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleSubmit = () => {
    if (userAnswer[currentQuestion.id] === currentQuestion.correctAnswer) {
      setStreak(streak + 1);
      newQuestion();
      setUserAnswer({});
    } else {
      setShowCorrect(true);
      setTimeout(() => {
        newQuestion();
        setUserAnswer({});
        setStreak(0);
        setShowCorrect(false);
      }, 2500);
    }
  };

  const updateDifficulty = () => {
    if (streak < 5) {
      setDifficulty("easy");
      return;
    } else if (streak <= 15) {
      setDifficulty("medium");
      return;
    } else if (streak > 15) {
      setDifficulty("hard");
    }
  };

  useEffect(() => {
    updateDifficulty();
    newQuestion();
  }, []);

  return (
    <div className="random-quiz">
      <div className="random-header">
        <h3>
          <JSXSpan text={"Random Quiz"} />
        </h3>
        <h3>
          <JSXSpan text={`Streak: ${streak}`} />
        </h3>
      </div>
      <Question
        question={currentQuestion}
        selectedAnswer={userAnswer[currentQuestion.id]}
        onAnswerChange={handleAnswerChange}
      />
      {currentQuestion.id ? (
        showCorrect ? (
          `Correct Answer: ${currentQuestion.correctAnswer}`
        ) : (
          <JSXButton text={"Submit"} onClick={handleSubmit} />
        )
      ) : null}
    </div>
  );
}
