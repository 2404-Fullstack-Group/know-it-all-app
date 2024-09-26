import { useState } from "react";
import { JSXButton, JSXInput } from "../Elements";
import axios from "axios";

export default function ConfirmPasswordForm({
  setIsPassword,
  setIsModal,
  setUserData,
  userData,
  token
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(userData.username)
    console.log(userData.password)
    console.log(token)
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
    console.log(response)
    if (response.status === 200) {
      setIsPassword(false);
      setIsModal(true);
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
