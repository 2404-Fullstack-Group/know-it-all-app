const testQuiz = {
  category: "Science",
  questions: [
    {
      category: "Science",
      id: "646339ce01d576fdasfdascfac3aa3b5",
      correctAnswer: "Ritalin",
      incorrectAnswers: ["Amoxicillin", "Prozac", "Zoloft"],
      question:
        "Which of these medicines is often used to treat attention deficit hyperactivity disorder?",
      tags: ["pharmaceuticals", "drugs", "medicine", "psychology", "science"],
      type: "Multiple Choice",
      difficulty: "medium",
      regions: [],
    },
    {
      category: "Science",
      id: "646339ce01dfadsfads576cfac3aa3b5",
      correctAnswer: "Ritalin",
      incorrectAnswers: ["Amoxicillin", "Prozac", "Zoloft"],
      question:
        "Which of these medicines is often used to treat attention deficit hyperactivity disorder?",
      tags: ["pharmaceuticals", "drugs", "medicine", "psychology", "science"],
      type: "Multiple Choice",
      difficulty: "medium",
      regions: [],
    },
    {
      category: "Science",
      id: "646339ce01d5adsfads76cfac3aa3b5",
      correctAnswer: "Ritalin",
      incorrectAnswers: ["Amoxicillin", "Prozac", "Zoloft"],
      question:
        "Which of these medicines is often used to treat attention deficit hyperactivity disorder?",
      tags: ["pharmaceuticals", "drugs", "medicine", "psychology", "science"],
      type: "Multiple Choice",
      difficulty: "medium",
      regions: [],
    },
    {
      category: "Science",
      id: "646339ce01dvxdfvcx576cfac3aa3b5",
      correctAnswer: "Ritalin",
      incorrectAnswers: ["Amoxicillin", "Prozac", "Zoloft"],
      question:
        "Which of these medicines is often used to treat attention deficit hyperactivity disorder?",
      tags: ["pharmaceuticals", "drugs", "medicine", "psychology", "science"],
      type: "Multiple Choice",
      difficulty: "medium",
      regions: [],
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
    },
  ],
};

// react imports
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

// component imports
import Quiz from "../sections/Quiz";

export default function QuizPage() {
  const { quiz_id } = useParams();
  const [quiz, setQuiz] = useState({
    quiz_id: "",
    questions: Array(1).fill({
      category: "",
      difficulty: "",
      question: "",
      correctAnswer: "",
      incorrectAnswers: Array(3).fill(""),
      tags: Array(3).fill(""),
      type: "Multiple Choice",
    }),
  });

  const loadQuiz = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/quizzes/${quiz_id}`
      );
      setQuiz(response.data);
    } catch (error) {
      console.error("Error loading quiz:", error);
    }
  };

  useEffect(() => {
    loadQuiz();
  }, [quiz_id]);

  return <div>{quiz ? <Quiz quiz={quiz} /> : <p>Loading quiz...</p>}</div>;
}
