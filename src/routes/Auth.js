import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  } from 'firebase/auth';
import { authService } from 'myBase';
import React, { useState } from "react";

function Auth(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (event) => {
    const {target: {name, value}} =event;
    if(name === "email"){
      setEmail(value);
    }else if(name ==="password"){
      setPassword(value);
    }
  }
  const onSubmit = async(event) => {
    event.preventDefault();
    try{
      let data
      const auth = getAuth();
      if(newAccount){
        // create account
        data = await createUserWithEmailAndPassword(
          auth, email, password
        )
      }else {
        // log in
        data = await signInWithEmailAndPassword(
          auth, email, password
          );
  
      }
    } catch(error){
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount(prev => !prev);
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
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="이메일"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="패스워드"
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? "회원 가입" : "로그인"} />
        {error}
      </form>
      <span onClick={toggleAccount}>{newAccount ? "로그인 하기" : "회원 가입 하기"}</span>
      <div>
        <button onClick={onSocialClick} name="google">Google 계정으로 로그인</button>
        <button onClick={onSocialClick} name="github">Github 계정으로 로그인</button>
      </div>
    </div>
  )
}

export default Auth;