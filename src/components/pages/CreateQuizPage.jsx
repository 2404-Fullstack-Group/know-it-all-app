// component imports
import { SectionForm } from "../templates/FormTemplates";
import QuizForm from "../forms/QuizForm";

export default function CreateQuizPage({ userId, token }) {
  return <SectionForm form={<QuizForm userId={userId} token={token} />} />;
}
