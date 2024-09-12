// react imports
import { useState } from "react";

// component imports
import Input from "../elements/Input";
import QuestionCreatorForm from "./QuestionCreatorForm";
import Button from "../elements/Button";
import GridTemplate from "../templates/GridTemplate";

export default function QuizCreatorForm() {
  const [questions, setQuestions] = useState(Array(5).fill(""));

  const addQuestion = (event) => {
    event.preventDefault();
    if (questions.length < 15) {
      setQuestions([...questions, ""]);
    }
  };

  return (
    <form>
      <h2>Quiz Creator</h2>
      <Input placeholder="quiz name" />
      <GridTemplate>
        {questions.map((_, index) => (
          <QuestionCreatorForm key={index} questionNum={index + 1} />
        ))}
        {questions.length === 15 ? null : (
          <Button type="button" text="+" onClick={addQuestion} />
        )}
      </GridTemplate>
      <Button text="submit quiz" call={true} />
    </form>
  );
}
