import React, { useEffect, useRef, useState } from 'react';
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
const HamburgerButton = styled.button`
  width: 28px;
  height: 28px;
  padding: 3px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: none;
  border: none;
  position: relative;
  span {
    width: 100%;
    height: 3px;
    background: #000;
    transition: all 0.3s ease-in-out;
  }
  &.active {
    span:nth-child(1) {
      position: absolute;
      top: 50%;
      left: 2px;
      transform: rotate(-45deg) translateY(-50%);
    }
    span:nth-child(2) {
      display: none;
    }
    span:nth-child(3) {
      position: absolute;
      top: 50%;
      transform: rotate(45deg) translateY(-50%);
    }
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
        <LogoBox href={'/'}>
          <Image
            src={'/inflearn.jpg'}
            alt="logo"
            fill
            loading="eager"
            sizes="(max-width: 1440px) 280px"
            placeholder="blur"
            blurDataURL={'/inflearn.jpg'}
          />
        </LogoBox>
        {isMobile ? (
          <>
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
          </>
        ) : null}
        {!isMobile ? (
          <MobileBox>
            <button
              style={{
                width: `32px`,
                height: `32px`,
                position: `relative`,
                background: `none`,
                border: `none`,
              }}
            >
              <Image
                src={'/🦆 icon _cloud_.svg'}
                alt="prpfile image"
                fill
                loading="eager"
                sizes="(max-width: 786px) 28px"
                placeholder="blur"
                blurDataURL={'/🦆 icon _cloud_.svg'}
              />
            </button>
            <HamburgerButton
              onClick={onClickShowMenuHandler}
              className={isShowMenu ? 'active' : ''}
            >
              <span></span>
              <span></span>
              <span></span>
            </HamburgerButton>
          </MobileBox>
        ) : null}
      </HeaderLayout>
      {isShowMenu && <SideNav />}
    </>
  );
};

export default Header;
