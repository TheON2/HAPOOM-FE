import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface Button {
  $marginTop?: string;
}

const ButtonStyle = styled.button<Button>`
  /* height: 36px; */
  max-width: 360px;
  width: 100%;
  padding: 10px 16px 8px;
  margin-top: ${({ $marginTop }) => $marginTop};
  border-radius: 3px;
  border: none;
  color: #fff;
  background-color: #52acff;
  cursor: pointer;
  &.secondary {
    color: #818181;
    background-color: #e1e1e1;
    border: none;
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

const Button = ({ children, $marginTop, ...restProps }: buttonProps) => {
  return (
    <ButtonStyle {...restProps} $marginTop={$marginTop}>
      {children}
    </ButtonStyle>
  );
};

export default Button;
