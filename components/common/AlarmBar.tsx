import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Bell } from '@/components/common/SVG';
// import Icon from '/🦆 icon _cloud_.svg';
import { Home, Search, Upload, MyProfile } from '@/components/common/SVG';
import useSwipe from '@/hooks/useSwipe';
const AlarmContainerStyle = styled.div`
  max-width: 280px;
  width: 80%;
  /* display: flex;
  flex-direction: column; */
  position: fixed;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
`;

const AlarmBox = styled.div`
  width: 100%;
  /* height: 54px; */
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 18px;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  transition: all 0.3s ease-in-out;
  &.fade-in {
    animation: fadeIn 1s forwards ease-in-out;
  }
  &.fade-out {
    animation: fadeOut 1s forwards ease-in-out;
  }
  p {
    width: calc(100% - 20px);
    text-align: center;
    font-weight: 700;
    font-size: 14px;
    color: #fff;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* 인터넷익스플로러 */
    user-select: none;
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translate(0, -100px);
    }
    100% {
      opacity: 1;
      transform: translate(0, 0);
    }
  }
  @keyframes fadeOut {
    0% {
      opacity: 1;
      transform: translate(0, 0);
    }
    99% {
      opacity: 0;
      transform: translate(600%, 0);
    }
    100% {
      opacity: 0;
      transform: translate(600%, 0);
      display: none;
    }
  }
`;

const AlarmIconBox = styled.div`
  width: 20px;
  height: 20px;
  background-color: #2797ff;
  padding: 2px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 80%;
    height: 80%;
  }
`;

const FADE_OUT_INTERVAL = 5000;

type Props = {
  className?: string;
  alarm: string;
};

export const AlarmBar = ({ className, alarm }: Props) => {
  const [isShow, setIsShow] = useState<boolean>(true);
  // const onClickAlarmHandler = () => {
  //   setIsShow(!isShow);
  // };
  const leftAction = () => {};

  const rightAction = () => {
    setIsShow(!isShow);
  };
  const {
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useSwipe(leftAction, rightAction);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsShow(false);
    }, FADE_OUT_INTERVAL);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <AlarmBox
      className={`${isShow ? 'fade-in' : 'fade-out'} ${className}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <AlarmIconBox>
        <Bell fillColor={'#fff'} />
      </AlarmIconBox>
      <p>{alarm}</p>
    </AlarmBox>
  );
};

const AlarmContainer = () => {
  const [arr, setArr] = useState(['알림이 도착했습니다.']);
  // console.log(arr);
  // const test = () => {
  //   setArr((prevArr) => [...prevArr, '알림2']);
  // };
  return (
    <>
      <AlarmContainerStyle>
        {/* <button onClick={test}>알림 추가</button> */}
        {arr.map((alarm, idx) => {
          return <AlarmBar alarm={alarm} key={idx} />;
        })}
      </AlarmContainerStyle>
    </>
  );
};

export default AlarmContainer;
