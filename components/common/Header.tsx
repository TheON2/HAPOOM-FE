import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import SideNav from './SideNav';
const HeaderLayout = styled.header`
  width: 100%;
  height: 10vh;
  padding: 0 20px;
  position: sticky;
  z-index: 20;
  top: 0;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

const LogoBox = styled.div`
  width: 20%;
  height: 50px;
  position: relative;
  border: 1px solid #000;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

type Props = {
  isSearch: boolean;
};

const SearchInputBox = styled.div<Props>`
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
      left: ${(props) => (props.isSearch ? '0' : '100%')};
      width: ${(props) => (props.isSearch ? '100%' : '0')};
      opacity: ${(props) => (props.isSearch ? '1' : '0')};
      transition: all 0.3s ease-in-out;
    }
  }
`;

const IconBox = styled.div`
  width: 35px;
  height: 35px;
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  border-radius: 50%;
  overflow: hidden;
  img {
    object-fit: cover;
  }
`;
const AccountActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  width: 80%;
`;
const GoWriteButton = styled.button`
  width: 100px;
  padding: 12px 18px;
  /* height: 50px; */
  border-radius: 25px;
`;
const ProfileBox = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  img {
    object-fit: cover;
  }
`;

const AuthButtonBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  button {
    border: none;
    background: none;
  }
`;

const MobileBox = styled.div`
  display: flex;
  gap: 12px;
  button {
    /* background: #000; */
  }
`;

const Header = () => {
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(true);
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);
  const onClickSearchIconHandler = () => [setIsSearch(!isSearch)];
  const onClickShowMenuHandler = () => {
    setIsShowMenu(!isShowMenu);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(false);
      } else {
        setIsMobile(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <HeaderLayout>
        <LogoBox>
          <Image src={'/20230804_105922.jpeg'} alt="logo" fill />
        </LogoBox>
        {isMobile ? (
          <>
            <AccountActionsContainer>
              <SearchInputBox isSearch={isSearch}>
                <input type="text" />
                <IconBox onClick={onClickSearchIconHandler}>
                  <Image src={'/example.jpg'} alt="icon" fill />
                </IconBox>
              </SearchInputBox>
              <GoWriteButton>글쓰기</GoWriteButton>
              <AuthButtonBox>
                <button>로그인</button>|<button>회원가입</button>
              </AuthButtonBox>
              <ProfileBox onClick={onClickShowMenuHandler}>
                <Image src={'/example.jpg'} alt="prpfile image" fill />
              </ProfileBox>
            </AccountActionsContainer>
          </>
        ) : null}
        {!isMobile ? (
          <MobileBox>
            <button>알림</button>
            <button onClick={onClickShowMenuHandler}>햄버거</button>
          </MobileBox>
        ) : null}
      </HeaderLayout>
      {isShowMenu && <SideNav />}
    </>
  );
};

export default Header;
