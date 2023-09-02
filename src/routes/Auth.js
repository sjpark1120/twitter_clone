import AuthForm from 'components/AuthForm';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  } from 'firebase/auth';
import { authService } from 'myBase';
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

function Auth(){

  
  const onSocialClick = async(event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if(name === "google"){
      provider = new GoogleAuthProvider();
    }else if(name === "github"){
      provider = new GithubAuthProvider();
    }
    const data = await signInWithPopup(authService, provider);
    console.log(data)
  }
  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <div className="authBtns">
        <button onClick={onSocialClick} name="google" className="authBtn">
          Google계정으로 로그인 <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button onClick={onSocialClick} name="github" className="authBtn">
          Github계정으로 로그인 <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  )
}

export default Auth;