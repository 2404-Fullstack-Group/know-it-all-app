// component imports
import axios from "axios";
import ProfileForm from "../forms/ProfileForm";
import ConfirmPasswordForm from "../forms/ConfirmPasswordForm";
import { useNavigate } from "react-router-dom";
import { JSXSpan, JSXButton, Modal } from "../Elements";
import { useState } from "react";

export default function UserProfile({ userData, setUserData, token, user_id }) {
  const [isModal, setIsModal] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

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
        />
      ) : null}

      {isModal ? (
        <Modal
          content={
            <ProfileForm
              userData={userData}
              setIsModal={setIsModal}
              setUserData={setUserData}
              user_id={user_id}
              token={token}
            />
          }
        />
      ) : null}
    </div>
  );
}
