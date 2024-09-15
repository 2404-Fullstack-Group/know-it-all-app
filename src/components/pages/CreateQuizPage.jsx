// component imports
import { SectionForm } from "../templates/FormTemplates";
import QuizForm from "../forms/QuizForm";

export default function CreateQuizPage() {
  return <SectionForm form={<QuizForm />} />;
}
