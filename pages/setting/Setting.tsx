import React, { useCallback } from 'react';
import UpdateNickName from '@/components/Setting/UpdateNickName';
import UpdateUserProfile from '@/components/Setting/UpdateUserProfile';
import UpdatePassword from '@/components/Setting/UpdatePassword';
import AccordianMenu from '@/components/common/AccordianMenu';
import Themes from '@/components/Setting/Themes';
import { getAuthToken, getUserSetting, userLogOut } from '@/api/user';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import {
  AUTH_USER,
  LOGOUT_USER,
  UserResponse,
} from '@/redux/reducers/userSlice';
import { SettingLayout, AccordianContent, LogOutBtn } from '@/styles/setting';
import Profile from '@/components/Setting/Profile';
import { NextRouter, useRouter } from 'next/router';

const Setting = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const router: NextRouter = useRouter();
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

  const { data: userData, isSuccess: tokenSuccess } = useQuery(
    'user',
    getAuthToken,
    {
      onSuccess: (userData: UserResponse) => {
        dispatch(AUTH_USER(userData));
      },
      cacheTime: 0,
    }
  );

  const { data: userSetting } = useQuery('userSetting', getUserSetting, {
    onSuccess: (data) => {},
    cacheTime: 0,
  });
  return (
    <>
      <SettingLayout>
        <Profile
          direction="column"
          email={userSetting?.user.email}
          userImage={userSetting?.user.userImage}
          preset={userSetting?.user.preset}
          nick={userSetting?.user.nickname}
        />
        {/*  */}
        <AccordianMenu tabText="닉네임 수정">
          <AccordianContent>
            <UpdateNickName nickname={userSetting?.user.nickname} />
          </AccordianContent>
        </AccordianMenu>

        {/*  */}
        <AccordianMenu tabText="프로필 수정">
          <AccordianContent>
            <UpdateUserProfile
              profileImage={userSetting?.user.userImage}
              preset={userSetting?.user.preset}
            />
          </AccordianContent>
        </AccordianMenu>

        {/*  */}
        <AccordianContent>
          <Themes />
        </AccordianContent>

        {/*  */}
        <AccordianMenu tabText="비밀번호 수정">
          <AccordianContent>
            <UpdatePassword />
          </AccordianContent>
        </AccordianMenu>
        <LogOutBtn onClick={onLogOut}>로그아웃</LogOutBtn>
      </SettingLayout>
    </>
  );
};

export default Setting;
