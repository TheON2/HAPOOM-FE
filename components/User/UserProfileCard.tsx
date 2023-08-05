import React from 'react';
import {
  FollowBox,
  ProfileContentsBox,
  SettingPageLink,
  UserImage,
  UserProfileCardBox,
} from '@/styles/user';
import profile from '../../public/profile.jpg';

const UserProfileCard = () => {
  return (
    <UserProfileCardBox>
      <UserImage
        style={{ width: '264px', height: '280px', objectFit: 'cover' }}
        src={profile}
        alt="프로필사진"
      />
      <ProfileContentsBox>
        <p>멋쟁이 도영</p>
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
