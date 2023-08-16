import Header from '@/components/common/Header';
import {
  Email,
  FollowButtonStyled,
  FollowContainer,
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

const mockFollowers: User[] = [
  // 여기에 팔로워 목 데이터를 추가하세요.
  {
    userId: 1,
    email: 'follower1@example.com',
    nickname: 'Follower 1',
    userImage: 'path_to_image1',
  },
  // ... 다른 팔로워 데이터
];

const mockFollowings: User[] = [
  // 여기에 팔로잉 목 데이터를 추가하세요.
  {
    userId: 2,
    email: 'following1@example.com',
    nickname: 'Following 1',
    userImage: 'path_to_image2',
  },
  // ... 다른 팔로잉 데이터
];

const FollowTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'followers' | 'followings'>(
    'followers'
  );

  const handleTabClick = (tab: 'followers' | 'followings') => {
    console.log('Clicked tab:', tab);
    setActiveTab(tab);
  };

  return (
    <FollowContainer>
      <Header />
      <TabContainer>
        <TabButton onClick={() => handleTabClick('followers')}>
          팔로워
        </TabButton>
        <TabButton onClick={() => handleTabClick('followings')}>
          팔로잉
        </TabButton>
      </TabContainer>

      <UserList>
        {activeTab === 'followers' &&
          mockFollowers.map((user) => (
            <UserListItem key={user.userId} {...user} />
          ))}
        {activeTab === 'followings' &&
          mockFollowings.map((user) => (
            <UserListItem key={user.userId} {...user} />
          ))}
      </UserList>
    </FollowContainer>
  );
};

export default FollowTab;
