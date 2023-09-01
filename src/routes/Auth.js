import AuthForm from 'components/AuthForm';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  } from 'firebase/auth';
import { authService } from 'myBase';
import React from "react";

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
  return(
    <div>
      <AuthForm />
      <div>
        <button onClick={onSocialClick} name="google">Google 계정으로 로그인</button>
        <button onClick={onSocialClick} name="github">Github 계정으로 로그인</button>
      </div>
    </div>
  )
}

export default Auth;