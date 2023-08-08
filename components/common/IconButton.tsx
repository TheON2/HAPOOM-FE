import React, { ReactNode } from 'react';
import { styled } from 'styled-components';

const IconButtonStyle = styled.button`
  width: 36px;
  height: 36px;
  background: none;
  border: none;
`;

type buttonProps = {
  children: ReactNode;
};

const IconButton = ({ children, ...restProps }: buttonProps) => {
  return <IconButtonStyle>{children}</IconButtonStyle>;
};

export default IconButton;
