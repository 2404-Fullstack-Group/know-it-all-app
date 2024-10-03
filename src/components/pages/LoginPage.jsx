// component imports
import { AuthForm } from "../templates/FormTemplates";
import LoginForm from "../forms/LoginForm";

export default function LoginPage({ setToken, setUserId }) {
  return (
    <AuthForm
      form={
        <LoginForm
          setToken={setToken}
          setUserId={setUserId}
        />
      }
    />
  );
}
