// react imports
import { Link } from "react-router-dom";

// component imports
import { JSXSpan, JSXButton } from "../Elements.jsx";

export default function Header() {
  return (
    <header className="site-header">
      <Link to="/">
        <h1>
          <JSXSpan text="Know It All" />
        </h1>
      </Link>
      <nav>
        <Link to="/">
          <JSXButton text="Browse" />
        </Link>
        <Link to="/quizzes">
          <JSXButton text="Play" />
        </Link>
        <Link to="/create-quiz">
          <JSXButton text="Create" />
        </Link>
        <Link to="/profile">
          <JSXButton text="Profile" />
        </Link>
        <Link to="/login">
          <JSXButton text="Login" />
        </Link>
      </nav>
    </header>
  );
}
