import React, { ReactNode } from 'react';
import styled from 'styled-components';

type styleProps = {
  className: any;
};

const UpAndDownTabLayout = styled.div<styleProps>`
  width: 100%;
  padding: 0px 24px 80px;
  position: fixed;
  bottom: 0;
  left: 50%;
  z-index: 115;
  border-radius: 25px 25px 0 0;
  background-color: var(--bg-color);
  box-shadow: 0px -5px 10px rgba(0, 0, 0, 0.2);
  transform: translateX(-50%);
  &.up {
    animation: comment-up 0.8s forwards;
  }
  &.down {
    animation: comment-down 0.8s forwards;
  }
  &.up.write {
    animation: comment-up 0.8s forwards;
  }
  &.down.write {
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
      transform: translateY(73%) translateX(-50%);
    }
    100% {
      transform: translateY(0) translateX(-50%);
    }
  }
  @keyframes comment-down {
    0% {
      transform: translateY(0) translateX(-50%);
    }
    100% {
      transform: translateY(73%) translateX(-50%);
    }
  }

  @media screen and (min-width: 768px) {
    max-width: 400px;
    padding: 0px 24px 30px;
    &.up.write {
      animation: write-up 0.8s forwards;
    }
    &.down.write {
      animation: write-down 0.8s forwards;
    }
    @keyframes comment-up {
      0% {
        transform: translateY(87%) translateX(-50%);
      }
      100% {
        transform: translateY(0) translateX(-50%);
      }
    }
    @keyframes comment-down {
      0% {
        transform: translateY(0) translateX(-50%);
      }
      100% {
        transform: translateY(87%) translateX(-50%);
      }
    }
    @keyframes write-up {
      0% {
        transform: translateY(100%) translateX(-50%);
        box-shadow: none;
      }
      100% {
        transform: translateY(0) translateX(-50%);
      }
    }
    @keyframes write-down {
      0% {
        transform: translateY(0) translateX(-50%);
      }
      100% {
        transform: translateY(100%) translateX(-50%);
        box-shadow: none;
      }
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
  className?: string;
};

const UpAndDownTab = ({ children, $isUp, onClickEvent, className }: Props) => {
  return (
    <UpAndDownTabLayout
      className={
        $isUp
          ? `up ${className && className}`
          : `down ${className && className}`
      }
    >
      <div className="click-hit-area" onClick={onClickEvent}>
        <span></span>
      </div>
      <UpAndDownTabInner>{children}</UpAndDownTabInner>
    </UpAndDownTabLayout>
  );
};

export default UpAndDownTab;
