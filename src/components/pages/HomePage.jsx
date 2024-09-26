import { useState } from "react";
import { JSXButton, Modal } from "../Elements";
import ProfileForm from "../forms/ProfileForm";
import LoginForm from "../forms/LoginForm";

export default function HomePage() {
  const [isModal, setIsModal] = useState(false);

  const handleClick = () => {
    setIsModal(true);
  };
  const handleModalClose = () => {
    setIsModal(false);
  };

  return (
    <>
      <JSXButton text={"Open Modal"} onClick={handleClick} />
      {isModal ? (
        <Modal content={<LoginForm />} closeModal={handleModalClose} />
      ) : null}
    </>
  );
}
