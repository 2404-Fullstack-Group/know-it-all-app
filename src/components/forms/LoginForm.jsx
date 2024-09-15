// react imports
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"


// component imports
import Button from "../elements/Button";
import Input from "../elements/Input";
import Label from "../elements/Label";
import Title from "../elements/Title";
import { useState } from "react";

export default function LoginForm({ setToken }) {
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const navigate = useNavigate()

  const handleOnClick = async (e) => {
    e.preventDefault()
    const response = await axios.post("http://localhost:3000/api/users/login", {
      username: username,
      password: password
    })
    setToken(response.data.token)
    navigate("/")
  }

  return (
    <form className="login-form">
      <Title text="Login" />
      <Input type="text" name="username" placeholder="username" onChange={(e) => {setUsername(e.target.value)}} />
      <Input type="password" name="password" placeholder="password" onChange={(e) => {setPassword(e.target.value)}} />
      <Button text="login" onClick={handleOnClick}/>
      <Label
        text={
          <>
            Don't have an account? <Link to="/register">Register Here.</Link>
          </>
        }
      />
    </form>
  );
}
