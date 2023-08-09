import Main from '@/components/Home/Main';
import Header from '@/components/common/Header';
import React, { ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';
import UpdateNickName from '@/components/Setting/UpdateNickName';
import UpdateUserProfile from '@/components/Setting/UpdateUserProfile';
import UpdatePassword from '@/components/Setting/UpdatePassword';
import Image from 'next/image';
import AccordianMenu from '@/components/common/AccordianMenu';
import Themes from '@/components/Setting/Themes';
import { getAuthToken, getUserSetting, updateUserSetting } from '@/api/user';
import { useQuery, useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { AUTH_USER, UserResponse } from '@/redux/reducers/userSlice';

const SettingLayout = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1360px;
  padding: 0 24px;
`;

const AccordianContent = styled.div`
  width: 100%;
  padding-bottom: 36px;
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 30px;
  gap: 30px;
  /* height: 10vh; */
  div {
    width: 100px;
    height: 100px;
    border-radius: 50px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const Setting = () => {
  const [nickName, setNickName] = useState<string>();
  const [profileImage, setProfileImage] = useState();
  const [theme, setTheme] = useState();
  const dispatch = useDispatch();

  const { data: userData, isSuccess: tokenSuccess } = useQuery(
    'user',
    getAuthToken,
    {
      onSuccess: (userData: UserResponse) => {
        dispatch(AUTH_USER(userData));
      },
    }
  );
  const { data: userSetting } = useQuery('userSetting', getUserSetting, {
    onSuccess: (data) => {
      console.log(data);
      // setNickName(data.user.nickname);
      // setProfileImage(data.userImage);
      // setTheme(data.theme);
    },
  });

  return (
    <Main>
      <Header />
      <SettingLayout>
        <ProfileBox>
          <div>
            <Image
              src={'/inflearn.jpg'}
              alt={'image'}
              width={100}
              height={100}
            />
          </div>
          <h2>{userSetting?.user.nickname}</h2>
        </ProfileBox>
        {userSetting?.user.userImage} <br />
        {userSetting?.user.theme} <br />
        {userSetting?.user.password} <br />
        {/* <Image
          src={userSetting?.user.userImage}
          alt={'image'}
          width={100}
          height={100}
        /> */}
        <AccordianMenu tabText="별명 수정">
          <AccordianContent>
            <UpdateNickName nickname={userSetting?.user.nickname} />
          </AccordianContent>
        </AccordianMenu>
        <AccordianMenu tabText="프로필 수정">
          <AccordianContent>
            <UpdateUserProfile />
          </AccordianContent>
        </AccordianMenu>
        <AccordianContent>
          <Themes />
        </AccordianContent>
        <AccordianMenu tabText="비밀번호 수정">
          <AccordianContent>
            <UpdatePassword />
          </AccordianContent>
        </AccordianMenu>
      </SettingLayout>
    </Main>
  );
};

export default Setting;
