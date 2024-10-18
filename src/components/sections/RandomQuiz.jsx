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
  const [askedQuestions, setAskedQuestions] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  const newQuestion = async () => {
    let newQuestionData;
    let isDuplicate = true;

    while (isDuplicate) {
      const response = await axios.get(`${API_URL}/api/questions/random`, {
        params: {
          questionCount: 1,
          difficulty: difficulty,
        },
      });
      newQuestionData = response.data[0];
      isDuplicate = askedQuestions.includes(newQuestionData.id);
    }
    setAskedQuestions((prev) => [...prev, newQuestionData.id]);
    setCurrentQuestion(newQuestionData);
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
        setAskedQuestions([]);
        setShowCorrect(true);
        setTimeout(() => {
          newQuestion();
          setShowCorrect(false);
        }, 1200); // added delay if wrong answer to show correct answer before moving to the next question
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

  const boxShadowSize = Math.max(Math.pow(streak, 2), 2);
  let boxShadowColor;

  if (streak > 20) {
    const colors = [
      "rgba(130, 187, 196, 0.6)", // --color-general-knowledge
      "rgba(207, 147, 109, 0.6)", // --color-geography
      "rgba(200, 137, 152, 0.6)", // --color-society-and-culture
      "rgba(137, 128, 179, 0.6)", // --color-music
      "rgba(134, 172, 159, 0.6)", // --color-food-and-drink
      "rgba(212, 194, 118, 0.6)", // --color-sport-and-leisure
      "rgba(193, 113, 133, 0.6)", // --color-film-and-tv
      "rgba(168, 187, 132, 0.6)", // --color-science
      "rgba(176, 161, 200, 0.6)", // --color-arts-and-literature
      "rgba(229, 168, 97, 0.6)", // --color-history
    ];
    const index = (streak - 20) % colors.length;
    boxShadowColor = colors[index];
  } else {
    boxShadowColor =
      streak === 0
        ? "rgba(154, 233, 154, 0)"
        : `rgba(154, 233, 154, ${Math.min(0.6, streak / 10)})`;
  }

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
