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
              <IconBox href={'/home/Home'}>
                <Image src={'/🦆 icon _cloud_.svg'} alt="icon" fill />
              </IconBox>
            </BottomNavItem>
            <BottomNavItem>
              <IconBox href={'/home/Home'}>
                <Image src={'/🦆 icon _image_.svg'} alt="icon" fill />
              </IconBox>
            </BottomNavItem>
            <BottomNavItem>
              <IconBox href={'/home/Home'}>
                <Image src={'/🦆 icon _star_.svg'} alt="icon" fill />
              </IconBox>
            </BottomNavItem>
            <BottomNavItem>
              <IconBox href={'/home/Home'}>
                <Image src={'/🦆 icon _star_.svg'} alt="icon" fill />
              </IconBox>
            </BottomNavItem>
          </BottomNavList>
        </MobileBottomNavLayout>
      )}
    </>
  );
};

export default MobileBottomNav;
