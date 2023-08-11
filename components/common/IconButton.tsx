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
  svg {
    transform: scale(0.8);
  }
`;

type buttonProps = {
  children: ReactNode;
  onClick?: () => void;
};

const IconButton = ({ children, ...restProps }: buttonProps) => {
  return <IconButtonStyle {...restProps}>{children}</IconButtonStyle>;
};

export default IconButton;
