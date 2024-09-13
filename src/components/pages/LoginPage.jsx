// component imports
import LoginForm from "../forms/LoginForm";
import FormTemplate from "../templates/FormTemplate";

export default function LoginPage() {
  return (
    <>
      <FormTemplate form={<LoginForm />} />
    </>
  );
}
