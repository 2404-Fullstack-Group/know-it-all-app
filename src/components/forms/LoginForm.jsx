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
  isNewAccount,
  setIsNewAccount,
  setIsLogin,
  setIsAdmin,
}) {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleOnClick = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${API_URL}/api/users/login`, {
      username: username,
      password: password,
    });
    setToken(response.data.token);
    setUserId(response.data.user[0].id);
    setIsAdmin(response.data.user[0].is_admin);
    if (response.data.token) {
      isModal ? setIsModal(false) : navigate("/browse");
    }
    setIsNewAccount(false);
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
      {isNewAccount ? null : (
        <JSXSpan
          text={
            <>
              Don't have an account?
              <Link onClick={() => setIsLogin(false)}>
                &nbsp;<span style={{ color: "lightblue" }}>Register Here.</span>
              </Link>
            </>
          }
        />
      )}
    </form>
  );
}
