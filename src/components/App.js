import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { authService } from "myBase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setuserObj] = useState(null);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) =>{
      if(user){
        if(user.displayName == null){
          user.displayName = user.email.split('@')[0];
        }
      }
      setuserObj({
        displayName : user.displayName,
        uid: user.uid,
        photoURL: user.photoURL,
      });
      setInit(true);
    })
  }, [])
  const refreshUser = () => {
    const user = authService.currentUser;
    setuserObj({
      displayName : user.displayName,
      uid: user.uid,
      photoURL: user.photoURL,
    });
  }
  return (
    <>
    {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj} /> : "초기화 중..."}
    <footer>
    <a href="https://github.com/sjpark1120">github: sjpark1120</a>
      <div>&copy; {new Date().getFullYear()} twitter-clone</div>
    </footer>
    </>
  );
}

export default App;
