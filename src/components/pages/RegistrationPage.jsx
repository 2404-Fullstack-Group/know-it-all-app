// component imports
import RegistrationForm from "../forms/RegistrationForm";
import FormTemplate from "../templates/FormTemplate";

export default function RegistrationPage() {
  return (
    <>
      <FormTemplate form={<RegistrationForm />} />
    </>
  );
}
