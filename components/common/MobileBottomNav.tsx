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
import { useRouter } from 'next/router';

type mobileBottomNavProps = {
  onClickEvent: () => void;
};

const BOTTOM_NAV = [
  { icon: Home, text: 'home', route: '/' },
  { icon: Search, text: 'search', route: '/search/search' },
  { icon: Upload, text: 'upload', route: '/post/Write' },
  { icon: MyProfile, text: 'my', route: '/User/User' },
];

type onClickProps = {
  active: number;
};

const DISTANCE = '100% - 48px/4';

const ActiveBar = styled.span<onClickProps>`
  width: calc((100% - 48px) / 4);
  height: 5px;
  border-radius: 4px 4px 0 0;
  position: absolute;
  background-color: #0084ff;
  top: 0;
  left: 24px;
  transform: ${(props) => `translate( ${props.active * 100}%,  -100%)`};
  transition: all 0.3s ease-in-out;
`;

const MobileBottomNav = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [active, setActive] = useState<number>(0);
  const router = useRouter();

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

  const onClickNavIconHandler = (idx: number, route: string) => {
    // alert('click');
    router.push(route);
    setActive(idx);
  };

  return (
    <>
      {isMobile && (
        <MobileBottomNavLayout>
          <BottomNavList>
            {BOTTOM_NAV.map((nav, idx) => {
              const { icon: Icon, text } = nav;
              return (
                <BottomNavItem key={idx}>
                  <IconBox
                    onClick={() => onClickNavIconHandler(idx, nav.route)}
                    className={active === idx ? 'active' : ''}
                  >
                    <Icon />
                    <p>{text}</p>
                  </IconBox>
                </BottomNavItem>
              );
            })}
          </BottomNavList>
          <ActiveBar active={active}></ActiveBar>
        </MobileBottomNavLayout>
      )}
    </>
  );
};

export default MobileBottomNav;
