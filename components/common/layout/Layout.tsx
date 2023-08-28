import React, { ReactNode } from 'react';
import Header from '@/components/common/Header';
import MobileBottomNav from '@/components/common/MobileBottomNav';
import Footer from '@/components/common/Footer';
import AlarmBar from '../AlarmBar';
import { useRouter } from 'next/router';
import { createGlobalStyle, styled } from 'styled-components';
import { useDispatch } from 'react-redux';
import { ADD_NOTIFICATION } from '@/redux/reducers/notificationSlice';

type layoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: layoutProps) => {
  const router = useRouter();
  const isHome = router.pathname === '/find';
  return (
    <>
      <GlobalStyle />
      <LayoutStyle $isHome={isHome}>
        <Header $sticky={isHome} />
        {isHome ? (
          <>{children}</>
        ) : (
          <LayoutWapper>
            <div className="center">{children}</div>
            {/* <Footer /> */}
          </LayoutWapper>
        )}
      </LayoutStyle>
    </>
  );
};

export default Layout;

const LayoutWapper = styled.div`
  width: 100%;
  padding-bottom: 100px;
  /* height: calc(100vh - 70px); */
  /* border-radius: 25px 25px 0 0; */
  background-color: #fff;
  /* overflow: auto; */
  &::-webkit-scrollbar {
    display: none;
  }
`;
type layoutStyleProps = {
  $isHome: boolean;
};
const LayoutStyle = styled.div<layoutStyleProps>`
  background-color: ${(props) => (props.$isHome ? '#2797ff' : '#fff')};
  .center {
    max-width: 768px;
    width: 100%;
    margin: 0 auto;
  }
`;
export const GlobalFonts = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap');
`;

export const GlobalStyle = createGlobalStyle`
  body{
    color: #051619;
    font-family: "Noto Sans KR","Apple SD Gothic Neo",sans-serif;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    letter-spacing: -.0125rem;
    margin: 0;
  }
  `;
