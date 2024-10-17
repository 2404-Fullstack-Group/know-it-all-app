// react imports
import { Link } from "react-router-dom";
import { useEffect } from "react";

// component imports
import { JSXSpan } from "../Elements";

export default function CreatePage({ setUpdateQuiz }) {
  useEffect(() => {
    setUpdateQuiz(null);
  });
  return (
    <>
      <div className="create-page-intro">
        <h2>Unleash Your Trivia Creativity!</h2>
      </div>
      <div className="create-page">
        <div className="create-page-generator">
          <div>
            <h3>Ready to test your wits?</h3>
          </div>
          <Link className="create-generator-link" to="/create/quiz-generator">
            <img src="../src/assets/quiz-generator-icon.svg" />

            <JSXSpan text={"Generate Quiz"} />
          </Link>
          <p>Whip up quizzes using our question pool.</p>
        </div>
        <div className="create-page-maker">
          <div>
            <h3>Feeling creative?</h3>
          </div>
          <Link
            className="create-creator-link"
            to="/create/quiz-maker"
            onClick={setUpdateQuiz(null)}
          >
            <img src="../src/assets/quiz-creator-icon.svg" />
            <JSXSpan text={"Create Quiz"} />
          </Link>
          <p>Craft your own questions and prove you know your stuff.</p>
        </div>
      </div>
    </>
  );
}
