import { useEffect, useState } from "react";
import { JSXSpan, JSXButton } from "../Elements";
import Question from "./Question";
import axios from "axios";

export default function RandomQuiz() {
  const [userAnswer, setUserAnswer] = useState({});
  const [streak, setStreak] = useState(0);
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

  const handleSubmit = () => {
    newQuestion()
    if (userAnswer[currentQuestion.id] === currentQuestion.correctAnswer) {
      setStreak(streak + 1)
    } else {
      setStreak(0)
    }
    setUserAnswer({})
  };

  useEffect(() => {
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
      <JSXButton text={"Submit"} onClick={handleSubmit} />
    </div>
  );
}
