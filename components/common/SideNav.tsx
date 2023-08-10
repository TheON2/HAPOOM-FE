import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import {
  SideNavLayout,
  SideNavMenuList,
  SideNavMenuItem,
  SubMenuList,
} from '@/styles/navbar';
import IconButton from './IconButton';
interface SubmenuProps {
  children: React.ReactNode;
}

import AccordianMenu, { AccordianTab } from './AccordianMenu';
import Image from 'next/image';
import Themes from '@/components/Setting/Themes';
import Profile from '@/components/Setting/Profile';
import { useSelector } from 'react-redux';
import { AUTH_USER, UserState, UserResponse } from '@/redux/reducers/userSlice';
import { RootState } from '@/redux/config/configStore';

import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { userLogOut } from '@/api/user';
import { LOGOUT_USER } from '@/redux/reducers/userSlice';

const OverlayBox = styled.div`
  width: 100%;
  height: 100vh;
  background: #000;
  opacity: 0.4;
  position: fixed;
  top: 0;
  z-index: 19;
  cursor: pointer;
`;

const NavbarTab = styled(Link)`
  width: 100%;
  padding: 20px 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 700;
  color: #8995a7;
`;

const ProfileBox = styled.div`
  width: 100%;
  height: 80px;
`;

const IconBox = styled.div`
  width: 100%;
  height: 54px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

type sideNavProps = {
  isShowMenu: any;
  setIsShowMenu: any;
};

const SideNav = ({ isShowMenu, setIsShowMenu }: sideNavProps) => {
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
    alert('로그아웃 되었습니다');
  }, [logOut_mutate]);

  const onClickOverlayHandler = () => {
    setIsShowMenu(!isShowMenu);
  };
  const { user }: { user: UserState['user'] } = useSelector(
    (state: RootState) => state.user
  );

  return (
    <>
      <OverlayBox onClick={onClickOverlayHandler}></OverlayBox>
      <SideNavLayout>
        <SideNavMenuList>
          <IconBox>
            <IconButton>
              <Image
                src={'/🦆 icon _cloud_.svg'}
                alt={'icon'}
                width={26}
                height={26}
              />
            </IconButton>
          </IconBox>
          <Profile
            userImage={user?.userImage || ''}
            preset={user?.preset || 5}
            nickname={user?.nickName || ''}
          />

          {user?.email !== null ? (
            <NavbarTab href="/setting/Setting">
              My page
              <Image
                src={'/🦆 icon _cloud_.svg'}
                alt={'icon'}
                width={20}
                height={20}
              />
            </NavbarTab>
          ) : (
            <>
              <NavbarTab href="/auth/SignIn">
                Login
                <Image
                  src={'/🦆 icon _cloud_.svg'}
                  alt={'icon'}
                  width={20}
                  height={20}
                />
              </NavbarTab>
              <NavbarTab href="/auth/SignUp">
                Register
                <Image
                  src={'/🦆 icon _cloud_.svg'}
                  alt={'icon'}
                  width={20}
                  height={20}
                />
              </NavbarTab>
            </>
          )}
          <Themes />
        </SideNavMenuList>
        <IconBox>
          <IconButton onClick={onLogOut}>
            <Image
              src={'/🦆 icon _cloud_.svg'}
              alt={'icon'}
              width={26}
              height={26}
            />
          </IconButton>
        </IconBox>
      </SideNavLayout>
    </>
  );
};

export default SideNav;
