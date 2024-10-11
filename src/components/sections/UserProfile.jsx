// component imports
import ProfileForm from "../forms/ProfileForm";
import ConfirmPasswordForm from "../forms/ConfirmPasswordForm";
import { JSXSpan, JSXButton, Modal } from "../Elements";
import { useState } from "react";

export default function UserProfile({ userData, setUserData, token, user_id }) {
  const [isModal, setIsModal] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  const handleModalClose = () => {
    handlePasswordChange("");
    setIsModal(false);
  };

  const handlePasswordClose = () => {
    handlePasswordChange("");
    setIsPassword(false);
  };

  const handlePasswordChange = (value) => {
    setUserData((prevState) => ({
      ...prevState,
      password: value,
    }));
  };

  return (
    <div className="user-profile">
      <div className="profile-username">
        <JSXSpan text="Username:" />
        <JSXSpan text={userData.username} />
      </div>
      <div className="profile-firstname">
        <JSXSpan text="First Name:" />
        <JSXSpan text={userData.first_name} />
      </div>
      <div className="profile-lastname">
        <JSXSpan text="Last Name:" />
        <JSXSpan text={userData.last_name} />
      </div>
      <div className="profile-email">
        <JSXSpan text="Email:" />
        <JSXSpan text={userData.email} />
      </div>
      <JSXButton
        text={"Change Account Information"}
        onClick={() => setIsPassword(true)}
      />

      {isPassword ? (
        <Modal
          content={
            <ConfirmPasswordForm
              setIsPassword={setIsPassword}
              setIsModal={setIsModal}
              setUserData={setUserData}
              userData={userData}
              token={token}
            />
          }
          closeModal={handlePasswordClose}
        />
      ) : null}

      {isModal ? (
        <Modal
          content={
            <ProfileForm
              userData={userData}
              handleModalClose={handleModalClose}
              setUserData={setUserData}
              user_id={user_id}
              token={token}
            />
          }
          closeModal={handleModalClose}
        />
      ) : null}
    </div>
  );
}
