// react imports
import { Link } from "react-router-dom";

// component imports
import Button from "../elements/Button";
import MenuItem from "../elements/MenuItem";

// asset imports
import homeIcon from "../../assets/home-icon.svg";
import profileIcon from "../../assets/profile-icon.svg";
import loginIcon from "../../assets/login-icon.svg";
import searchIcon from "../../assets/search-icon.svg";
import formIcon from "../../assets/form-icon.svg";

export default function NavBar() {
  return (
    <div className="nav-bar">
      <Link to="/">
        <h1>💡 Know It All</h1>
      </Link>
      <nav>
        <Link to="/">
          <MenuItem icon={homeIcon} text="Home" />
        </Link>
        <Link to="/browse">
          <MenuItem icon={searchIcon} text="Browse" />
        </Link>
        <Link to="/quiz-creator">
          <MenuItem icon={formIcon} text="Create" />
        </Link>
        <Link to="/login">
          <MenuItem icon={loginIcon} text="Sign In" />
        </Link>
        <Link to="/account">
          <MenuItem icon={profileIcon} text="Profile" />
        </Link>
      </nav>
    </div>
  );
}
