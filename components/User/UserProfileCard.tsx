import React from 'react';
import {
  FollowBox,
  NicknameBox,
  ProfileContentsBox,
  SettingPageLink,
  UserProfileCardBox,
} from '@/styles/user';
import Image from 'next/image';
import b1 from '../../public/b1.png';
import { UserPageData } from './UserUi';

interface UserProfileCardProps {
  data: UserPageData | undefined;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ data }) => {
  if (!data) {
    return null;
  }
  return (
    <UserProfileCardBox>
      <Image
        src={
          data?.user.userImage && data.user.userImage.startsWith('http')
            ? data.user.userImage
            : b1
        }
        alt={'프로필사진'}
        width={51}
        height={51}
        objectFit={'cover'}
        quality={70}
        loading="eager"
      />
      <ProfileContentsBox>
        <NicknameBox>
          <p className="nickName">{data?.user.nickname}</p>
          <SettingPageLink href={'/setting/Setting'}>설정</SettingPageLink>
        </NicknameBox>
        <FollowBox>
          <p>팔로워 3</p>
          <span>|</span>
          <p>팔로잉 3</p>
        </FollowBox>
      </ProfileContentsBox>
    </UserProfileCardBox>
  );
};

export default UserProfileCard;
