import { useState, useEffect } from "react";
import { JSXInput, JSXSpan, JSXButton } from "../Elements";

// shuffle
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

export default function Quiz() {
  const testQuiz = {
    category: "Science",
    questions: [
      {
        category: "Science",
        id: "646339ce01d576cfac3aa3b5",
        correctAnswer: "Ritalin",
        incorrectAnswers: ["Amoxicillin", "Prozac", "Zoloft"],
        question:
          "Which of these medicines is often used to treat attention deficit hyperactivity disorder?",
        tags: ["pharmaceuticals", "drugs", "medicine", "psychology", "science"],
        type: "Multiple Choice",
        difficulty: "medium",
        regions: [],
        isNiche: false,
      },
      {
        category: "Science",
        id: "647f9def3a4302a719271683",
        correctAnswer: "Poland",
        incorrectAnswers: ["Italy", "Germany", "France"],
        question:
          "Nicolaus Copernicus, famous for his theory that the sun was at the center of the solar system, was born in which country in 1473?",
        tags: ["science", "astronomy", "people", "history"],
        type: "Multiple Choice",
        difficulty: "medium",
        regions: [],
        isNiche: false,
      },
      {
        category: "Science",
        id: "622a1c377cc59eab6f950585",
        correctAnswer:
          "The effects of atmospheric conditions on living organisms",
        incorrectAnswers: [
          "Unidentified flying objects",
          "Skin",
          "Male health and disease",
        ],
        question: "What is Biometeorology the study of?",
        tags: ["words", "science"],
        type: "Multiple Choice",
        difficulty: "hard",
        regions: [],
        isNiche: false,
      },
      {
        category: "Science",
        id: "622a1c3a7cc59eab6f9510e7",
        correctAnswer: "Elephants",
        incorrectAnswers: ["Bald Eagles", "Chimpanzees", "Earthworms"],
        question:
          "Which animal communicates in sound waves below the frequency that humans can hear?",
        tags: ["science", "animals", "sounds", "biology", "nature"],
        type: "Multiple Choice",
        difficulty: "medium",
        regions: [],
        isNiche: false,
      },
      {
        category: "Science",
        id: "62443749746187c5e7be9343",
        correctAnswer: "Chloroform",
        incorrectAnswers: ["Table Salt", "Saltpetre", "Heavy water"],
        question: "What is trichloromethane commonly known as?",
        tags: ["science"],
        type: "Multiple Choice",
        difficulty: "hard",
        regions: [],
        isNiche: false,
      },
    ],
  };
  // shuffle questions on component load
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  // store answers
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState(null);

  // store timer data
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    const shuffled = shuffleArray(testQuiz.questions);
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

  return (
    <div className="quiz">
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
          {results.map((result, index) => (
            <div key={index}>
              <p>
                <strong>Question:</strong> {result.question}
              </p>
              <p>
                <strong>Your Answer:</strong> {result.userAnswer}
              </p>
              <p>
                <strong>Correct Answer:</strong> {result.correctAnswer}
              </p>
              <p>{result.isCorrect ? "Correct!" : "Incorrect"}</p>
              <hr />
            </div>
          ))}
          <p>
            <strong>Time Taken:</strong> {getTimeTaken()}
          </p>
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
