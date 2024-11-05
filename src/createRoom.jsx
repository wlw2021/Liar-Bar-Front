import React, { useEffect, useRef, useState } from 'react';
import './App.css';

const CreateRoom = () => {
  const [userName, setUserName] = useState("");
  const userNameInput = (e)=>{
    setUserName(e.target.value);
  }
  
  

  return(
    <div className='createRoom'>
       <div className="roomtitle" >
        新建游戏
      </div>
      <div className="otherText" style={{marginTop: 30}}>用户名：
       <input type="text" placeholder="请输入用户名" style = {{padding:10}} onChange={userNameInput} />
      </div>  

      {userName == ""?<div style={{marginTop: 80}}>
        <button className="homeButton" disabled>创建房间</button>
      </div>:
      <div style={{marginTop: 80}}>
        <button className="homeButton">创建房间</button>
      </div>}
      
    </div>
  )
};

export default CreateRoom;