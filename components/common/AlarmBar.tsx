import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Bell } from '@/components/common/SVG';
import useSwipe from '@/hooks/useSwipe';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/config/configStore';
import {
  ADD_NOTIFICATION,
  CLEAR_NOTIFICATION,
} from '@/redux/reducers/notificationSlice';
const AlarmContainerStyle = styled.div`
  max-width: 320px;
  width: 90%;
  position: fixed;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
`;

const AlarmBox = styled.div`
  width: 100%;
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 18px;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 12px;
  transition: all 0.3s ease-in-out;
  animation: fadeIn 1s forwards ease-in-out, fadeOut 1s forwards ease-in-out;
  animation-delay: 0s, 5s;
  &.fade-out {
    /* background-color: red; */

    animation: ready-fadeOut 1s forwards ease-in-out;
  }
  p {
    width: calc(100% - 24px);
    text-align: center;
    font-weight: 700;
    font-size: 14px;
    color: #fff;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -ms-user-select: none;
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
  @keyframes ready-fadeOut {
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
  alarm: { message: string; id: number };
  // alarm: string;
  isShow?: boolean;
  setIsShow?: any;
};

export const AlarmBar = ({ alarm }: Props) => {
  const [isShow, setIsShow] = useState<boolean>(true);
  const leftAction = () => {};

  const rightAction = () => {
    setIsShow(false);
  };
  const {
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useSwipe(leftAction, rightAction);

  return (
    <AlarmBox
      className={!isShow ? 'fade-out' : ''}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <AlarmIconBox>
        <Bell fillColor={'#fff'} $isPush={true} />
      </AlarmIconBox>
      <p>{alarm.message}</p>
    </AlarmBox>
  );
};

type alarmProps = {
  alarmData?: any;
};

const AlarmContainer = ({ alarmData }: alarmProps) => {
  const message = useSelector((state: RootState) => state.notification.message);
  //console.log(message);
  const [alarmArr, setAlarmArr] = useState<any[]>([]);

  const addNotification = (message: any) => {
    const newNotification = {
      message,
      id: Date.now(),
    };
    setAlarmArr((prevArr) => [...prevArr, newNotification]);
    setTimeout(() => {
      removeNotification(newNotification.id); // Remove notification from the array
    }, FADE_OUT_INTERVAL + 2000);
  };

  const removeNotification = (id: any) => {
    setAlarmArr((prevArr) =>
      prevArr.filter((notification) => notification.id !== id)
    );
  };
  //console.log(alarmArr);
  useEffect(() => {
    if (message) {
      addNotification(message);
    }
  }, [message]);

  return (
    <>
      <AlarmContainerStyle>
        {alarmArr.map((alarm) => {
          return <AlarmBar alarm={alarm} key={alarm.id} />;
        })}
      </AlarmContainerStyle>
    </>
  );
};
export default AlarmContainer;
