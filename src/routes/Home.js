import { dbService } from "myBase";
import { onSnapshot, getDocs, addDoc, orderBy, query, collection, serverTimestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Tweet from "components/Tweets";

function Home({userObj}){
  const [tweet, setTweet] = useState("");
  const [tweetList, setTweetList] = useState([]);
  useEffect(()=>{
    const q = query(collection(dbService, "tweets"), orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const tweetArray = snapshot.docs.map(doc =>({
        id:doc.id,
        ...doc.data(),
      }))
      setTweetList(tweetArray);
    })
  }, [])
  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(dbService, "tweets"),{
      text:tweet,
      createdAt: serverTimestamp(),
      creatorId: userObj.uid,
    });
    setTweet("");
  };
  const onChange = (event) => {
    const {target: {value}} = event;
    setTweet(value);
  };
  return(
    <div>
      <form onSubmit={onSubmit}>
        <input value={tweet} onChange={onChange} type="text" placeholder="무슨 일이 일어나고 있나요?" maxLength={120} />
        <input type="submit" value="게시하기" />
      </form>
      <div>
        {tweetList.map((tweet) => (
          <Tweet key={tweet.id} tweetObj={tweet} isOwner={tweet.creatorId === userObj.uid} />
        ))}
      </div>
    </div>
  )
}

export default Home;