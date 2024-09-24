import { JSXSpan, JSXButton } from "../Elements"

export default function ProfileForm({ userData, setUserData, field, onClick }) {


  return (
    <div className="profile-form">
      <JSXSpan text="Username:"/>
      <JSXSpan text={userData.username}/>
      <JSXButton text="Change Username" onClick={onClick}/>
    </div>
  )
}