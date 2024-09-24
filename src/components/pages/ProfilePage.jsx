// component imports
import UserProfile from "../sections/UserProfile";
import UserQuizzes from "../sections/UserQuizzes";
import { JSXSpan } from "../Elements";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ProfilePage({ token }) {
  const { user_id } = useParams();
  const [userData, setUserData] = useState("");

  const getUserInfo = async () => {
    const response = await axios.get(
      `http://localhost:3000/api/users/${user_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setUserData(response.data);
  };

  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <>
      <h2>
        <JSXSpan text="My Profile" />
      </h2>
      <UserProfile userData={userData} setUserData={setUserData} />
      <UserQuizzes />
    </>
  );
}
