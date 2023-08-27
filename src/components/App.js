import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import {authService} from "myBase"
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setuserObj] = useState(null);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) =>{
      if(user){
        setIsLoggedIn(true);
        setuserObj(user);
      }else{
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  }, [])
  return (
    <>
    {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "초기화 중..."}
    <footer>
    <a href="https://github.com/sjpark1120">github: sjpark1120</a>
      <div>&copy; {new Date().getFullYear()} twitter-clone</div>
    </footer>
    </>
  );
}

export default App;
