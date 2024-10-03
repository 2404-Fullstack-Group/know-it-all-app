import GenerateQuizForm from "../forms/GenerateQuizForm";
import { AuthForm } from "../templates/FormTemplates";

export default function GenerateQuizPage(userId, token) {
  return (
    <>
      <AuthForm form={<GenerateQuizForm userId={userId} token={token} />} />
    </>
  );
}
