// react imports
import { Link } from "react-router-dom";

// component imports
import Button from "../elements/Button";
import Input from "../elements/Input";
import Label from "../elements/Label";
import Title from "../elements/Title";

export default function RegistrationForm() {
  return (
    <form className="registration-form">
      <Title text="Register" />
      <Input type="text" name="firstName" placeholder="first name" />
      <Input type="text" name="lastName" placeholder="last name" />
      <Input type="email" name="email" placeholder="email" />
      <Input type="text" name="username" placeholder="username" />
      <Input type="password" name="password" placeholder="password" />
      <Button text="create account" />
      <Label
        text={
          <>
            Already have an account? <Link to="/login">Login here.</Link>
          </>
        }
      />
    </form>
  );
}
