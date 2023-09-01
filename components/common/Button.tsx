import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface Button {
  $marginTop?: string;
}

const ButtonStyle = styled.button<Button>`
  /* height: 36px; */
  max-width: 360px;
  width: 100%;
  padding: 12px 16px;
  margin-top: ${({ $marginTop }) => $marginTop};
  border-radius: 6px;
  border: none;
  color: #fff;
  background-color: var(--primary-three-color);
  cursor: pointer;
  &.secondary {
    color: var(--button-enabled-text);
    background-color: var(--button-enabled-color);
    border: none;
    /* &:hover {
      background-color: var(--button-second-hover-color);
    } */
    &:active {
      background-color: var(--button-second-color);
    }
  }
  /* &:hover {
    background-color: var(--button-hover-color);
  } */
  &:active {
    background-color: var(--primary-color);
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
