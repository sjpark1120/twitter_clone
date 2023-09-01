import { dbService } from "myBase";
import { onSnapshot, orderBy, query, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Tweet from "components/Tweets";
import TweetFactory from "components/TweetFactory";

function Home({userObj}){
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

  return(
    <div>
      <TweetFactory userObj={userObj} />
      <div>
        {tweetList.map((tweet) => (
          <Tweet key={tweet.id} tweetObj={tweet} isOwner={tweet.creatorId === userObj.uid} />
        ))}
      </div>
    </div>
  )
}

export default Home;