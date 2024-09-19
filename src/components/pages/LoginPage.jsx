// component imports
import { AuthForm } from "../templates/FormTemplates";
import LoginForm from "../forms/LoginForm";

export default function LoginPage({ setToken }) {
  return <AuthForm form={<LoginForm setToken={setToken} />} />;
}
