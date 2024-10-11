import { JSXInput, JSXSpan, JSXButton } from "../Elements";
import axios from "axios";

export default function ProfileForm({
  userData,
  setUserData,
  handleModalClose,
  user_id,
  token,
}) {
  const handleUsernameChange = (value) => {
    setUserData((prevState) => ({
      ...prevState,
      username: value,
    }));
  };

  const handleFirstNameChange = (value) => {
    setUserData((prevState) => ({
      ...prevState,
      first_name: value,
    }));
  };

  const handleLastNameChange = (value) => {
    setUserData((prevState) => ({
      ...prevState,
      last_name: value,
    }));
  };

  const handleEmailChange = (value) => {
    setUserData((prevState) => ({
      ...prevState,
      email: value,
    }));
  };
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(
      `${API_URL}/api/users/${user_id}`,
      {
        username: userData.username,
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    handleModalClose();
  };

  return (
    <form className="profile-form" onSubmit={(e) => handleSubmit(e)}>
      <div className="profile-username">
        <JSXSpan text="Username:" />
        <JSXInput
          placeholder={"Change Username"}
          value={userData.username}
          onChange={(e) => handleUsernameChange(e.target.value)}
        />
      </div>
      <div className="profile-firstname">
        <JSXSpan text="First Name:" />
        <JSXInput
          placeholder={"Change First Name"}
          value={userData.first_name}
          onChange={(e) => handleFirstNameChange(e.target.value)}
        />
      </div>
      <div className="profile-lastname">
        <JSXSpan text="Last Name:" />
        <JSXInput
          placeholder={"Change Last Name"}
          value={userData.last_name}
          onChange={(e) => handleLastNameChange(e.target.value)}
        />
      </div>
      <div className="profile-email">
        <JSXSpan text="Email:" />
        <JSXInput
          placeholder={"Change Email"}
          value={userData.email}
          onChange={(e) => handleEmailChange(e.target.value)}
        />
      </div>
      <JSXButton text={"Submit"} />
    </form>
  );
}
