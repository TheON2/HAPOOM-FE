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
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { userLogOut } from '@/api/user';
import { LOGOUT_USER, UserState } from '@/redux/reducers/userSlice';
import { SearchIcon, Bell, EditIcon } from '@/components/common/SVG';
import { setCookie } from 'nookies';
import ProfileImage from '@/components/common/ProfileImage';
import { RootState } from '@/redux/config/configStore';
const Header = ({ $sticky }: any) => {
  const dispatch = useDispatch();
  const { user }: { user: UserState['user'] } = useSelector(
    (state: RootState) => state.user
  );
  const router = useRouter();
  const queryClient = useQueryClient();
  // const { mutate: logOut_mutate } = useMutation(userLogOut, {
  //   onSuccess: () => {
  //     queryent.invalidateQueries('user');
  //     dispatch(LOGOUT_USER());
  //     router.push('/');
  //   },
  // });

  // const onLogOut = useCallback(() => {
  //   logOut_mutate();
  // }, [logOut_mutate]);

  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);

  const [isAuth, setIsAuth] = useState<boolean>(false);

  const onClickShowMenuHandler = () => {
    router.push(`/User/${user.email}`);
  };

  const handleLogoClick = () => {
    router.push('/');
  };

  const goToWritePage = () => {
    setCookie(null, 'update', '1', { path: '/' });
    setCookie(null, 'updateId', '0', { path: '/' });
    router.push('/post/Write'); // 글쓰기 페이지로 이동
  };

  useEffect(() => {
    if (user.email !== '') {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  return (
    <>
      <HeaderLayout $sticky={$sticky}>
        <LogoBox href={'/'} onClick={handleLogoClick} $sticky={$sticky}>
          <h1>HAPOOM</h1>
        </LogoBox>
        <AccountActionsContainer>
          <Link href={'/search'} className="search-icon">
            <SearchIcon fillColor={$sticky ? '#fff' : '#2797FF'} />
          </Link>
          <GoWriteLink onClick={goToWritePage} href={'/post/Write'}>
            <EditIcon />
          </GoWriteLink>
          {!isAuth ? (
            <AuthButtonBox>
              <Link href={'/auth/SignIn'}>로그인</Link>|
              <Link href={'/auth/SignUp'}>회원가입</Link>
              {/* <Link href={'/record/2'}>레코드 테스트</Link>
              <a href="#" onClick={onLogOut}>
                로그아웃
              </a> */}
            </AuthButtonBox>
          ) : null}
          <ProfileButton onClick={onClickShowMenuHandler}>
            <ProfileImage
              preset={user?.preset || 5}
              userImage={user?.userImage || ''}
              loading="eager"
            />
          </ProfileButton>
        </AccountActionsContainer>
        <MobileBox>
          <IconButton>
            <Bell fillColor={$sticky ? '#fff' : '#2797FF'} />
          </IconButton>
        </MobileBox>
      </HeaderLayout>
      {isShowMenu && (
        <SideNav setIsShowMenu={setIsShowMenu} isShowMenu={isShowMenu} />
      )}
    </>
  );
};

export default Header;
