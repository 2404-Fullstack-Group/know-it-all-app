// react imports
import { Link, useLocation } from "react-router-dom";

// component imports
import { JSXSpan, JSXButton } from "../Elements.jsx";

export default function Header({
  token,
  setToken,
  userId,
  setUserId,
  isHeader,
}) {
  const location = useLocation()
  console.log((location.pathname !== "/" || isHeader))
  return (
    <>
      {(location.pathname !== "/" || !isHeader) ? 
      <header className="site-header">
        {isHeader ? (
          <Link to="/">
            <h1>
              <JSXSpan text="Know It All" />
            </h1>
          </Link>
        ) : null}
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
      </header> : null
      }
    </>
  );
}
