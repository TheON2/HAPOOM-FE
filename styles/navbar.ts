import styled from 'styled-components';
import Link from 'next/link';

export const MobileBottomNavLayout = styled.nav`
  position: fixed;
  padding: 20px 30px;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  background: #fff;
  border-top: 1px solid #000;
  z-index: 30;
`;

export const BottomNavList = styled.ul`
  max-width: 500px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const BottomNavItem = styled.li`
  width: 50px;
  height: 50px;
`;
export const IconBox = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
  img {
    object-fit: contain;
  }
`;

//side menu style
export const SideNavLayout = styled.nav`
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

export const SideNavMenuList = styled.ul`
  width: 100%;
  border: 1px solid #000;
`;

export const SideNavMenuItem = styled.li`
  width: 100%;
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

export const SubMenuList = styled.ul`
  width: 100%;
  li {
    width: 100%;
    border: 1px solid #000;
  }
`;
