import React from 'react';
import {
  Email,
  Nickname,
  UserInfo,
  UserListItemStyled,
  UserProfileImageBox,
} from '@/styles/followTab';
import ProfileImage from '@/components/common/ProfileImage';
import Button from '@/components/common/Button';
export interface User {
  userId: number;
  email: string;
  nickname: string;
  userImage: string;
  preset: number;
}

const UserSearchResult: React.FC<User> = ({
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
    </UserListItemStyled>
  );
};

export default UserSearchResult;
