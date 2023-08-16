import React, { ReactNode } from 'react';
import Header from '@/components/common/Header';
import MobileBottomNav from '@/components/common/MobileBottomNav';
import AlarmBar from '../AlarmBar';
type layoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: layoutProps) => {
  return (
    <>
      {/* <Header /> */}
      {children}
      <AlarmBar />
      <MobileBottomNav />
    </>
  );
};

export default Layout;
