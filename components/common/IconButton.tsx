import React, { ReactNode } from 'react';
import { styled } from 'styled-components';

const IconButtonStyle = styled.button`
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  transform: translateX(10px);
  svg {
    width: 20px;
    height: 20px;
  }
  &:hover {
    background-color: #00000020;
    border-radius: 50%;
  }
`;

type buttonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
};

const IconButton = ({ children, ...restProps }: buttonProps) => {
  return <IconButtonStyle {...restProps}>{children}</IconButtonStyle>;
};

export default IconButton;
