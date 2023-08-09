import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import {
  SideNavLayout,
  SideNavMenuList,
  SideNavMenuItem,
  SubMenuList,
} from '@/styles/navbar';
import IconButton from './IconButton';
interface SubmenuProps {
  children: React.ReactNode;
}

import AccordianMenu, { AccordianTab } from './AccordianMenu';
import Image from 'next/image';
import Themes from '@/components/Setting/Themes';
const OverlayBox = styled.div`
  width: 100%;
  height: 100vh;
  background: #000;
  opacity: 0.4;
  position: fixed;
  top: 0;
  z-index: 19;
  cursor: pointer;
`;

const ThemesBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  button {
    padding: 10px 0 8px;
    border-radius: 24px;
    font-size: 12px;
    border: none;
    &:nth-child(1) {
      background-color: #fff;
      border: 1px solid #5f7ba6;
    }
    &:nth-child(2) {
      background-color: #132b4f;
      color: #fff;
    }
    &:nth-child(3) {
      background-color: #000;
      color: #fff;
    }
  }
`;

const NavbarTab = styled(Link)`
  width: 100%;
  padding: 20px 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 700;
  color: #8995a7;
`;

const ProfileBox = styled.div`
  width: 100%;
  height: 80px;
`;

const IconBox = styled.div`
  width: 100%;
  height: 54px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

type sideNavProps = {
  isShowMenu: any;
  setIsShowMenu: any;
};

const SideNav = ({ isShowMenu, setIsShowMenu }: sideNavProps) => {
  const onClickOverlayHandler = () => {
    setIsShowMenu(!isShowMenu);
  };
  return (
    <>
      <OverlayBox onClick={onClickOverlayHandler}></OverlayBox>
      <SideNavLayout>
        <SideNavMenuList>
          <IconBox>
            <IconButton>
              <Image
                src={'/🦆 icon _cloud_.svg'}
                alt={'icon'}
                width={26}
                height={26}
              />
            </IconButton>
          </IconBox>
          <ProfileBox></ProfileBox>
          <NavbarTab href="/setting/Setting">
            My page
            <Image
              src={'/🦆 icon _cloud_.svg'}
              alt={'icon'}
              width={20}
              height={20}
            />
          </NavbarTab>
          <Themes />
        </SideNavMenuList>
        <IconBox>
          <IconButton>
            <Image
              src={'/🦆 icon _cloud_.svg'}
              alt={'icon'}
              width={26}
              height={26}
            />
          </IconButton>
        </IconBox>
      </SideNavLayout>
    </>
  );
};

export default SideNav;
