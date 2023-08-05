import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import SideNav from './SideNav';
import Link from 'next/link';
import {HeaderLayout, LogoBox, SearchInputBox, IconBox, AccountActionsContainer, GoWriteLink, ProfileBox, AuthButtonBox, MobileBox} from '@/styles/header'

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
        <LogoBox href={'/home/Home'}>
          <Image src={'/inflearn.jpg'} alt="logo" fill />
        </LogoBox>
        {isMobile ? (
          <>
            <AccountActionsContainer>
              <SearchInputBox $isSearch={isSearch}>
                <input type="text" />
                <IconBox onClick={onClickSearchIconHandler}>
                  <Image src={'/🦆 icon _star_.svg'} alt="icon" fill />
                </IconBox>
              </SearchInputBox>
              <GoWriteLink href={'/home/Home'}>글쓰기</GoWriteLink>
              <AuthButtonBox>
                <Link href={'/auth/SignIn'}>로그인</Link>|
                <Link href={'/auth/SignUp'}>회원가입</Link>
              </AuthButtonBox>
              <ProfileBox onClick={onClickShowMenuHandler}>
                <button>
                  <Image src={'/inflearn.jpg'} alt="prpfile image" fill />
                </button>
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
