// component imports
import RegistrationForm from "../forms/RegistrationForm";
import AuthTemplate from "../templates/AuthTemplate";

export default function RegistrationPage() {
  return (
    <>
      <AuthTemplate form={<RegistrationForm />} />
    </>
  );
}
