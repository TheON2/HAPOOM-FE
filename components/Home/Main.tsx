import React, { ReactNode } from 'react';
import styled from 'styled-components';

const MainLayout = styled.main`
  width: 100%;
  /* padding-bottom: 100px; */
  height: calc(100vh - 252px);
  overflow-y: auto;
  transform: translateY(-107px);
  background-color: #fff;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
  @media screen and (min-width: 768px) {
    height: calc(100vh - 43vh);
    transform: translateY(-215px);
    /* overflow-y: initial; */
  }
  .center {
    margin: 0 auto;
    max-width: 768px;
    width: 100%;
  }
`;

type MainProps = {
  children: ReactNode;
};

const Main = ({ children }: MainProps) => {
  return <MainLayout>{children}</MainLayout>;
};

export default Main;
