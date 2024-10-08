import { useState, useEffect } from "react";
import { JSXInput, JSXSpan, JSXButton } from "../Elements";
import { getDifficulty } from "../../utilities/getDifficulty";
import Question from "./Question";

// shuffle
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

export default function Quiz({ quiz }) {
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
  }, [quiz.questions]);

  // set difficulty AFTER questions are loaded
  useEffect(() => {
    if (shuffledQuestions.length > 0) {
      setDifficulty(getDifficulty(shuffledQuestions));
    }
  }, [shuffledQuestions]);

  useEffect(() => {
    console.log(results);
  }, [results]);

  // handle quiz-submission
  const handleSubmit = () => {
    const now = Date.now();
    setEndTime(now); // stop timer
    const quizResults = shuffledQuestions.map((question) => ({
      question: question.question,
      correctAnswer: question.correctAnswer,
      userAnswer: userAnswers[question.id] || "No answer",
      isCorrect: userAnswers[question.id] === question.correctAnswer,
    }));
    setResults(quizResults);
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
    <div className="quiz">
      <header>
        <h2>
          <JSXSpan text={`${quiz.category} Quiz`} />
        </h2>
        <div>
          <strong>Difficulty:</strong>&nbsp;
          <JSXSpan text={difficulty} />
        </div>
      </header>
      {!results ? (
        <>
          {shuffledQuestions.map((question) => (
            <Question
              key={question.id}
              question={question}
              selectedAnswer={userAnswers[question.id]}
              onAnswerChange={handleAnswerChange}
            />
          ))}
          <hr />
          <JSXButton text="Submit" onClick={handleSubmit} />
        </>
      ) : null}
      {results && (
        <div className="results">
          <h3>Results</h3>
          <p>
            <strong>Score:</strong> {getScore()}
          </p>
          <p>
            <strong>Time Taken:</strong> {getTimeTaken()}
          </p>
          <hr />
          {results.map((result, index) => (
            <div
              key={index}
              className={`quiz-result-${
                result.isCorrect ? "correct" : "incorrect"
              }`}
            >
              <p>
                <strong>Question:</strong> {result.question}
              </p>
              <p>
                <strong>Your Answer:</strong> {result.userAnswer}
              </p>
              <p>
                <strong>Correct Answer:</strong> {result.correctAnswer}
              </p>
              <p className="result">
                {result.isCorrect ? "Correct!" : "Incorrect"}
              </p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

