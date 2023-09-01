import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface Button {
  $marginTop?: string;
  $addStyle: any;
}

const ButtonStyle = styled.button<Button>`
  /* height: 36px; */
  max-width: 360px;
  width: 100%;
  padding: 10px 16px;
  //margin-top: ${({ $marginTop }) => $marginTop};
  font-weight: 700;
  font-size: 20px;
  margin: 0 auto;
  border: 1px solid #2797ff;
  border-radius: 4px;
  color: ${(props) => (props.$addStyle ? '#2797ff' : '#fff')};
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
  background-color: ${(props) =>
    props.$addStyle ? 'var(--button-second-color)' : '#2797ff'};
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &.secondary {
    color: #818181;
    background-color: #e1e1e1;
    &:hover {
      background-color: #f1f1f1;
      box-shadow: 0 3px 3px rgba(0, 0, 0, 0.15);
    }
    &:active {
      background-color: #d9d9d9;
    }
  }
  &:hover {
    background-color: var(--button-second-hover-color);
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.15);

    color: #fff;
  }
  &:active {
    background-color: #2797ff;
    color: #fff;
  }
`;

type buttonProps = {
  children: ReactNode;
  $marginTop?: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  onClick?: any;
  $addStyle?: any;
};

const CustomButton = ({
  children,
  $marginTop,
  $addStyle,
  ...restProps
}: buttonProps) => {
  return (
    <ButtonStyle {...restProps} $marginTop={$marginTop} $addStyle={$addStyle}>
      {children}
    </ButtonStyle>
  );
};

export default CustomButton;
