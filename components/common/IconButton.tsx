import React, { ReactNode } from 'react';
import { styled } from 'styled-components';

type IconProps = {
  $noneEdge?: boolean;
};

const IconButtonStyle = styled.button<IconProps>`
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  transform: ${(props) => (props.$noneEdge ? 'none' : 'translateX(10px)')};
  cursor: pointer;
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
  $noneEdge?: boolean;
};

const IconButton = ({ children, ...restProps }: buttonProps) => {
  return <IconButtonStyle {...restProps}>{children}</IconButtonStyle>;
};

export default IconButton;
