import React, { useEffect, useRef, useState } from 'react';
import './App.css';

const Emogun = () => {
  const pos = Math.random() * 10 + 1
  const speed = Math.random() * 15
  const [position, setPosition] = useState({ x: pos, y: pos });
  const [rotation, setRotation] = useState(0); // 旋转角度
  const velocityRef = useRef({ x: speed, y: speed+3 }); // 使用 ref 来存储速度
  const gunRef = useRef(null); // 用于获取“骗子酒馆”文字的大小

  // 处理平移和反弹逻辑
  const animate = () => {
    setPosition((prevPosition) => {
      const textElement = gunRef.current;
      const textWidth = textElement.offsetWidth;
      const textHeight = textElement.offsetHeight;

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
    setRotation((prevRotation) => prevRotation + 1); // 每次更新旋转角度 +2
  };

  useEffect(() => {
    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId); // 清除动画帧
  }, [position]); // 只依赖 position，velocity 和 rotation 通过 ref 和 state 控制

  return (
      <div 
        ref={gunRef} 
        className="emogun" 
        style={{
          transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`, // 平移和旋转都通过JS控制
        }}
      >
        🔫
      </div>
  );
};

export default Emogun;
