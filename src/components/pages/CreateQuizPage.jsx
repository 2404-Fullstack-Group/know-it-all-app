import QuizCreatorForm from "../forms/QuizCreatorForm";
import FormTemplate from "../templates/FormTemplate";

export default function CreateQuizPage() {
  return (
    <>
      <FormTemplate form={<QuizCreatorForm />} />
    </>
  );
}
