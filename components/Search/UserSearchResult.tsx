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
  const emailId = email ? email.match(/[^@]+/)?.[0] + '@' || '' : '';
  return (
    <UserListItemStyled>
      <UserProfileImageBox>
        <ProfileImage userImage={userImage} preset={preset} />
      </UserProfileImageBox>
      <UserInfo>
        <Nickname>{nickname}</Nickname>
        <Email>{emailId}</Email>
      </UserInfo>
    </UserListItemStyled>
  );
};

export default UserSearchResult;
