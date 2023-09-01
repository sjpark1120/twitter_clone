import { dbService, storageService } from "myBase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";

function TweetFactory ({ userObj }){
  const [tweet, setTweet] = useState("");
  const [attachment, setAttachment] =useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if(attachment !== ""){ //이미지 첨부한 경우에만
      const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(fileRef, attachment, "data_url");
      attachmentUrl = await getDownloadURL(response.ref);
    }
    await addDoc(collection(dbService, "tweets"),{
      text:tweet,
      createdAt: serverTimestamp(),
      creatorId: userObj.uid,
      attachmentUrl,
    });
    setTweet(""); //작성창에 적힌내용 지우기
    setAttachment(""); //파일 미리보기 지우기
  };
  const onChange = (event) => {
    const {target: {value}} = event;
    setTweet(value);
  };
  const onFileChange = (event) => {
    const theFile = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) =>{
      setAttachment(finishedEvent.currentTarget.result);
    }
    reader.readAsDataURL(theFile);
  }
  const onClearAttachment = () => {
    setAttachment("");
  }
  return (
    <form onSubmit={onSubmit}>
        <input value={tweet} onChange={onChange} type="text" placeholder="무슨 일이 일어나고 있나요?" maxLength={120} />
        <input onChange={onFileChange} type="file" accept="image/*" />
        <input type="submit" value="게시하기" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>사진 지우기</button>
          </div>
        )}
      </form>
  )
}

export default TweetFactory;