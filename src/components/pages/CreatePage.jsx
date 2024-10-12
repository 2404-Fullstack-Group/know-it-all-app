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
        <Link className="create-generator-link" to="/create/quiz-generator">
          <JSXButton text={"Generate Quiz"} />
        </Link>
        <Link
          className="create-creator-link"
          to="/create/quiz-maker"
          onClick={setUpdateQuiz(null)}
        >
          <JSXButton text={"Create Quiz"} />
        </Link>
      </header>
    </>
  );
}
