import React, { useState } from "react";
import { dbService, storageService } from "../myBase";
import { doc, deleteDoc, updateDoc }from"firebase/firestore";
import { deleteObject, ref } from "@firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
    <div className="nweet">
      {editing ? (
        <>
        <form onSubmit={onSubmit} className="container nweetEdit">
          <input onChange={onChange} type="text" placeholder="트윗을 수정" value={newTweet} required autoFocus className="formInput" />
          <input type="submit" value="트윗 수정" className="formBtn" />
        </form>
        <span onClick={toggleEditing} className="formBtn cancelBtn">
          취소
        </span>
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {tweetObj.attachmentUrl && <img src={tweetObj.attachmentUrl} />}
          {tweetObj.createdAt &&<span>{tweetObj.createdAt.toDate().toLocaleDateString()} {tweetObj.createdAt.toDate().toLocaleTimeString()}</span>}
          {isOwner && (
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Tweet;