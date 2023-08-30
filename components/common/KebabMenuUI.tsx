import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';

const KebabMenuButton = styled.button`
  background: none;
  border: none;
  width: 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  transform: translateX(43%);
  cursor: pointer;
  span {
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 3px;
    background-color: var(--toggle-color);
  }
`;
const KebabMenuContainer = styled.div`
  width: 36px;
  position: relative;
`;

export const KebabMenuStyle = styled.div`
  position: absolute;
  top: 36px;
  right: 0;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  padding: 0 8px;
  z-index: 130;
`;

export const KebabMenuAptionButton = styled.button`
  width: 164px;
  /* height: 36px; */
  padding: 14px 12px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  border-bottom: 1px solid #eee;
  font-size: 12px;
  font-weight: 700;
  color: #808080;
  cursor: pointer;
  &:last-child {
    border: none;
  }
  span {
    width: 12px;
    height: 12px;
    border: 1px solid var(--primary-second-color);
    border-radius: 3px;
  }
  &:hover span {
    background-color: var(--primary-three-color);
  }
  &:active span {
    background-color: var(--primary-second-color);
  }
`;

type kebabProps = {
  children: ReactNode;
};

const KebabMenuUI = ({ children }: kebabProps) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const onClickKebabUIHandler = () => {
    setIsShow(!isShow);
  };
  return (
    <KebabMenuContainer>
      <KebabMenuButton onClick={onClickKebabUIHandler}>
        <span></span>
        <span></span>
        <span></span>
      </KebabMenuButton>
      {isShow ? children : null}
    </KebabMenuContainer>
  );
};

export default KebabMenuUI;
