// react imports
import { useState } from "react";

// component imports
import { AuthForm } from "../templates/FormTemplates";
import LoginForm from "../forms/LoginForm";
import RegistrationForm from "../forms/RegistrationForm";
import { JSXSpan } from "../Elements";

export default function LoginPage({
  setToken,
  setUserId,
  isModal,
  setIsModal,
  setIsAdmin,
}) {
  const [isLogin, setIsLogin] = useState(true);
  const [isNewAccount, setIsNewAccount] = useState(false);
  return (
    <>
      {isNewAccount ? (
        <JSXSpan text={"Account Created! Please sign in."} />
      ) : null}
      {isLogin ? (
        <AuthForm
          form={
            <LoginForm
              setToken={setToken}
              setUserId={setUserId}
              setIsLogin={setIsLogin}
              isNewAccount={isNewAccount}
              setIsNewAccount={setIsNewAccount}
              isModal={isModal}
              setIsModal={setIsModal}
              setIsAdmin={setIsAdmin}
            />
          }
        />
      ) : (
        <AuthForm
          form={
            <RegistrationForm
              setIsLogin={setIsLogin}
              setIsNewAccount={setIsNewAccount}
            />
          }
        />
      )}
    </>
  );
}
