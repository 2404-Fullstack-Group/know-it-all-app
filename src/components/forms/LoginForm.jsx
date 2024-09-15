// react imports
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// component imports
import { JSXSpan, JSXButton, JSXInput } from "../Elements.jsx";

export default function LoginForm({ setToken }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleOnClick = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:3000/api/users/login", {
      username: "Admin",
      password: "password",
    });
    console.log(response.data);
    setToken(response.data.token);
  };

  return (
    <form>
      <h2>
        <JSXSpan text="Sign Into Your Account" />
      </h2>
      <JSXInput type="text" placeholder="username" />
      <JSXInput
        type={isPasswordVisible ? "text" : "password"}
        placeholder="password"
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
