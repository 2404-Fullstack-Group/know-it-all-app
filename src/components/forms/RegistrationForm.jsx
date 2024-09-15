// react imports
import { useState } from "react";
import { Link } from "react-router-dom";

// component imports
import { JSXSpan, JSXButton, JSXInput } from "../Elements.jsx";

export default function RegistrationForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <form>
      <h2>
        <JSXSpan text="Create An Account" />
      </h2>
      <JSXInput type="text" placeholder="first name" />
      <JSXInput type="text" placeholder="last name" />
      <JSXInput type="text" placeholder="username" />
      <JSXInput type="email" placeholder="email" />
      <JSXInput type="password" placeholder="password" />
      <JSXInput
        type={isPasswordVisible ? "text" : "password"}
        placeholder="confirm password"
      />
      <JSXButton text="Create Account" />
      <JSXSpan
        text={
          <>
            Already have an account? <Link to="/login">Login Here.</Link>
          </>
        }
      />
    </form>
  );
}
