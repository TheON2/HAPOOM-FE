import React, { useState } from 'react';
import styled from 'styled-components';

type recordButton = {
  $isClick: boolean;
};
type recordProps = {
  onClickEvent: () => void;
  className?: string;
};

const RecordButtonStyle = styled.button`
  width: 50px;
  height: 50px;
  background-color: #fff;
  border-radius: 50%;
  border: 2px solid #333;
  overflow: hidden;
  position: relative;
  margin: 0 auto;
  &::after {
    content: '';
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    top: 50%;
    left: 50%;
    transform-origin: center;
    transform: translate(-50%, -50%);
    transition: all 0.2s ease-in-out;
  }
  &.recording {
    &::after {
      width: 20px;
      height: 20px;
      border-radius: 4px;
    }
  }
`;

const RecordButton = ({ onClickEvent, className }: recordProps) => {
  const [isClick, setIsClick] = useState<boolean>(false);
  const onClickRecordHandler = () => {
    setIsClick(!isClick);
    onClickEvent();
  };
  return (
    <RecordButtonStyle
      // $isClick={isClick}
      onClick={onClickRecordHandler}
      type="button"
      className={className}
    ></RecordButtonStyle>
  );
};

export default RecordButton;
