import { useState } from "react";
import { JSXButton, JSXInput, ErrorMessage } from "../Elements";
import axios from "axios";

export default function ConfirmPasswordForm({
  setIsPassword,
  setIsModal,
  setUserData,
  userData,
  token,
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/api/users/login`,
        {
          username: userData.username,
          password: userData.password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setIsPassword(false);
        setIsModal(true);
      }
    } catch (error) {
      setErrorMessage(true)
    }

  };

  const handlePasswordChange = (value) => {
    setUserData((prevState) => ({
      ...prevState,
      password: value,
    }));
  };

  return (
    <form>
      {errorMessage ? <ErrorMessage text="Incorrect Password" /> : null}
      <JSXInput
        type={isPasswordVisible ? "text" : "password"}
        name="password"
        placeholder="Confirm Password"
        onChange={(e) => {
          handlePasswordChange(e.target.value);
        }}
      />
      <JSXButton text={"Confirm Password"} onClick={handleClick} />
    </form>
  );
}
