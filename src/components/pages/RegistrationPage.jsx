// component imports
import { AuthForm } from "../templates/FormTemplates";
import RegistrationForm from "../forms/RegistrationForm";

export default function RegistrationPage() {
  return (
    <article>
      <AuthForm form={<RegistrationForm />} />
    </article>
  );
}
