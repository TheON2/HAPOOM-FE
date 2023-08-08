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
                <Image
                  src={'/🦆 icon _cloud_.svg'}
                  alt="icon"
                  width={50}
                  height={50}
                  loading="eager"
                />
                <p>home</p>
              </IconBox>
            </BottomNavItem>
            <BottomNavItem>
              <IconBox href={'/'}>
                <Image
                  src={'/🦆 icon _image_.svg'}
                  alt="icon"
                  width={50}
                  height={50}
                  loading="eager"
                />
                <p>home</p>
              </IconBox>
            </BottomNavItem>
            <BottomNavItem>
              <IconBox href={'/post/Write'}>
                <Image
                  src={'/🦆 icon _star_.svg'}
                  alt="icon"
                  width={50}
                  height={50}
                  loading="eager"
                />
                <p>home</p>
              </IconBox>
            </BottomNavItem>
            <BottomNavItem>
              <IconBox href={'/home/Home'}>
                <Image
                  src={'/🦆 icon _star_.svg'}
                  alt="icon"
                  width={50}
                  height={50}
                  loading="eager"
                />
                <p>home</p>
              </IconBox>
            </BottomNavItem>
          </BottomNavList>
        </MobileBottomNavLayout>
      )}
    </>
  );
};

export default MobileBottomNav;
