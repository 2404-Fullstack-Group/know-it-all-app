// react imports
import { useState } from "react";

// component imports
import { ArticleForm } from "../templates/FormTemplates.jsx";
import { JSXSpan, JSXButton } from "../Elements.jsx";
import QuestionForm from "./QuestionForm.jsx";

export default function QuizForm() {
  const [quizData, setQuizData] = useState({
    category: "",
    questions: Array(5).fill({
      category: "",
      difficulty: "",
      question: "",
      correctAnswer: "",
      incorrectAnswers: Array(3).fill(""),
      tags: Array(3).fill(""),
    }),
  });

  const addQuestion = (event) => {
    event.preventDefault();
    if (quizData.questions.length < 15) {
      setQuizData((prevData) => ({
        ...prevData,
        questions: [
          ...prevData.questions,
          {
            category: prevData.category,
            difficulty: "",
            question: "",
            correctAnswer: "",
            incorrectAnswers: Array(3).fill(""),
            tags: Array(3).fill(""),
          },
        ],
      }));
    }
  };

  const handleCategoryChange = (value) => {
    setQuizData((prevData) => ({
      ...prevData,
      category: value,
      questions: prevData.questions.map((question) => ({
        ...question,
        category: value,
      })),
    }));
  };

  const handleQuestionChange = (index, field, value) => {
    setQuizData((prevData) => {
      const updatedQuestions = [...quizData.questions];
      updatedQuestions[index] = {
        ...updatedQuestions[index],
        [field]: value,
      };
      return {
        ...prevData,
        questions: updatedQuestions,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(quizData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <header>
        <h2>
          <JSXSpan text="Create Your Own Quiz" />
        </h2>
        <select
          id="category"
          name="category"
          defaultValue={"Select Category"}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option disabled>Select Category</option>
          <option value="General Knowledge">General Knowledge</option>
          <option value="Geography">Geography</option>
          <option value="Society & Culture">Society & Culture</option>
          <option value="Music">Music</option>
          <option value="Food & Drink">Food & Drink</option>
          <option value="Sport & Leisure">Sport & Leisure</option>
          <option value="Film & TV">Film & TV</option>
          <option value="Science">Science</option>
          <option value="Arts & Literature">Arts & Literature</option>
          <option value="History">History</option>
        </select>
      </header>
      {quizData.questions.map((_, index) => (
        <ArticleForm
          key={index}
          form={
            <QuestionForm
              key={index}
              questionNum={index + 1}
              questionData={quizData.questions[index]}
              handleQuestionChange={handleQuestionChange}
            />
          }
        />
      ))}
      {quizData.questions.length < 15 ? (
        <JSXButton
          text={`Add Question (${quizData.questions.length}/15)`}
          onClick={addQuestion}
        />
      ) : null}
      <JSXButton text="Submit Quiz" />
    </form>
  );
}
