import React, { useState } from "react";
import { dbService, storageService } from "../myBase";
import { doc, deleteDoc, updateDoc }from"firebase/firestore";
import { deleteObject, ref } from "@firebase/storage";

function Tweet({tweetObj, isOwner}) {
  const [editing, setEditing] =useState(false);
  const [newTweet, setNewTweet] =useState(tweetObj.text);
  const onDeleteClick = async() => {
    const ok = window.confirm("정말 이 트윗을 삭제하시겠습니까?");
    if(ok){
      const TweetTextRef =doc(dbService, "tweets", `${tweetObj.id}`);
      await deleteDoc(TweetTextRef);
      if(tweetObj.attachmentUrl){ //첨부된 사진이 있으면 사진도 삭제
        await deleteObject(ref(storageService, tweetObj.attachmentUrl));
      }
    }
  }
  const toggleEditing = () => {
    setEditing((prev) => !prev);
  }
  const onSubmit = async(event) => {
    event.preventDefault();
    const TweetTextRef =doc(dbService, "tweets", `${tweetObj.id}`);
    await updateDoc(TweetTextRef, {
      text: newTweet,
      });
    setEditing(false);
  }
  const onChange =(event) =>{
    setNewTweet(event.target.value)
  }
  return (
    <div>
      {editing ? (
        <>
        <form onSubmit={onSubmit}>
          <input onChange={onChange} type="text" placeholder="트윗을 수정" value={newTweet} required />
          <input type="submit" value="트윗 수정" />
        </form>
        <button onClick={toggleEditing}>취소</button>
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {tweetObj.attachmentUrl && <img src={tweetObj.attachmentUrl} height="50px" width="50px" />}
          {tweetObj.createdAt &&<span>{tweetObj.createdAt.toDate().toLocaleDateString()} {tweetObj.createdAt.toDate().toLocaleTimeString()}</span>}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>삭제</button>
              <button onClick={toggleEditing}>수정</button>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default Tweet;