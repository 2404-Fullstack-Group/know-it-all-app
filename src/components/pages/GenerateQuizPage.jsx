import GenerateQuizForm from "../forms/GenerateQuizForm";
import { AuthForm } from "../templates/FormTemplates";

export default function GenerateQuizPage() {
  return (
    <>
      <AuthForm form={<GenerateQuizForm />} />
    </>
  );
}
