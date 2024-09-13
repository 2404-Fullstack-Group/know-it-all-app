import { useState } from "react";
import Input from "../elements/Input";
import QuestionCreatorForm from "./QuestionCreatorForm";
import Button from "../elements/Button";
import Title from "../elements/Title";

export default function QuizCreatorForm() {
  const [quizData, setQuizData] = useState({
    name: "",
    category: "",
    questions: Array(5).fill({
      category: "",
      question: "",
      correctAnswer: "",
      incorrectAnswers: Array(3).fill(""),
      tags: Array(3).fill(""),
    }),
  });

  const handleQuizDataChange = (field, value) => {
    setQuizData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [field]: value,
    };
    setQuizData((prevData) => ({
      ...prevData,
      questions: updatedQuestions,
    }));
  };

  const addQuestion = (event) => {
    event.preventDefault();
    if (quizData.questions.length < 15) {
      setQuizData((prevData) => ({
        ...prevData,
        questions: [
          ...prevData.questions,
          {
            category: "",
            question: "",
            correctAnswer: "",
            incorrectAnswers: Array(3).fill(""),
            tags: Array(3).fill(""),
          },
        ],
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(quizData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Title text="Create Your Quiz!" />
      <div className="form-header">
        <Input
          placeholder="Enter Quiz Name"
          onChange={(e) => handleQuizDataChange("name", e.target.value)}
        />
        <select
          id="category"
          name="category"
          defaultValue={"Select Category"}
          onChange={(e) => handleQuizDataChange("category", e.target.value)}
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
      </div>
      <div className="form-body">
        {quizData.questions.map((_, index) => (
          <QuestionCreatorForm
            key={index}
            questionNum={index + 1}
            questionData={quizData.questions[index]}
            handleQuestionChange={(field, value) =>
              handleQuestionChange(index, field, value)
            }
          />
        ))}
        {quizData.questions.length === 15 ? null : (
          <Button type="button" text="Add Question" onClick={addQuestion} />
        )}
      </div>
      <Button type="submit" text="Submit Quiz" />
    </form>
  );
}
