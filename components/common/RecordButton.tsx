import React, { useState } from 'react';
import styled from 'styled-components';

type recordButton = {
  $isClick: boolean;
};
type recordProps = {
  onClickEvent: () => void;
};

const RecordButtonStyle = styled.button<recordButton>`
  width: 50px;
  height: 50px;
  background-color: #fff;
  border-radius: 50%;
  border: 2px solid #333;
  overflow: hidden;
  position: relative;
  &::after {
    content: '';
    display: block;
    width: ${(props) => (props.$isClick ? '20px' : '40px')};
    height: ${(props) => (props.$isClick ? '20px' : '40px')};
    border-radius: ${(props) => (props.$isClick ? '4px' : '50%')};
    background-color: red;
    position: absolute;
    top: 50%;
    left: 50%;
    transform-origin: center;
    transform: translate(-50%, -50%);
    transition: all 0.2s ease-in-out;
  }
`;

const RecordButton = ({ onClickEvent }: recordProps) => {
  const [isClick, setIsClick] = useState<boolean>(false);
  const onClickRecordHandler = () => {
    setIsClick(!isClick);
    onClickEvent();
  };
  return (
    <RecordButtonStyle
      $isClick={isClick}
      onClick={onClickRecordHandler}
    ></RecordButtonStyle>
  );
};

export default RecordButton;
