// react imports
import { Link } from "react-router-dom";

// component imports
import Button from "../elements/Button";

export default function NavBar() {
  return (
    <div className="nav-bar">
      <Link to="/">
        <h1>💡 Know It All</h1>
      </Link>
      <nav>
        <Link to="/">
          <Button text="Home" />
        </Link>
        <Link to="/quiz-creator">
          <Button text="Create Quiz" />
        </Link>
        <Link to="/login">
          <Button text="Login" />
        </Link>
        <Link to="/register">
          <Button text="Create Account" />
        </Link>
        <Link to="/account">
          <Button text="Account" />
        </Link>
      </nav>
    </div>
  );
}
