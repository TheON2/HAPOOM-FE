import React from 'react';
import {
  FollowBox,
  ProfileContentsBox,
  SettingPageLink,
  UserProfileCardBox,
} from '@/styles/user';
import profile from '../../public/profile.jpg';
import Image from 'next/image';

const UserProfileCard = () => {
  return (
    <UserProfileCardBox>
      <Image
        src={profile}
        alt={'프로필사진'}
        width={264}
        height={280}
        objectFit={'cover'}
        quality={70}
        loading="eager"
      />
      <ProfileContentsBox>
        <p>나는 멋쟁이 도영</p>
        <p>나는 멋쟁이 공룡이얌</p>
        <FollowBox>
          <p>팔로워 3</p>
          <p>팔로잉 3</p>
          <SettingPageLink href={'/'}>설정</SettingPageLink>
        </FollowBox>
      </ProfileContentsBox>
    </UserProfileCardBox>
  );
};

export default UserProfileCard;
