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
  const [userQuizList, setUserQuizList] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  const getUserInfo = async () => {
    const response = await axios.get(`${API_URL}/api/users/${user_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUserData(response.data);
  };

  const loadQuizzes = async () => {
    const response = await axios.get(
      `${API_URL}/api/users/${user_id}/quizzes`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setUserQuizList(response.data);
  };

  useEffect(() => {
    getUserInfo();
    loadQuizzes();
  }, []);
  return (
    <>
      <h2>
        <JSXSpan text="My Profile" />
      </h2>
      <UserProfile
        userData={userData}
        setUserData={setUserData}
        token={token}
        user_id={user_id}
      />
      <h2>
        <JSXSpan text="My Quizzes" />
      </h2>
      <UserQuizzes userQuizList={userQuizList} />
    </>
  );
}
