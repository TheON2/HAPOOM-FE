import {
  Email,
  FollowButtonStyled,
  FollowContainer,
  Nickname,
  TabButton,
  TabContainer,
  TabUnderline,
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

interface TabUnderlineProps {
  $activeTab: 'followers' | 'followings';
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
  {
    userId: 1,
    email: 'follower1@example.com',
    nickname: 'Follower 1',
    userImage: 'path_to_image1',
  },
];

const mockFollowings: User[] = [
  {
    userId: 2,
    email: 'following1@example.com',
    nickname: 'Following 1',
    userImage: 'path_to_image2',
  },
];

const FollowTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'followers' | 'followings'>(
    'followers'
  );

  const handleTabClick = (tab: 'followers' | 'followings') => {
    setActiveTab(tab);
  };

  return (
    <FollowContainer>
      <TabContainer>
        <TabButton onClick={() => handleTabClick('followers')}>
          팔로워
        </TabButton>
        <TabButton onClick={() => handleTabClick('followings')}>
          팔로잉
        </TabButton>
        <TabUnderline $activeTab={activeTab} />
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
