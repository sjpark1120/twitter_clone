import React, { useEffect, useState } from "react";
import { signOut, updateProfile } from "firebase/auth";
import { dbService, authService, storageService } from "myBase";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { onSnapshot, collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { v4 as uuidv4 } from "uuid";
import Tweet from "components/Tweets";

function Profile({ userObj, refreshUser }){
  const [newName, setNewName] = useState(userObj.displayName);
  const [profileImg, setProfileImg] =useState("");
  const [myTweetList, setMyTweetList] = useState([]);
  const history = useHistory();
  const onLogoutClick = () => {
    signOut(authService);
    history.push("/");
  };
  const getMyTweets = async() => {
    const q = query(collection(dbService, "tweets"),
    where("creatorId", "==", `${userObj.uid}`),
    orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
    onSnapshot(q, (snapshot) => {
      const myTweetArray = snapshot.docs.map(doc =>({
        id:doc.id,
        ...doc.data(),
      }))
      setMyTweetList(myTweetArray);
    })
  };
  const onChange = (event) => {
    setNewName(event.target.value);
  };
  const onSubmit = async(event) => {
    event.preventDefault();
    if(userObj.displayName !== newName){
      await updateProfile(authService.currentUser, { displayName: newName });
      refreshUser();
    }
    if(userObj.photoURL !== profileImg){
      let imgUrl = "";
      if(profileImg !== ""){ //이미지 첨부한 경우에만
        const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
        const response = await uploadString(fileRef, profileImg, "data_url");
        imgUrl = await getDownloadURL(response.ref);
        await updateProfile(authService.currentUser, { photoURL: imgUrl });
        refreshUser();
      }
    }
  };
  const onFileChange = (event) => {
    const theFile = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) =>{
      setProfileImg(finishedEvent.currentTarget.result);
    }
    reader.readAsDataURL(theFile);
  }

  useEffect(()=>{
    getMyTweets();
  }, [])
  return(
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <label htmlFor="img-file" className="profileImg_label">
          <img src={profileImg ? profileImg : userObj.photoURL} height="150px" width="150px" className="profileImg"/>
        </label>
        <input id="img-file" onChange={onFileChange} type="file" accept="image/*" style={{
          opacity: 0,
        }}/>
        <input onChange={onChange} type="text" autoFocus placeholder="이름 설정" value={newName} className="formInput" />
        <input type="submit" value="프로필 변경하기" className="formBtn"
          style={{
            marginTop: 10,
          }} />
        <span className="formBtn cancelBtn logOut" onClick={onLogoutClick}>
          Log Out
        </span>
      </form>
      <div>
        {myTweetList.map((tweet) => (
          <Tweet key={tweet.id} tweetObj={tweet} isOwner={tweet.creatorId === userObj.uid} />
        ))}
      </div>
    </div>
  )
}

export default Profile;