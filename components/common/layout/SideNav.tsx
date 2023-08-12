import React, { useCallback } from 'react';
import styled from 'styled-components';
import { SideNavLayout, SideNavMenuBox } from '@/styles/navbar';
import IconButton from '../IconButton';
import Themes from '@/components/Setting/Themes';
import Profile from '@/components/Setting/Profile';
import { useSelector } from 'react-redux';
import { UserState } from '@/redux/reducers/userSlice';
import { RootState } from '@/redux/config/configStore';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { userLogOut } from '@/api/user';
import { LOGOUT_USER } from '@/redux/reducers/userSlice';
import NavbarTab from '@/components/common/TabBarLinkButton';
import { Bell, Logout } from '@/components/common/SVG';

interface SubmenuProps {
  children: React.ReactNode;
}
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

const IconBox = styled.div`
  width: 100%;
  height: 54px;
  padding: 0 24px;
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
        <IconBox>
          <IconButton>
            <Bell fillColor="#000" />
          </IconButton>
        </IconBox>
        <Profile
          direction="row"
          email={user?.email || ''}
          userImage={user?.userImage || ''}
          preset={user?.preset || 5}
          nickname={user?.nickName || ''}
        />
        <SideNavMenuBox>
          {user?.email !== null ? (
            <NavbarTab router="/setting/Setting">My page</NavbarTab>
          ) : (
            <>
              <NavbarTab router="/auth/SignIn">Login</NavbarTab>
              <NavbarTab router="/auth/SignUp"> Register</NavbarTab>
            </>
          )}
          <Themes />
        </SideNavMenuBox>
        <IconBox>
          <IconButton onClick={onLogOut}>
            <Logout />
          </IconButton>
        </IconBox>
      </SideNavLayout>
    </>
  );
};

export default SideNav;
