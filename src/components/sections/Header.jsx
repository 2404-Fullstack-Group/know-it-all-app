import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import browseIcon from "../../../public/search-icon.svg";
import formIcon from "../../../public/form-icon.svg";
import profileIcon from "../../../public/profile-icon.svg";
import logoutIcon from "../../../public/logout-icon.svg";
import loginIcon from "../../../public/login-icon.svg";

// component imports
import { JSXSpan, JSXButton, NavLink } from "../Elements.jsx";

export default function Header({
  token,
  setToken,
  userId,
  setUserId,
  isHeader,
}) {
  const location = useLocation();
  const handleClick = () => {
    setToken(null);
    setUserId(null);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelection = () => {
    setIsDropdownOpen(false);
  };

  return (
    <>
      {location.pathname !== "/" || !isHeader ? (
        <header className="site-header">
          {isHeader ? (
            <Link to="/">
              <h1 className="site-title">
                <JSXSpan text="Know It All" />
              </h1>
            </Link>
          ) : null}
          <nav
            className={
              location.pathname !== "/" ? "nav-monitor" : "nav-home-monitor"
            }
          >
            <Link to="/browse">
              <NavLink text="Browse" icon={browseIcon} />
            </Link>
            <Link to="/create">
              <NavLink text="Create" icon={formIcon} />
            </Link>
            {token ? (
              <Link to={`/profile/${userId}`}>
                <NavLink text="Profile" icon={profileIcon} />
              </Link>
            ) : null}
            {token ? (
              <Link to="/">
                <NavLink
                  text="Logout"
                  icon={logoutIcon}
                  onClick={handleClick}
                />
              </Link>
            ) : (
              <Link to="/registration">
                <NavLink text="Login" icon={loginIcon} />
              </Link>
            )}
          </nav>
          {location.pathname !== "/" ? (
            <nav className="nav-mobile">
              <div className="dropdown">
                <span className="dropdown-text" onClick={handleDropdownToggle}>
                  Menu
                </span>
                {isDropdownOpen && (
                  <div className="dropdown-content">
                    <Link to="/browse" onClick={handleSelection}>
                      <JSXButton text="Browse" />
                    </Link>
                    <Link to="/create" onClick={handleSelection}>
                      <JSXButton text="Create" />
                    </Link>
                    {token ? (
                      <Link to={`/profile/${userId}`} onClick={handleSelection}>
                        <JSXButton text="Profile" />
                      </Link>
                    ) : null}
                    {token ? (
                      <Link
                        to="/"
                        onClick={() => {
                          handleSelection();
                          handleClick();
                        }}
                      >
                        <JSXButton text="Logout" />
                      </Link>
                    ) : (
                      <Link to="/registration" onClick={handleSelection}>
                        <JSXButton text="Login" />
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </nav>
          ) : null}
        </header>
      ) : null}
    </>
  );
}
