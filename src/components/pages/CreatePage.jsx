import { Link } from "react-router-dom";
import { JSXButton } from "../Elements";

export default function CreatePage() {
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
