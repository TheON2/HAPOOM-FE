import { getFollowers, getFollowings } from '@/api/user';
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
import React, { useState, useEffect } from 'react';

interface FollowTabUser {
  userId: number;
  email: string | null;
  nickname?: string;
  userImage: string | null;
}

interface FollowTabProps {
  userId: string;
}

const UserListItem: React.FC<FollowTabUser> = ({
  userImage,
  nickname,
  email,
}) => (
  <UserListItemStyled>
    <UserProfileImage
      src={userImage || 'DEFAULT_IMAGE_URL_OR_EMPTY_STRING'}
      alt={nickname || 'Unknown'}
    />
    <UserInfo>
      <Nickname>{nickname || '알 수 없음'}</Nickname>
      <Email>{email || '이메일 없음'}</Email>
    </UserInfo>
    <FollowButtonStyled>팔로잉</FollowButtonStyled>
  </UserListItemStyled>
);

const FollowTab: React.FC<FollowTabProps> = ({ userId }) => {
  const [activeTab, setActiveTab] = useState<'followers' | 'followings'>(
    'followers'
  );
  const [followers, setFollowers] = useState<FollowTabUser[]>([]);
  const [followings, setFollowings] = useState<FollowTabUser[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedFollowers = await getFollowers(userId);
        setFollowers(fetchedFollowers);

        const fetchedFollowings = await getFollowings(userId);
        setFollowings(fetchedFollowings);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [userId]);

  const activeData = activeTab === 'followers' ? followers : followings;

  return (
    <FollowContainer>
      <TabContainer>
        <TabButton onClick={() => setActiveTab('followers')}>팔로워</TabButton>
        <TabButton onClick={() => setActiveTab('followings')}>팔로잉</TabButton>
        <TabUnderline $activeTab={activeTab} />
      </TabContainer>

      <UserList>
        {Array.isArray(activeData) &&
          activeData.map((user) => (
            <UserListItem key={user.userId} {...user} />
          ))}
      </UserList>
    </FollowContainer>
  );
};

export default FollowTab;
