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
          <JSXSpan
            className="question-card-question"
            text={question.question}
          />
          {shuffledAnswers.map((answer) => (
            <label key={answer} className="custom-box-container">
              <JSXInput
                key={answer}
                className={"question-card-answers"}
                type="radio"
                name={`question-${question.id}`}
                value={answer}
                checked={selectedAnswer === answer}
                onChange={() => onAnswerChange(question.id, answer)} // updates userAnswers when an answer is selected
              />
              <span className="custom-box">{answer}</span>
            </label>
          ))}
        </div>
      ) : (
        "Loading Question..."
      )}
    </>
  );
}
