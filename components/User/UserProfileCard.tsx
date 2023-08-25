import React from 'react';
import {
  FollowBox,
  NicknameBox,
  ProfileContentsBox,
  UserProfileCardBox,
} from '@/styles/user';
import Image from 'next/image';
import b1 from '../../public/b1.png';
import { UserPageData } from './UserUi';
import Link from 'next/link';

interface UserProfileCardProps {
  data: UserPageData | undefined;
  userId: string;
}

interface FollowLinkProps {
  type: 'followers' | 'followings';
  count: number;
  userId: string;
}

const FollowLink: React.FC<FollowLinkProps> = ({ type, count, userId }) => (
  <Link href={`/User/FollowTab?tab=${type}&userId=${userId}`}>
    {type === 'followers' ? '팔로워' : '팔로잉'} {count}
  </Link>
);

const UserProfileCard: React.FC<UserProfileCardProps> = ({ data, userId }) => {
  if (!data) {
    return null;
  }

  const userImageSrc = data.user.userImage?.startsWith('http')
    ? data.user.userImage
    : b1;

  return (
    <UserProfileCardBox>
      <Image
        src={userImageSrc}
        alt={'프로필사진'}
        width={51}
        height={51}
        quality={100}
        loading="eager"
      />
      <ProfileContentsBox>
        <NicknameBox>
          <p className="nickName">{data.user.nickname}</p>
        </NicknameBox>
        <FollowBox>
          <FollowLink
            type="followers"
            count={data.followerCount ?? 0}
            userId={userId}
          />
          <span>|</span>
          <FollowLink
            type="followings"
            count={data.followingCount ?? 0}
            userId={userId}
          />
        </FollowBox>
      </ProfileContentsBox>
    </UserProfileCardBox>
  );
};

export default UserProfileCard;
