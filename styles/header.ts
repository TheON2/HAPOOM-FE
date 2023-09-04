import styled from 'styled-components';
import Link from 'next/link';

type HeaderProps = {
  $sticky: string;
};

const NONE_ROUTE_COLOR = '#7DC1FF';
const ROUTE_ACTION_COLOR = '#2790F6';

export const HeaderLayout = styled.header<HeaderProps>`
  width: 100%;
  height: 70px;
  padding: 0 24px;
  /* position: fixed; */
  position: sticky;
  z-index: 150;
  top: 0;
  background: var(--header-bg-color);
  backdrop-filter: blur(1px);
  border-bottom: var(--header-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  color: var(--button-hover-color);
  font-weight: 700;
  h1 {
    /* color: #2797ff; */
    color: var(--logo-color);
  }
  .active {
    color: var(--header-nav-active-color);
  }

  @media screen and (min-width: 768px) {
    backdrop-filter: blur(5px);
  }
  .center {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header-icon {
    width: 36px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background-color: #00000020;
      border-radius: 50%;
    }
  }
  .search {
    color: var(--button-hover-color);
    &.active {
      color: var(--header-nav-active-color);
      path {
        stroke: ${(props) =>
          props.$sticky ? '#fff' : 'var(--header-nav-active-color)'};
      }
    }
  }
  .edit {
    color: var(--button-hover-color);
    font-weight: 700;
    &.active {
      color: var(--header-nav-active-color);
      path {
        fill: ${(props) => (props.$sticky ? '#fff' : 'var(--primary-color)')};
      }
    }
  }
  &.trend {
    position: fixed;
    background: none;
    backdrop-filter: blur(0px);
    border-bottom: var(--header-bg-color);
    color: ${(props) =>
      props.$sticky
        ? 'var(--button-hover-color)'
        : 'var(--header-nav-sticky-color)'};
    /* path {
      fill: ${(props) => (props.$sticky ? ROUTE_ACTION_COLOR : '#C6E2FC')};
    } */
    h1 {
      color: ${(props) => (props.$sticky ? 'var(--logo-color)' : '#fff')};
    }
    .active {
      color: ${(props) =>
        props.$sticky ? 'var(--header-nav-active-color)' : '#fff'};
    }

    .search {
      color: ${(props) =>
        props.$sticky
          ? 'var(--button-hover-color)'
          : 'var(--header-nav-sticky-color)'};
    }
    .edit {
      color: ${(props) =>
        props.$sticky
          ? 'var(--button-hover-color)'
          : 'var(--header-nav-sticky-color)'};
    }
  }
`;

export const LogoBox = styled(Link)<HeaderProps>`
  /* width: 20%; */
  /* height: 100%; */
  display: flex;
  justify-content: center;
  align-items: center;

  /* border: 1px solid #000; */
  h1 {
    font-size: 25px;
    font-weight: 900;
  }
`;

type Props = {
  $isSearch: boolean;
};

export const SearchInputBox = styled.div<Props>`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 30%;
  height: 50px;
  input {
    width: 100%;
    height: 100%;
    border-radius: 25px;
    border: none;
    background: none;
    border: 1px solid black;
  }
  @media screen and (max-width: 1260px) {
    position: relative;
    left: 0;
    transform: translateX(0);
    width: 50%;

    input {
      position: relative;
      padding: 12px 20px;
      left: ${(props) => (props.$isSearch ? '0' : '100%')};
      width: ${(props) => (props.$isSearch ? '100%' : '0')};
      opacity: ${(props) => (props.$isSearch ? '1' : '0')};
      transition: all 0.3s ease-in-out;
    }
  }
`;

export const IconBox = styled.button`
  width: 36px;
  height: 36px;
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  img {
    object-fit: contain;
  }
`;
export const AccountActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  width: 80%;
  @media screen and (max-width: 786px) {
    display: none;
  }
`;
export const GoWriteLink = styled(Link)`
  width: 80px;
  height: 80px;
  padding: 12px 18px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 10vh;
  right: 24px;
  background-color: var(--search-bg-color);
  z-index: 114;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16);
  svg {
    transform: scale(0.8) translate(2px, -1px);
  }
  &:hover {
    background-color: #d4eaff;
  }
  &:active {
    background-color: #7dc1ff;
  }
  @media screen and (max-width: 786px) {
    display: none;
  }
`;
export const ProfileButton = styled.button<HeaderProps>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  border: ${(props) =>
    props.$sticky ? '2px solid var(--primary-color)' : '2px solid #C0D8EF'};
  background-color: ${(props) =>
    props.$sticky ? 'var(--primary-opcity-color)' : '#C0D8EF70'};
  cursor: pointer;
  img {
    object-fit: cover;
  }
  svg {
    width: 70%;
    height: auto;
    object-fit: contain;
  }
`;

export const AuthButtonBox = styled.div`
  display: flex;
  align-items: center;
  /* gap: 8px; */
  font-weight: 700;
  button {
    border: none;
    background: none;
  }
  a {
    padding: 20px 8px;
    &:hover {
      color: var(--primary-hover-color);
    }
  }
  /* .active {
    color: #2797ff;
  } */
`;

export const MobileBox = styled.div`
  display: none;
  @media screen and (max-width: 786px) {
    display: flex;
  }
`;
