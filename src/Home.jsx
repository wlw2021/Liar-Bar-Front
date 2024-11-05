import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Emogun from './Emogun';
import { useNavigate } from 'react-router-dom';

const Home = () => {
 
  const [position, setPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2});
  const [rotation, setRotation] = useState(0); // 旋转角度
  const velocityRef = useRef({ x: 5, y: 5 }); // 使用 ref 来存储速度
  const textRef = useRef(null); // 用于获取“骗子酒馆”文字的大小
  const [isAnimating, setIsAnimating] = useState(false); 
  const [emogunComponents, setEmogunComponents] = useState([]); // 存储 Emogun 组件的数组
  const navigate = useNavigate();
  

  
  // 处理平移和反弹逻辑
  const animate = () => {
    const textElement = textRef.current;
    const textWidth = textElement.offsetWidth;
    const textHeight = textElement.offsetHeight;

    if (!isAnimating){
      setPosition({x: (window.innerWidth-textWidth)/ 2, y: (window.innerHeight-textHeight) / 2})

      return
    } ;
    setPosition((prevPosition) => {   
      

      const parentWidth = window.innerWidth; // 父容器宽度
      const parentHeight = window.innerHeight; // 父容器高度   
      

      let newX = prevPosition.x + velocityRef.current.x;
      let newY = prevPosition.y + velocityRef.current.y;

      // 碰到左右边界，反转 x 轴速度
      if (newX + textWidth > parentWidth || newX < 0) {
        velocityRef.current.x = -velocityRef.current.x; // 更新 ref 中的速度
      }

      // 碰到上下边界，反转 y 轴速度
      if (newY + textHeight > parentHeight || newY < 0) {
        velocityRef.current.y = -velocityRef.current.y; // 更新 ref 中的速度
      }

      return {
        x: newX,
        y: newY,
      };
    });

    // 每帧增加旋转角度
    setRotation((prevRotation) => prevRotation + 7); // 每次更新旋转角度 +2
  };

  useEffect(() => {
    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId); // 清除动画帧
  }, [position, isAnimating]); // 只依赖 position，velocity 和 rotation 通过 ref 和 state 控制

  const handleClick = () => {
    if (!isAnimating) {
      setIsAnimating(true); // 点击后开始动画
    } else {
      setEmogunComponents((prevComponents) => [...prevComponents, <Emogun key={prevComponents.length} />]); // 添加新的 Emogun 组件
    }
  };

  const newroom = () => {
    navigate("/createroom");
  };
 
  const findroom = () => {
    navigate("/joinroom");
  };
  return (
    <div className='home-page' onClick={handleClick}>
      <div 
        ref={textRef} 
        className="random-text" 
        style={{
          transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`, // 平移和旋转结合
          willChange: 'transform'}}
        
      >
        骗子酒馆🔫
      </div>
      {emogunComponents.map((component) => component)}
      <div className='buttons'>
        <button className="homeButton" onClick={newroom}>创建游戏</button>
        <button className="homeButton" onClick={findroom} style={{marginLeft: 40}}>加入房间</button>
      </div>
      
    </div>
  );
};

export default Home;
