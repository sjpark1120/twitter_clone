import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { authService } from "myBase";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Profile(){
  const history = useHistory();
  const onLogoutClick = () => {
    signOut(authService);
    history.push("/");
  };
  return(
    <>
      <h1>프로필</h1>
      <button onClick={onLogoutClick}>로그아웃</button>
    </>
  )
}

export default Profile;