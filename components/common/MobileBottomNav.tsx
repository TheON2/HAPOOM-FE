import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
const MobileBottomNavLayout = styled.nav`
  position: fixed;
  padding: 20px 30px;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  /* height: 10vh; */
  background: #fff;
  border-top: 1px solid #000;
  z-index: 30;
`;

const BottomNavList = styled.ul`
  max-width: 500px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const BottomNavItem = styled.li`
  width: 50px;
  height: 50px;
`;
const IconBox = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
  img {
    object-fit: cover;
  }
`;

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
                <Image src={'/example.jpg'} alt="icon" fill />홈
              </IconBox>
            </BottomNavItem>
            <BottomNavItem>
              <IconBox href={'/home/Home'}>
                <Image src={'/example.jpg'} alt="icon" fill />홈
              </IconBox>
            </BottomNavItem>
            <BottomNavItem>
              <IconBox href={'/home/Home'}>
                <Image src={'/example.jpg'} alt="icon" fill />홈
              </IconBox>
            </BottomNavItem>
            <BottomNavItem>
              <IconBox href={'/home/Home'}>
                <Image src={'/example.jpg'} alt="icon" fill />홈
              </IconBox>
            </BottomNavItem>
          </BottomNavList>
        </MobileBottomNavLayout>
      )}
    </>
  );
};

export default MobileBottomNav;
