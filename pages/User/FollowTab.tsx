import {
  Email,
  FollowButtonStyled,
  Nickname,
  TabButton,
  TabContainer,
  UserInfo,
  UserList,
  UserListItemStyled,
  UserProfileImage,
} from '@/styles/followTab';
import React, { useState } from 'react';

// 사용자 정보 타입
interface User {
  userId: number;
  email: string;
  nickname: string;
  userImage: string;
}

interface FollowTabProps {
  followers: User[];
  followings: User[];
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

const FollowTab: React.FC<FollowTabProps> = ({ followers, followings }) => {
  const [activeTab, setActiveTab] = useState<'followers' | 'followings'>(
    'followers'
  );

  return (
    <div>
      <TabContainer>
        <TabButton onClick={() => setActiveTab('followers')}>팔로워</TabButton>
        <TabButton onClick={() => setActiveTab('followings')}>팔로잉</TabButton>
      </TabContainer>

      <UserList>
        {activeTab === 'followers' &&
          followers.map((user) => <UserListItem key={user.userId} {...user} />)}
        {activeTab === 'followings' &&
          followings.map((user) => (
            <UserListItem key={user.userId} {...user} />
          ))}
      </UserList>
    </div>
  );
};

export default FollowTab;
