import React, { ReactNode } from 'react';
import styled from 'styled-components';

const MainLayout = styled.main`
  width: 100%;

  /* padding-bottom: 100px; */
  height: calc(100vh - 252px);
  overflow-y: auto;
  transform: translateY(-112px);
  background-color: #fff;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
  @media screen and (min-width: 768px) {
    height: calc(100vh - 200px);
    transform: translateY(-167px);
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
  return (
    <MainLayout>
      <div className="center">{children}</div>
    </MainLayout>
  );
};

export default Main;
