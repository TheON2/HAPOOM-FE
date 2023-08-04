import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
const SideNavLayout = styled.nav`
  position: fixed;
  right: 0;
  width: 30%;
  height: calc(100vh - 10vh);
  padding: 0 0 50px 0;
  background-color: #fff;
  z-index: 20;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    width: 50%;
  }
  button {
    cursor: pointer;
  }
`;

const SideNavMenuList = styled.ul`
  width: 100%;
  /* padding: 20px 30px; */
  border: 1px solid #000;
`;

const SideNavMenuItem = styled.li`
  width: 100%;
  /* padding: 20px 30px; */
  border: 1px solid #000;
  &.none-padding {
    padding: 0;
  }
  button {
    width: 100%;
    height: 100%;
    padding: 20px 30px;
    text-align: start;
  }
  a {
    display: block;
    width: 100%;
    padding: 20px 30px;
  }
`;

const SubMenuList = styled.ul`
  width: 100%;
  /* padding: 20px 30px; */
  li {
    width: 100%;
    /* padding: 20px 30px; */
    border: 1px solid #000;
  }
`;

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
