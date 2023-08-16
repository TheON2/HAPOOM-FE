import React, { ReactNode } from 'react';
import styled from 'styled-components';

const LayoutWapper = styled.div`
  max-width: 700px;
  width: 100%;
  height: calc(100vh - 58px);
  margin: 0 auto;
  border-radius: 25px 25px 0 0;
  background-color: #fff;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;
type Props = {
  children: ReactNode;
};
const PageLayout = ({ children }: Props) => {
  return <LayoutWapper>{children}</LayoutWapper>;
};

export default PageLayout;
