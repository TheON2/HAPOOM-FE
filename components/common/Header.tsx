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
import { SearchIcon, Bell, EditIcon, Cloud } from '@/components/common/SVG';
import { setCookie } from 'nookies';
import ProfileImage from '@/components/common/ProfileImage';
import { RootState } from '@/redux/config/configStore';
import Modal from './Modal';
const Header = ({ $sticky }: any) => {
  const { user }: { user: UserState['user'] } = useSelector(
    (state: RootState) => state.user
  );
  const router = useRouter();

  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);

  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalMessge, setModalMessge] = useState<any>({
    actionText: '',
    modalMessge: '',
    onClickEvent: '',
  });
  const onClickShowMenuHandler = () => {
    router.push(`/User/${user.email}`);
  };

  const handleLogoClick = () => {
    router.push('/');
  };
  const LoginHandler = () => {
    setModalMessge({
      actionText: '확인',
      modalMessge: '로그인이 필요한 서비스입니다. 로그인 하시겠습니까?',
      onClickEvent: () => router.push('/auth/SignIn'),
    });
    setIsOpen(!isOpen);
  };
  const goToWritePage = () => {
    setCookie(null, 'update', '1', { path: '/' });
    setCookie(null, 'updateId', '0', { path: '/' });
    router.push('/post/Write'); // 글쓰기 페이지로 이동
  };

  useEffect(() => {
    if (user.email !== null) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [user.email]);
  console.log(isAuth);
  return (
    <>
      <HeaderLayout $sticky={$sticky}>
        <div className="center">
          <LogoBox href={'/'} onClick={handleLogoClick} $sticky={$sticky}>
            <h1>HAPOOM</h1>
          </LogoBox>
          <AccountActionsContainer>
            <Link href={'/search'} className="search-icon">
              <SearchIcon fillColor={$sticky ? '#fff' : '#2797FF'} />
            </Link>

            {!isAuth ? (
              <>
                <AuthButtonBox>
                  <Link href={'/feed/Feed'}>피드</Link>|
                  <Link href={'/'}>트랜드</Link>|
                  <Link href={'/auth/SignIn'}>로그인</Link>|
                  <Link href={'/auth/SignUp'}>회원가입</Link>
                </AuthButtonBox>
                <ProfileButton onClick={LoginHandler} $sticky={$sticky}>
                  <Cloud />
                </ProfileButton>
              </>
            ) : (
              <>
                <AuthButtonBox>
                  <Link href={'/feed/Feed'}>피드</Link>|
                  <Link href={'/'}>트랜드</Link>
                </AuthButtonBox>
                <ProfileButton
                  onClick={onClickShowMenuHandler}
                  $sticky={$sticky}
                >
                  <ProfileImage
                    preset={user?.preset || 5}
                    userImage={user?.userImage || ''}
                    loading="eager"
                  />
                </ProfileButton>
              </>
            )}
          </AccountActionsContainer>
          <MobileBox>
            <IconButton>
              <Bell fillColor={$sticky ? '#fff' : '#2797FF'} />
            </IconButton>
          </MobileBox>
        </div>
      </HeaderLayout>
      <GoWriteLink onClick={goToWritePage} href={'/post/Write'}>
        <EditIcon />
      </GoWriteLink>
      {isShowMenu && (
        <SideNav setIsShowMenu={setIsShowMenu} isShowMenu={isShowMenu} />
      )}
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        actionText={modalMessge.actionText}
        onClickEvent={modalMessge.onClickEvent}
      >
        로그인 후 이용할 수 있는 서비스 입니다.
        <br /> 로그인 하시겠습니까?
      </Modal>
    </>
  );
};

export default Header;
