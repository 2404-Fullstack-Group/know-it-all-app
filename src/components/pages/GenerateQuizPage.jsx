import GenerateQuizForm from "../forms/GenerateQuizForm";
import { AuthForm } from "../templates/FormTemplates";

export default function GenerateQuizPage({
  userId,
  setUserId,
  token,
  setToken,
}) {
  return (
    <>
      <AuthForm
        form={
          <GenerateQuizForm
            userId={userId}
            setUserId={setUserId}
            token={token}
            setToken={setToken}
          />
        }
      />
    </>
  );
}
