import React from 'react';
import {
  FollowBox,
  InfoNumber,
  InfoText,
  NicknameBox,
  ProfileContentsBox,
  UserProfileCardBox,
} from '@/styles/user';
import Image from 'next/image';
import b1 from '../../public/b1.png';
import { UserPageData } from './UserUi';
import Link from 'next/link';
import { UserState } from '@/redux/reducers/userSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/config/configStore';

interface UserProfileCardProps {
  data: UserPageData | undefined;
  userId: string;
}

interface FollowLinkProps {
  type: 'followers' | 'followings';
  count: number;
  userId: number | null;
}

const FollowLink: React.FC<FollowLinkProps> = ({ type, count, userId }) => (
  <Link href={`/User/FollowTab?tab=${type}&userId=${userId}`}>
    {type === 'followers' ? '팔로워' : '팔로잉'} {count}
  </Link>
);

const UserProfileCard: React.FC<UserProfileCardProps> = ({ data, userId }) => {
  const { user }: { user: UserState['user'] } = useSelector(
    (state: RootState) => state.user
  );
  if (!data) {
    return null;
  }

  const followerCount = data.followerCount || 0;
  const followingCount = data.followingCount || 0;

  const userImageSrc = data.user.userImage?.startsWith('http')
    ? data.user.userImage
    : b1;

  return (
    <UserProfileCardBox>
      <Image
        src={userImageSrc}
        alt={'프로필사진'}
        width={90}
        height={90}
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
            count={followerCount}
            userId={data.user.userId}
          />
          <span>|</span>
          <FollowLink
            type="followings"
            count={followingCount}
            userId={data.user.userId}
          />
        </FollowBox>
        <FollowBox>
          <InfoText>게시물</InfoText>
          <InfoNumber>{data.postsCount}</InfoNumber>
          <span>|</span>
          <InfoText>좋아요</InfoText>
          <InfoNumber>{data.likePostsCount}</InfoNumber>
        </FollowBox>
      </ProfileContentsBox>
    </UserProfileCardBox>
  );
};

export default UserProfileCard;
