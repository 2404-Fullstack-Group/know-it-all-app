import { useState, useEffect } from "react";
import { JSXSpan, JSXButton } from "../Elements";
import { getDifficulty } from "../../utilities/getDifficulty";
import Question from "./Question";

// shuffle
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

export default function Quiz({ quiz, onRegenerate }) {
  // set quiz-difficulty
  const [difficulty, setDifficulty] = useState(null);

  // shuffle questions on component load
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  // store answers
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState(null);

  // store timer data
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    const shuffled = shuffleArray(quiz.questions);
    setShuffledQuestions(shuffled);
    setStartTime(Date.now()); // start timer
    setUserAnswers({}); // Reset user answers
    setResults(null); // Reset results
  }, [quiz.questions]);

  // set difficulty AFTER questions are loaded
  useEffect(() => {
    if (shuffledQuestions.length > 0) {
      setDifficulty(getDifficulty(shuffledQuestions));
    }
  }, [shuffledQuestions]);

  // handle quiz-submission
  const handleSubmit = () => {
    const now = Date.now();
    setEndTime(now); // stop timer
    const quizResults = shuffledQuestions.map((question) => ({
      id: question.id,
      question: question.question,
      correctAnswer: question.correctAnswer,
      userAnswer: userAnswers[question.id] || "No answer",
      isCorrect: userAnswers[question.id] === question.correctAnswer,
    }));
    setResults(quizResults);
    window.scrollTo(0, 0);
  };

  // handle changes to answers
  const handleAnswerChange = (questionId, answer) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  // calculate timer and render result
  const getTimeTaken = () => {
    if (startTime && endTime && endTime >= startTime) {
      const timeDiff = endTime - startTime; // milliseconds
      const seconds = Math.floor((timeDiff / 1000) % 60);
      const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
      return `${minutes} minute(s) and ${seconds} second(s)`;
    }
    return "Invalid Time";
  };

  // calculate score and render result
  const getScore = () => {
    if (!results) return 0;
    const correctAnswers = results.filter((result) => result.isCorrect).length;
    const totalQuestions = results.length;
    return `${correctAnswers} / ${totalQuestions}`;
  };

  return (
    <div
      className={
        "quiz" +
        (quiz.category
          ? ` quiz-${quiz.category
              .toLowerCase()
              .replace(/&/g, "and")
              .replace(/\s+/g, "-")}`
          : "")
      }
    >
      <header className="quiz-header">
        <h2>
          <JSXSpan text={`${quiz.category} Quiz`} />
        </h2>
        <div>
          Difficulty:&nbsp;
          <strong>
            <JSXSpan text={difficulty} />
          </strong>
        </div>
      </header>
      {!results ? (
        <>
          {shuffledQuestions.map((question, index) => (
            <Question
              key={`${question.id}-${index}`}
              question={question}
              selectedAnswer={userAnswers[question.id]}
              onAnswerChange={handleAnswerChange}
            />
          ))}
          <JSXButton text="Submit" onClick={handleSubmit} />
        </>
      ) : (
        <div className="results">
          <div className="results-stats">
            <h3>Results</h3>
            <p>
              <strong>Score:</strong> {getScore()}
            </p>
            <p>
              <strong>Time Taken:</strong> {getTimeTaken()}
            </p>
          </div>
          {shuffledQuestions.map((question, index) => {
            const userAnswer = userAnswers[question.id];
            const isCorrect = userAnswer === question.correctAnswer;
            return (
              <Question
                key={`${question.id}-${index}`}
                question={question}
                selectedAnswer={userAnswer}
                onAnswerChange={() => {}} // No need to change answers after submission
                feedback={isCorrect ? "correct" : "incorrect"}
                showCorrect={true} // Always show the correct answer
                style={{
                  backgroundColor: isCorrect
                    ? "lightgreen"
                    : userAnswer
                    ? "lightcoral"
                    : "transparent",
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
