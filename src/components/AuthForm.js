import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  } from 'firebase/auth';
import React, { useState } from "react";

const inputStyles = {};

function AuthForm(){
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
  return (
    <>
      <form className="container" onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="이메일"
          required
          value={email}
          onChange={onChange}
          className="authInput"
        />
        <input
          name="password"
          type="password"
          placeholder="패스워드"
          required
          value={password}
          onChange={onChange}
          className="authInput"
        />
        <input className="authInput authSubmit" type="submit" value={newAccount ? "회원 가입" : "로그인"} />
        {error && <span className="authError">{error}</span>}
      </form>
      <span className="authSwitch" onClick={toggleAccount}>{newAccount ? "로그인 하기" : "회원 가입 하기"}</span>
    </>
  )
}
export default AuthForm;