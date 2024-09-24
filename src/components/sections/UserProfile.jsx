// component imports
import axios from "axios";
import ProfileForm from "../forms/ProfileForm";
import { useNavigate } from "react-router-dom";
import { JSXSpan, JSXButton } from "../Elements"

export default function UserProfile({ userData, setUserData }) {
  const navigate = useNavigate();

  const handleUsernameChange = async (changedUsername) => {
    console.log(changedUsername);
    try {
      setUserData((prevState) => ({
        ...prevState,
        username: changedUsername,
      }));
      await updateEntry(changedUsername);
      
    } catch (error) {
      console.log(error)
    }
    // console.log(userData)
    navigate(`/profile/${userData.id}`);
  };
  return (
    <div className="user-profile">
      <div className="profile-username">
        <JSXSpan text="Username:"/>
        <JSXSpan text={userData.username}/>
      </div>
      <div className="profile-firstname">
        <JSXSpan text="First Name:"/>
        <JSXSpan text={userData.first_name}/>
      </div>
      <div className="profile-lastname">
        <JSXSpan text="Last Name:"/>
        <JSXSpan text={userData.last_name}/>
      </div>
      <div className="profile-email">
        <JSXSpan text="Email:"/>
        <JSXSpan text={userData.email}/>
      </div>
      <JSXButton text={"Change Account Information"} />
    </div>
  );
}
