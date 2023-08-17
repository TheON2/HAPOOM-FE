import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface Button {
  $marginTop?: string;
}

const ButtonStyle = styled.button<Button>`
  /* height: 36px; */
  width: 100%;
  padding: 12px 16px 8px;
  margin-top: ${({ $marginTop }) => $marginTop};
  border-radius: 3px;
  color: #fff;
  border: 1px solid #2797ff;
  background-color: #2797ff;
  cursor: pointer;
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
