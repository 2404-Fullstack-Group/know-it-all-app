// component imports
import { SectionForm } from "../templates/FormTemplates";
import QuizForm from "../forms/QuizForm";

export default function CreateQuizPage({ userId, setUserId, token, setToken }) {
  return (
    <SectionForm
      form={
        <QuizForm
          userId={userId}
          setUserId={setUserId}
          token={token}
          setToken={setToken}
        />
      }
    />
  );
}
