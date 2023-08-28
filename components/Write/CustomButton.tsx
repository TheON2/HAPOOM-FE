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
  padding: 12px 16px;
  //margin-top: ${({ $marginTop }) => $marginTop};
  margin: 0 auto;
  border-radius: 6px;
  color: ${(props) => (props.$addStyle ? '#2797ff' : '#fff')};
  border: 2px solid #2797ff;
  background-color: ${(props) => (props.$addStyle ? '#fff' : '#2797ff')};
  cursor: pointer;
  &.secondary {
    color: #818181;
    background-color: #e1e1e1;
    &:hover {
      background-color: #f1f1f1;
    }
    &:active {
      background-color: #d9d9d9;
    }
  }
  &:hover {
    background-color: #7dc1ff;
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
