import React, { ReactNode } from 'react';
import Header from '@/components/common/Header';
import MobileBottomNav from '@/components/common/MobileBottomNav';
import AlarmBar from '../AlarmBar';
import { useRouter } from 'next/router';
import { styled } from 'styled-components';

type layoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: layoutProps) => {
  const router = useRouter();
  const isHome = router.pathname === '/';

  return (
    <div>
      <LayoutStyle>
        <Header sticky={isHome} />
        <AlarmBar />
        {isHome ? (
          <>{children}</>
        ) : (
          <LayoutWapper>
            <div className="center">{children}</div>
          </LayoutWapper>
        )}
      </LayoutStyle>
    </div>
  );
};

export default Layout;

const LayoutWapper = styled.div`
  width: 100%;
  height: calc(100vh - 58px);
  border-radius: 25px 25px 0 0;
  background-color: #fff;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const LayoutStyle = styled.div`
  background-color: #2797ff;
  .center {
    max-width: 768px;
    width: 100%;
    margin: 0 auto;
  }
`;
