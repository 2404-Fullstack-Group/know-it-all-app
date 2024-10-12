// react imports
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// component imports
import { JSXSpan, JSXButton, JSXInput, ErrorMessage } from "../Elements.jsx";

export default function RegistrationForm({ setIsLogin, setIsNewAccount }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [unavailableUsername, setUnavailableUsername] = useState(false);
  const [unavailableEmail, setUnavailableEmail] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [errorMessage, setErrorMessage] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  const handleUsernameChange = (value) => {
    setUserData((prevState) => ({
      ...prevState,
      username: value,
    }));
  };

  const handleFirstNameChange = (value) => {
    setUserData((prevState) => ({
      ...prevState,
      first_name: value,
    }));
  };

  const handleLastNameChange = (value) => {
    setUserData((prevState) => ({
      ...prevState,
      last_name: value,
    }));
  };

  const handleEmailChange = (value) => {
    setUserData((prevState) => ({
      ...prevState,
      email: value,
    }));
  };

  const handlePasswordChange = (value) => {
    setUserData((prevState) => ({
      ...prevState,
      password: value,
    }));
  };

  const handleConfirmPasswordChange = (value) => {
    setUserData((prevState) => ({
      ...prevState,
      confirm_password: value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (userData.password != userData.confirm_password) {
      setErrorMessage(true);
    } else {
      try {
        await axios.post(`${API_URL}/api/users`, {
          username: userData.username,
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email,
          password: userData.password,
        });
        setIsNewAccount(true);
        setIsLogin(true);
      } catch (error) {
        const errorMessage = error.response.data;

        if (errorMessage.match("Username Unavailable")) {
          setUnavailableUsername(true);
        } else {
          setUnavailableUsername(false);
        }
        if (errorMessage.match("Email Unavailable")) {
          setUnavailableEmail(true);
        } else {
          setUnavailableEmail(false);
        }
        if (errorMessage.match("Username and Email are Unavailable")) {
          setUnavailableUsername(true);
          setUnavailableEmail(true);
        }
      }
    }
  };

  return (
    <form>
      <h2>
        <JSXSpan text="Create An Account" />
      </h2>
      {unavailableUsername ? (
        <ErrorMessage text={"Username Unavailable"} />
      ) : null}
      <JSXInput
        type="text"
        placeholder="username"
        onChange={(e) => handleUsernameChange(e.target.value)}
      />
      <JSXInput
        type="text"
        placeholder="first name"
        onChange={(e) => handleFirstNameChange(e.target.value)}
      />
      <JSXInput
        type="text"
        placeholder="last name"
        onChange={(e) => handleLastNameChange(e.target.value)}
      />
      {unavailableEmail ? <ErrorMessage text={"Email Unavailable"} /> : null}
      <JSXInput
        type="email"
        placeholder="email"
        onChange={(e) => handleEmailChange(e.target.value)}
      />
      {errorMessage ? <ErrorMessage text={"Password does not match"} /> : null}
      <JSXInput
        type="password"
        placeholder="password"
        onChange={(e) => handlePasswordChange(e.target.value)}
      />
      <JSXInput
        type={isPasswordVisible ? "text" : "password"}
        placeholder="confirm password"
        onChange={(e) => handleConfirmPasswordChange(e.target.value)}
      />
      <JSXButton text="Create Account" onClick={(e) => handleClick(e)} />
      <JSXSpan
        text={
          <>
            Already have an account?{" "}
            <Link onClick={() => setIsLogin(true)}>Login Here.</Link>
          </>
        }
      />
    </form>
  );
}
