// component imports
import axios from "axios";
import ProfileForm from "../forms/ProfileForm";
import { useNavigate } from "react-router-dom";

export default function UserProfile({ userData, setUserData }) {
  const navigate = useNavigate();
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
      <ProfileForm
        userData={userData}
        setUsername={setUserData}
        field={"username"}
        onClick={() => handleUsernameChange("Admin2")}
      />
    </div>
  );
}
