import { useEffect, useState } from "react";
import { JSXSpan } from "../Elements";
import Question from "./Question";
import axios from "axios";

export default function RandomQuiz() {
  const [userAnswer, setUserAnswer] = useState({});
  const [streak, setStreak] = useState(0);
  const [difficulty, setDifficulty] = useState("easy");
  const [showCorrect, setShowCorrect] = useState(false);
  const [feedback, setFeedback] = useState(null); // tracks 'correct' or 'incorrect' feedback
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
    setFeedback(null); // resets feedback for the new question
  };

  const handleAnswerChange = (questionId, answer) => {
    setUserAnswer({ [questionId]: answer });

    const isCorrect = answer === currentQuestion.correctAnswer;
    setFeedback(isCorrect ? "correct" : "incorrect");

    setTimeout(() => {
      if (isCorrect) {
        setStreak(streak + 1);
        newQuestion();
      } else {
        setStreak(0);
        setShowCorrect(true);
        setTimeout(() => {
          newQuestion();
          setShowCorrect(false);
        }, 1000); // added delay if wrong answer to show correct answer before moving to the next question
      }
      setUserAnswer({});
    }, 300); // here lies the delay before moving to the next question
  };

  const updateDifficulty = () => {
    if (streak < 5) {
      setDifficulty("easy");
    } else if (streak <= 15) {
      setDifficulty("medium");
    } else {
      setDifficulty("hard");
    }
  };

  useEffect(() => {
    updateDifficulty();
    newQuestion();
  }, []);

  const boxShadowSize = Math.min(Math.max(streak * 2, 2), 50); // Subtle increase starting from streak 1
  const greenIntensity = Math.min(streak * 7, 255); // Increased multiplier for more gradual intensity
  const boxShadowColor = `rgba(0, ${greenIntensity}, 0, 0.6)`;

  return (
    <div className="random-quiz">
      <div className="random-header">
        <h3>Test Your Knowledge | Build Your Streak</h3>
        <p>
          <i>How Far Can You Go?</i>
        </p>
      </div>
      <div
        className="random-question-wrapper"
        style={{
          boxShadow: `0 0 ${boxShadowSize}px ${
            boxShadowSize / 2
          }px ${boxShadowColor}`,
          transition: "box-shadow 0.3s ease",
        }}
      >
        <Question
          question={currentQuestion}
          selectedAnswer={userAnswer[currentQuestion.id]}
          onAnswerChange={handleAnswerChange}
          feedback={feedback} // feedback to handle answer highlighting
          showCorrect={showCorrect} // show the correct answer if user is wrong
        />
      </div>
      <JSXSpan className="random-streak" text={`Streak: ${streak}`} />
    </div>
  );
}
