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
import Link from 'next/link';

interface UserProfileCardProps {
  data: UserPageData | undefined;
}

const handleFollowingClick = (e: React.MouseEvent) => {
  e.preventDefault(); // 기본 이벤트를 방지합니다.
  console.log('Following link clicked. Data:', data);
  // 여기서 원하는 로직을 추가할 수 있습니다.
};
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
        </NicknameBox>
        <FollowBox>
          <Link href="/User/FollowTab?tab=followers">팔로워 3</Link>
          <span>|</span>
          <Link href="/User/FollowTab?tab=followings">팔로잉 3</Link>
        </FollowBox>
      </ProfileContentsBox>
    </UserProfileCardBox>
  );
};

export default UserProfileCard;
