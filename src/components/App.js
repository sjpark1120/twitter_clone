import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setuserObj] = useState(null);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) =>{
      if(user){
        setuserObj(user);
      }
      setInit(true);
    })
  }, [])
  return (
    <>
    {init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} /> : "초기화 중..."}
    <footer>
    <a href="https://github.com/sjpark1120">github: sjpark1120</a>
      <div>&copy; {new Date().getFullYear()} twitter-clone</div>
    </footer>
    </>
  );
}

export default App;
