import React from 'react';
import {
  Email,
  FollowButtonStyled,
  Nickname,
  UserInfo,
  UserListItemStyled,
  UserProfileImage,
} from '@/styles/followTab';

export interface User {
  userId: number;
  email: string;
  nickname: string;
  userImage: string;
}

const UserListItem: React.FC<User> = ({ userImage, nickname, email }) => {
  return (
    <UserListItemStyled>
      <UserProfileImage src={userImage} alt={nickname} />
      <UserInfo>
        <Nickname>{nickname}</Nickname>
        <Email>{email}</Email>
      </UserInfo>
      <FollowButtonStyled>팔로잉</FollowButtonStyled>
    </UserListItemStyled>
  );
};

export default UserListItem;
