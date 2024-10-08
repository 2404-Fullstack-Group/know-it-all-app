import { JSXInput, JSXSpan } from "../Elements";
import { useEffect, useState } from "react";

// shuffle
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

export default function Question({ question, selectedAnswer, onAnswerChange }) {
  // shuffle answers (initial render only)
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  useEffect(() => {
    setShuffledAnswers(
      shuffleArray([question.correctAnswer, ...question.incorrectAnswers])
    );
  }, [question.correctAnswer]);
  return (
    <>
      {question.correctAnswer ? (
        <div className="question-card">
          <JSXSpan text={question.question} />
          {shuffledAnswers.map((answer, index) => (
            <label key={index}>
              <JSXInput
                key={index}
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
      ) : (
        "Loading Question..."
      )}
    </>
  );
}
