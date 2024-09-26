// react imports
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// component imports
import { JSXSpan, JSXButton, JSXInput } from "../Elements.jsx";

export default function LoginForm({
  setToken,
  setUserId,
  isModal,
  setIsModal,
}) {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleOnClick = async (e) => {
    e.preventDefault();
    const response = await axios.post(`http://localhost:3000/api/users/login`, {
      username: username,
      password: password,
    });
    setToken(response.data.token);
    setUserId(response.data.user[0].id);
    console.log("MODAL MODAL MODAL", isModal);
    isModal ? null : navigate("/browse");
    setIsModal(false);
  };

  return (
    <form>
      <h2>
        <JSXSpan text="Sign Into Your Account" />
      </h2>
      <JSXInput
        type="text"
        name="username"
        placeholder="username"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <JSXInput
        type={isPasswordVisible ? "text" : "password"}
        name="password"
        placeholder="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <JSXButton text="Login" onClick={handleOnClick} />
      <JSXSpan
        text={
          <>
            Don't have an account? <Link to="/register">Register Here.</Link>
          </>
        }
      />
    </form>
  );
}
