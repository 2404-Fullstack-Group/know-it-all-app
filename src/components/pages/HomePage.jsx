// react imports
import { Link } from "react-router-dom";
import { JSXSpan } from "../Elements";
import { useEffect } from "react";

// component imports
import Header from "../sections/Header";
import RandomQuiz from "../sections/RandomQuiz";

export default function HomePage({
  token,
  setToken,
  userId,
  setUserId,
  setUpdateQuiz,
}) {
  useEffect(() => {
    setUpdateQuiz(null);
  });
  return (
    <div className="home-page">
      <Link to="/">
        <h1 className="site-title home-title">
          <JSXSpan text="Know It All" />
        </h1>
      </Link>
      <div className="welcome-message">
        <h2>Welcome!</h2>
        <p>
          Dive into trivia, challenge your friends, and uncover weird facts
          along the way.
        </p>
        <p>
          Think you know it all? <strong>Prove it.</strong>
        </p>
      </div>
      <Header
        token={token}
        setToken={setToken}
        setUserId={setUserId}
        userId={userId}
        isHeader={false}
      />

      <RandomQuiz />
    </div>
  );
}
