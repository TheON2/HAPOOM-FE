import styled from 'styled-components';
import Link from 'next/link';

type HeaderProps = {
  $sticky: string;
};

export const HeaderLayout = styled.header<HeaderProps>`
  width: 100%;
  height: 70px;
  padding: 0 24px;
  /* position: fixed; */
  position: ${(props) => (props.$sticky ? 'fixed' : 'sticky')};
  z-index: 15;
  top: 0;
  /* background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(255, 255, 255, 0) 100%
  ); */
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  color: #fff;
  @media screen and (max-width: 1260px) {
    padding: 0 24px;
  }
  /* @media screen and (max-width: 786px) {
    position: fixed;
    background: none;
  } */
  .search-icon {
    width: 36px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      width: 70%;
      height: 70%;
    }
  }
`;

export const LogoBox = styled(Link)`
  /* width: 20%; */
  height: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  /* border: 1px solid #000; */
  h1 {
    font-size: 24px;
    color: #fff;
    font-weight: 900;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
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
  gap: 24px;
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
  bottom: 20vh;
  right: 60px;
  background-color: #fff;
  z-index: 14;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  svg {
    transform: scale(0.8) translate(2px, -1px);
  }
  &:hover {
    background-color: #d4eaff;
  }
  &:active {
    background-color: #7dc1ff;
  }

`;
export const ProfileButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  border: none;
  cursor: pointer;
  img {
    object-fit: cover;
  }
`;

export const AuthButtonBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  button {
    border: none;
    background: none;
  }
`;

export const MobileBox = styled.div`
  display: none;
  @media screen and (max-width: 786px) {
    display: flex;
  }
`;
