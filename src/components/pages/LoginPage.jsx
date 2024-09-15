// component imports
import { AuthForm } from "../templates/FormTemplates";
import LoginForm from "../forms/LoginForm";

export default function LoginPage() {
  return <AuthForm form={<LoginForm />} />;
}
