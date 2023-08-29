import React, { ReactNode } from 'react';
import styled from 'styled-components';

type styleProps = {
  className: any;
};

const UpAndDownTabLayout = styled.div<styleProps>`
  width: 100%;
  /* height: 80vh; */
  padding: 0px 24px 80px;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 115;
  border-radius: 25px 25px 0 0;
  background-color: #fff;
  box-shadow: 0px -5px 10px rgba(0, 0, 0, 0.2);
  transform: translateX(50%);
  &.up {
    animation: comment-up 0.8s forwards;
  }
  &.down {
    animation: comment-down 0.8s forwards;
  }
  .click-hit-area {
    width: 100%;
    padding: 20px 0 16px;
    cursor: pointer;
    & > span {
      display: block;
      width: 23px;
      height: 3px;
      margin: 0 auto;
      border-radius: 2px;
      background-color: #ddd;
    }
  }
  @keyframes comment-up {
    0% {
      transform: translateY(73%);
    }
    100% {
      transform: translateY(0);
    }
  }
  @keyframes comment-down {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(73%);
    }
  }
`;

const UpAndDownTabInner = styled.div`
  max-width: 360px;
  width: 100%;
  margin: 0 auto;
`;

type Props = {
  children: ReactNode;
  $isUp: boolean;
  onClickEvent: () => void;
};

const UpAndDownTab = ({ children, $isUp, onClickEvent }: Props) => {
  return (
    <UpAndDownTabLayout className={$isUp ? `up` : `down`}>
      <div className="click-hit-area" onClick={onClickEvent}>
        <span></span>
      </div>
      <UpAndDownTabInner>{children}</UpAndDownTabInner>
    </UpAndDownTabLayout>
  );
};

export default UpAndDownTab;
