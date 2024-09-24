import { JSXInput, JSXSpan, JSXButton } from "../Elements"
import axios from "axios";

export default function ProfileForm({ userData, setUserData }) {

  const updateEntry = async (username) => {
    console.log("userData")
    const response = await axios.put(
      `http://localhost:3000/api/users/${userData.id}`,
      {
        username: username,
      }
    );
    console.log("Put")
    console.log(response)
  };

  return (
    <form className="profile-form">
      <div className="profile-username">
        <JSXSpan text="Username:"/>
        <JSXInput placeholder={userData.username}/>
      </div>
      <div className="profile-firstname">
        <JSXSpan text="First Name:"/>
        <JSXInput placeholder={userData.first_name}/>
      </div>
      <div className="profile-lastname">
        <JSXSpan text="Last Name:"/>
        <JSXInput placeholder={userData.last_name}/>
      </div>
      <div className="profile-email">
        <JSXSpan text="Email:"/>
        <JSXInput placeholder={userData.email}/>
      </div>
    </form>
  )
}