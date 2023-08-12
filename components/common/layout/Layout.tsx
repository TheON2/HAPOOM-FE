import React, { ReactNode } from 'react';
import Header from '@/components/common/layout/Header';
import MobileBottomNav from '@/components/common/layout/MobileBottomNav';
type layoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: layoutProps) => {
  return (
    <>
      {/* <Header /> */}
      {children}
      <MobileBottomNav />
    </>
  );
};

export default Layout;
