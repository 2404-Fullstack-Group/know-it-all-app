import { useState, useEffect } from "react";
import { JSXInput, JSXSpan, JSXButton } from "../Elements";

// shuffle
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

export default function Quiz({ quiz }) {
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
  }, []);

  // handle quiz-submission
  const handleSubmit = () => {
    setEndTime(Date.now()); // stop timer
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
    if (startTime && endTime) {
      const timeDiff = endTime - startTime; // milliseconds
      const seconds = Math.floor((timeDiff / 1000) % 60);
      const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
      return `${minutes} minute(s) and ${seconds} second(s)`;
    }
    return null;
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
      <h2>
        <JSXSpan text={`${quiz.category} Quiz`} />
      </h2>
      {shuffledQuestions.map((question) => (
        <Question
          key={question.id}
          question={question}
          selectedAnswer={userAnswers[question.id]}
          onAnswerChange={handleAnswerChange}
        />
      ))}
      <JSXButton text="Submit" onClick={handleSubmit} />
      {results && (
        <div className="results">
          <h2>Results</h2>
          <p>
            <strong>Score:</strong> {getScore()}
          </p>
          <p>
            <strong>Time Taken:</strong> {getTimeTaken()}
          </p>
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

function Question({ question, selectedAnswer, onAnswerChange }) {
  // shuffle answers (initial render only)
  const [shuffledAnswers] = useState(() =>
    shuffleArray([question.correctAnswer, ...question.incorrectAnswers])
  );

  return (
    <div className="question-card">
      <JSXSpan text={question.question} />
      {shuffledAnswers.map((answer, index) => (
        <label key={index}>
          <JSXInput
            type="radio"
            name={`question-${question.id}`}
            value={answer}
            checked={selectedAnswer === answer}
            onChange={() => onAnswerChange(question.id, answer)} // updates userAnswers when an answer is selected
          />
          {answer}
        </label>
      ))}
    </div>
  );
}
