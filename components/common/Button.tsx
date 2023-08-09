import React, { ReactNode } from 'react';
import styled from 'styled-components';

const ButtonStyle = styled.button`
  /* height: 36px; */
  width: 100%;
  padding: 12px 16px 8px;
  border-radius: 3px;
  color: #fff;
  border: 1px solid #0084ff;
  background-color: #0084ff;
  cursor: pointer;
`;

type buttonProps = {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  onClick?: any;
};

const Button = ({ children, ...restProps }: buttonProps) => {
  return <ButtonStyle {...restProps}>{children}</ButtonStyle>;
};

export default Button;
