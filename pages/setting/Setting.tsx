import Header from '@/components/common/Header';
import React from 'react';
import UpdateNickName from '@/components/Setting/UpdateNickName';
import UpdateUserProfile from '@/components/Setting/UpdateUserProfile';
import UpdatePassword from '@/components/Setting/UpdatePassword';
import AccordianMenu from '@/components/common/AccordianMenu';
import Themes from '@/components/Setting/Themes';
import { getAuthToken, getUserSetting } from '@/api/user';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { AUTH_USER, UserResponse } from '@/redux/reducers/userSlice';
import { SettingLayout, AccordianContent } from '@/styles/setting';
import Profile from '@/components/Setting/Profile';
import MobileBottomNav from '@/components/common/MobileBottomNav';

const Setting = () => {
  const dispatch = useDispatch();

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
  console.log('data', userData);

  return (
    <>
      <Header />
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

        <MobileBottomNav />
      </SettingLayout>
    </>
  );
};

export default Setting;
