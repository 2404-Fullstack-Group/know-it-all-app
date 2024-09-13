// component imports
import LoginForm from "../forms/LoginForm";
import AuthTemplate from "../templates/AuthTemplate";

export default function LoginPage( { setToken }) {
  return (
    <>
      <AuthTemplate form={<LoginForm setToken={setToken}/>} />
    </>
  );
}
