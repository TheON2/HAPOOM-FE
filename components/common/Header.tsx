import React, { ReactNode, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import SideNav from './SideNav';
import Link from 'next/link';
import {
  HeaderLayout,
  LogoBox,
  SearchInputBox,
  IconBox,
  AccountActionsContainer,
  GoWriteLink,
  ProfileButton,
  AuthButtonBox,
  MobileBox,
} from '@/styles/header';
import useInput from '@/hooks/useInput';
import IconButton from './IconButton';

const HamburgerButton = styled.button`
  width: 36px;
  height: 36px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  background: none;
  border: none;
  cursor: pointer;
  span {
    width: 18px;
    height: 2px;
    margin-bottom: 5px;
    background: #000;
    transition: all 0.3s ease-in-out;
  }
`;

const Header = () => {
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(true);
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);
  const [search, onChangeSearchHandler, setSearch] = useInput('');
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const onClickSearchIconHandler = () => [setIsSearch(!isSearch)];
  const onClickShowMenuHandler = () => {
    setIsShowMenu(!isShowMenu);
  };

  // const handleResize = () => {
  //   if (window.innerWidth <= 768) {
  //     setIsMobile(false);
  //   } else {
  //     setIsMobile(true);
  //   }
  // };

  // useEffect(() => {
  //   handleResize();
  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

  return (
    <>
      <HeaderLayout>
        <LogoBox href={'/'}>
          <Image
            src={'/inflearn.jpg'}
            alt="logo"
            width={200}
            height={50}
            loading="eager"
          />
        </LogoBox>
        <AccountActionsContainer>
          <SearchInputBox $isSearch={isSearch}>
            <input
              type="text"
              value={search}
              onChange={onChangeSearchHandler}
            />
            <IconBox onClick={onClickSearchIconHandler}>
              <Image
                src={'/🦆 icon _star_.svg'}
                alt="icon"
                fill
                loading="eager"
                sizes="(max-width: 1440px) 31px"
                placeholder="blur"
                blurDataURL={'/🦆 icon _star_.svg'}
              />
            </IconBox>
          </SearchInputBox>
          <GoWriteLink href={'/post/Write'}>글쓰기</GoWriteLink>
          {!isAuth ? (
            <>
              <AuthButtonBox>
                <Link href={'/auth/SignIn'}>로그인</Link>|
                <Link href={'/auth/SignUp'}>회원가입</Link>
              </AuthButtonBox>
              <ProfileButton onClick={onClickShowMenuHandler}>
                <Image
                  src={'/inflearn.jpg'}
                  alt="prpfile image"
                  fill
                  sizes="(max-width: 1440px) 51px"
                  placeholder="blur"
                  blurDataURL={'/inflearn.jpg'}
                />
              </ProfileButton>
            </>
          ) : (
            <ProfileButton onClick={onClickShowMenuHandler}>
              <Image
                src={'/inflearn.jpg'}
                alt="prpfile image"
                fill
                loading="eager"
                sizes="(max-width: 1440px) 50px"
                placeholder="blur"
                blurDataURL={'/inflearn.jpg'}
              />
            </ProfileButton>
          )}
        </AccountActionsContainer>

        <MobileBox>
          <IconButton>
            <Image
              src={'/🦆 icon _cloud_.svg'}
              alt="prpfile image"
              width={28}
              height={28}
              loading="eager"
            />
          </IconButton>
          <HamburgerButton
            onClick={onClickShowMenuHandler}
            className={isShowMenu ? 'active' : ''}
          >
            <span></span>
            <span></span>
            <span></span>
          </HamburgerButton>
        </MobileBox>
      </HeaderLayout>
      {isShowMenu && <SideNav />}
    </>
  );
};

export default Header;
