import React, { ReactNode } from 'react';
import styled from 'styled-components';

type styleProps = {
  className: any;
};

const UpAndDownTabLayout = styled.div<styleProps>`
  width: 100%;
  /* height: 80vh; */
  padding: 20px 24px;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 15;
  border-radius: 25px 25px 0 0;
  background-color: #fff;
  box-shadow: 0px -5px 10px rgba(0, 0, 0, 0.2);

  &.up {
    animation: comment-up 0.8s forwards;
  }
  &.down {
    animation: comment-down 0.8s forwards;
  }
  span {
    display: block;
    width: 23px;
    height: 3px;
    margin: 0 auto 25px;
    border-radius: 2px;
    background-color: #ddd;
  }
  @keyframes comment-up {
    0% {
      transform: translateY(70%);
    }
    100% {
      transform: translateY();
    }
  }
  @keyframes comment-down {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(70%);
    }
  }
`;

type Props = {
  children: ReactNode;
  $isUp: boolean;
  onClickEvent: () => void;
};

const UpAndDownTab = ({ children, $isUp, onClickEvent }: Props) => {
  return (
    <UpAndDownTabLayout className={$isUp ? `up` : `down`}>
      <span onClick={onClickEvent}></span>
      {children}
    </UpAndDownTabLayout>
  );
};

export default UpAndDownTab;
