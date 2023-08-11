import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
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
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { userLogOut } from '@/api/user';
import { LOGOUT_USER } from '@/redux/reducers/userSlice';
import { Hamburger, Bell } from '@/components/common/SVG';
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
    background: #fff;
    transition: all 0.3s ease-in-out;
    &:nth-child(3) {
      margin: 0;
    }
  }
`;

const Header = ({ sticky }: any) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: logOut_mutate } = useMutation(userLogOut, {
    onSuccess: () => {
      queryClient.invalidateQueries('user');
      dispatch(LOGOUT_USER());
      router.push('/');
    },
  });

  const onLogOut = useCallback(() => {
    logOut_mutate();
  }, [logOut_mutate]);

  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(true);
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);
  const [search, onChangeSearchHandler, setSearch] = useInput('');
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const homeIconColor = sticky ? '#fff' : '#CBCBCB';
  const homeLogoColor = sticky ? '#fff' : '#0084FF';
  console.log(homeIconColor);
  const onClickSearchIconHandler = () => [setIsSearch(!isSearch)];
  const onClickShowMenuHandler = () => {
    setIsShowMenu(!isShowMenu);
  };

  const handleLogoClick = () => {
    if (localStorage.getItem('update') && localStorage.getItem('updateId')) {
      localStorage.removeItem('update');
      localStorage.removeItem('updateId');
    }

    router.push('/');
  };

  return (
    <>
      <HeaderLayout sticky={sticky}>
        <LogoBox href={'/'} onClick={handleLogoClick}>
          <h1 style={{ color: homeLogoColor }}>HAPOOM</h1>
          {/* <Image
            src={'/inflearn.jpg'}
            alt="logo"
            width={200}
            height={50}
            loading="eager"
          /> */}
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
                loading="eager"
                width={50}
                height={50}
              />
            </IconBox>
          </SearchInputBox>
          <GoWriteLink href={'/post/Write'}>글쓰기</GoWriteLink>
          {!isAuth ? (
            <>
              <AuthButtonBox>
                <Link href={'/auth/SignIn'}>로그인</Link>|
                <Link href={'/auth/SignUp'}>회원가입</Link>
                <a href="#" onClick={onLogOut}>
                  로그아웃
                </a>
              </AuthButtonBox>
              <ProfileButton onClick={onClickShowMenuHandler}>
                <Image
                  src={'/inflearn.jpg'}
                  alt="prpfile image"
                  loading="eager"
                  width={50}
                  height={50}
                />
              </ProfileButton>
            </>
          ) : (
            <ProfileButton onClick={onClickShowMenuHandler}>
              <Image
                src={'/inflearn.jpg'}
                alt="prpfile image"
                loading="eager"
                width={50}
                height={50}
              />
            </ProfileButton>
          )}
        </AccountActionsContainer>
        <MobileBox>
          <IconButton>
            <Bell fillColor={homeIconColor} />
          </IconButton>
          <IconButton onClick={onClickShowMenuHandler}>
            <Hamburger fillColor={homeIconColor} />
          </IconButton>
          {/* <HamburgerButton className={isShowMenu ? 'active' : ''}>
            <span></span>
            <span></span>
            <span></span>
          </HamburgerButton> */}
        </MobileBox>
      </HeaderLayout>
      {isShowMenu && (
        <SideNav setIsShowMenu={setIsShowMenu} isShowMenu={isShowMenu} />
      )}
    </>
  );
};

export default Header;
