import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import {
  SideNavLayout,
  SideNavMenuList,
  SideNavMenuItem,
  SubMenuList,
} from '@/styles/navbar';

interface SubmenuProps {
  children: React.ReactNode;
}
const SubMenu = ({ children }: SubmenuProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <button onClick={handleClick}>
        테마 선택
        <span className="right">
          {isOpen ? (
            <i className="fa fa-caret-down"></i>
          ) : (
            <i className="fa fa-caret-up"></i>
          )}
        </span>
      </button>
      {isOpen && <SubMenuList>{children}</SubMenuList>}
    </>
  );
};

const SideNav = () => {
  return (
    <SideNavLayout>
      <SideNavMenuList>
        <SideNavMenuItem>
          <Link href="/home/Home">마이페이지</Link>
        </SideNavMenuItem>
        <SideNavMenuItem>
          <Link href="/home/Home">유저페이지</Link>
        </SideNavMenuItem>
        <SideNavMenuItem className="none-padding">
          <SubMenu>
            <li>
              <button>아침</button>
            </li>
            <li>
              <button>점심</button>
            </li>
            <li>
              <button>저녁</button>
            </li>
          </SubMenu>
        </SideNavMenuItem>
        <SideNavMenuItem>
          <Link href="/home/Home">무언가 추가된다면</Link>
        </SideNavMenuItem>
      </SideNavMenuList>
      <button>로그아웃</button>
    </SideNavLayout>
  );
};

export default SideNav;
