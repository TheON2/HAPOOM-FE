import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface Button {
  $marginTop?: string;
}

const ButtonStyle = styled.button<Button>`
  /* height: 36px; */
  width: 400px;
  padding: 12px 16px 8px;
  //margin-top: ${({ $marginTop }) => $marginTop};
  margin: 20px 0;
  border-radius: 3px;
  color: #fff;
  border: 1px solid #2797ff;
  background-color: #2797ff;
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
  }
  &:active {
    background-color: #2797ff;
  }
`;

type buttonProps = {
  children: ReactNode;
  $marginTop?: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  onClick?: any;
};

const CustomButton = ({ children, $marginTop, ...restProps }: buttonProps) => {
  return (
    <ButtonStyle {...restProps} $marginTop={$marginTop}>
      {children}
    </ButtonStyle>
  );
};

export default CustomButton;
