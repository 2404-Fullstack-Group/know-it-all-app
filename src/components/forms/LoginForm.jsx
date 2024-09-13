// react imports
import { Link } from "react-router-dom";
import axios from "axios"


// component imports
import Button from "../elements/Button";
import Input from "../elements/Input";
import Label from "../elements/Label";
import Title from "../elements/Title";

export default function LoginForm({ setToken }) {

  const handleOnClick = async (e) => {
    e.preventDefault()
    const response = await axios.post("http://localhost:3000/api/users/login", {
      username: "Admin",
      password: "password"
    })
    console.log(response.data)
    setToken(response.data.token)
  }

  return (
    <form className="login-form">
      <Title text="Login" />
      <Input type="text" name="username" placeholder="username" />
      <Input type="password" name="password" placeholder="password" />
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
