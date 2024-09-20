// component imports
import UserProfile from "../sections/UserProfile";
import UserQuizzes from "../sections/UserQuizzes";
import { JSXSpan } from "../Elements";

export default function ProfilePage() {
  return (
    <>
      <h2>
        <JSXSpan text="Profile" />
      </h2>
      <UserProfile />
      <UserQuizzes />
    </>
  );
}
