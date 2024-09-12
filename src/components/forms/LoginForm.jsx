// react imports
import { Link } from "react-router-dom";

// component imports
import Button from "../elements/Button";
import Input from "../elements/Input";
import Label from "../elements/Label";
import Title from "../elements/Title";

export default function LoginForm() {
  return (
    <form className="login-form">
      <Title text="Login" />
      <Input type="text" name="username" placeholder="username" />
      <Input type="password" name="password" placeholder="password" />
      <Button text="login" />
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
