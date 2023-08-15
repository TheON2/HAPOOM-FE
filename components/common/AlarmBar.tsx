import React from 'react';
import styled from 'styled-components';
import { Bell } from '@/components/common/SVG';
// import Icon from '/🦆 icon _cloud_.svg';
import { Home, Search, Upload, MyProfile } from '@/components/common/SVG';

const AlarmContainer = styled.div`
  max-width: 280px;
  width: 80%;
  /* height: 54px; */
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 18px;
  position: fixed;
  z-index: 999;
  display: flex;
  align-items: center;
  top: 30px;
  left: 50%;
  /* transform: translateX(-50%); */
  animation: fadeIn 6s forwards ease-in-out;
  p {
    width: calc(100% - 20px);
    text-align: center;
    font-weight: 700;
    font-size: 14px;
    color: #fff;
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translate(-50%, -100px);
    }
    20% {
      opacity: 1;
      transform: translate(-50%, 0);
    }
    90% {
      opacity: 1;
      transform: translate(-50%, 0);
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

const AlarmBar = () => {
  return (
    <AlarmContainer>
      <AlarmIconBox>
        <Bell fillColor={'#fff'} />
      </AlarmIconBox>
      <p>알림이 도착했습니다</p>
    </AlarmContainer>
  );
};

export default AlarmBar;
