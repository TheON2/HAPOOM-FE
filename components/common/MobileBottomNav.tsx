import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import {
  MobileBottomNavLayout,
  BottomNavList,
  BottomNavItem,
  IconBox,
} from '@/styles/navbar';
import IconButton from '@/components/common/IconButton';
import { Home, Search, Upload, MyProfile } from '@/components/common/SVG';

type mobileBottomNavProps = {
  onClickEvent: () => void;
};

const MobileBottomNav = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {isMobile && (
        <MobileBottomNavLayout>
          <BottomNavList>
            <BottomNavItem>
              <IconBox href={'/'}>
                <Home />
                <p>home</p>
              </IconBox>
            </BottomNavItem>
            <BottomNavItem>
              <IconBox href={'/'}>

                <Search />

                <p>search</p>
              </IconBox>
            </BottomNavItem>
            <BottomNavItem>
              <IconBox href={'/post/Write'}>

                <Upload />
                <p>upload</p>

              </IconBox>
            </BottomNavItem>
            <BottomNavItem>
              <IconBox href={'/User/User'}>

                <MyProfile />

                <p>my</p>
              </IconBox>
            </BottomNavItem>
          </BottomNavList>
        </MobileBottomNavLayout>
      )}
    </>
  );
};

export default MobileBottomNav;
