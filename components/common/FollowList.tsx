import React from 'react';
import {
  Email,
  FollowButtonStyled,
  Nickname,
  UserInfo,
  UserListItemStyled,
  UserProfileImageBox,
} from '@/styles/followTab';
import ProfileImage from './ProfileImage';
import Button from '@/components/common/Button';
export interface User {
  userId: number;
  email: string;
  nickname: string;
  userImage: string;
  preset: number;
}

const FollowList: React.FC<User> = ({
  userImage,
  nickname,
  email,
  preset,
  userId,
}) => {
  return (
    <UserListItemStyled>
      <UserProfileImageBox>
        <ProfileImage userImage={userImage} preset={preset} />
      </UserProfileImageBox>
      <UserInfo>
        <Nickname>{nickname}</Nickname>
        <Email>{email}</Email>
      </UserInfo>
      <Button className="button-follow">팔로잉</Button>
    </UserListItemStyled>
  );
};

export default FollowList;
