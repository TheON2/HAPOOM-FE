import Main from '@/components/Home/Main';
import Header from '@/components/common/Header';
import React from 'react';
import styled from 'styled-components';
import UserInfoUpdate from '@/components/Setting/UserInfoUpdate';
import UserProfileImageUpdate from '@/components/Setting/UserProfileImageUpdate';
import UpdatePassword from '@/components/Setting/UpdatePassword';
import {
  FollowBox,
  ProfileContentsBox,
  SettingPageLink,
  UserProfileCardBox,
} from '@/styles/user';
import Image from 'next/image';

const SettingLayout = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1360px;
  margin: 2rem auto 8rem;
  padding: 0 5%;
`;

const userInfo = {
  nickname: '멋쟁이 도영',
  introduceText: '나는 오늘도 하늘을 찍는다',
  password: 'password',
};

const Setting = () => {
  return (
    <Main>
      <Header />
      <SettingLayout>
        <h2>프로필 수정</h2>
        <UserProfileCardBox>
          <Image
            src={'/inflearn.jpg'}
            alt={'프로필사진'}
            width={264}
            height={280}
            objectFit={'cover'}
            quality={70}
            loading="eager"
          />
          <ProfileContentsBox>
            <UserInfoUpdate info={'닉네임'} infoData={userInfo.nickname} />
            <UserInfoUpdate info={'소개글'} infoData={userInfo.introduceText} />
          </ProfileContentsBox>
        </UserProfileCardBox>
        <UserProfileImageUpdate />
        <UpdatePassword />
      </SettingLayout>
    </Main>
  );
};

export default Setting;
