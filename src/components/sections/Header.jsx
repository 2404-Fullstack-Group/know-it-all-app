// react imports
import { Link } from "react-router-dom";

// component imports
import { JSXSpan, JSXButton } from "../Elements.jsx";

export default function Header({ token, setToken, userId, setUserId }) {
  const handleClick = () => {
    setToken(null);
    setUserId(null);
  };
  return (
    <header className="site-header">
      <Link to="/">
        <h1>
          <JSXSpan text="Know It All" />
        </h1>
      </Link>
      <nav>
        <Link to="/browse">
          <JSXButton text="Browse" />
        </Link>
        <Link to="/quizzes">
          <JSXButton text="Play" />
        </Link>
        <Link to="/create-quiz">
          <JSXButton text="Create" />
        </Link>
        {token ? (
          <Link to={`/profile/${userId}`}>
            <JSXButton text="Profile" />
          </Link>
        ) : null}
        {token ? (
          <Link to="/">
            <JSXButton text="Logout" onClick={handleClick} />
          </Link>
        ) : (
          <Link to="/login">
            <JSXButton text="Login" />
          </Link>
        )}
      </nav>
    </header>
  );
}
