// react imports
import { Link } from "react-router-dom";
import { useEffect } from "react";

// component imports
import { JSXButton } from "../Elements";

export default function CreatePage({ setUpdateQuiz }) {
  useEffect(() => {
    setUpdateQuiz(null);
  });
  return (
    <>
      <header>
        <Link to="/create/quiz-generator">
          <JSXButton text={"Generate Quiz"} />
        </Link>
        <Link to="/create/quiz-maker">
          <JSXButton text={"Create Quiz"} />
        </Link>
      </header>
    </>
  );
}
