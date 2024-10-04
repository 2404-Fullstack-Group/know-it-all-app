// component imports
import { AuthForm } from "../templates/FormTemplates";
import LoginForm from "../forms/LoginForm";
import { useState } from "react";

export default function LoginPage({ setToken, setUserId }) {
  const [isModal, setIsModal] = useState(false)
  return (
    <AuthForm
      form={
        <LoginForm
          setToken={setToken}
          setUserId={setUserId}
          setIsModal={setIsModal}
        />
      }
    />
  );
}
