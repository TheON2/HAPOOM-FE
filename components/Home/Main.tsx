import React, { ReactNode } from 'react';
import styled from 'styled-components';

const MainLayout = styled.main`
  margin: 0 auto;
  max-width: 1440px;
  width: 100%;
`;

type MainProps = {
  children: ReactNode;
};

const Main = ({ children }: MainProps) => {
  return <MainLayout>{children}</MainLayout>;
};

export default Main;
