import { getFollowers, getFollowings, unFollow } from '@/api/user';
import {
  Email,
  FollowButtonStyled,
  FollowContainer,
  Nickname,
  UserInfo,
  UserList,
  UserListItemStyled,
  UserProfileImageBox,
} from '@/styles/followTab';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Modal from '@/components/common/Modal';
import ProfileImage from '@/components/common/ProfileImage';
import { useQuery } from 'react-query';
import Tabs from '@/components/common/Tabs';
import { useAuth } from '@/hooks/useAuth';

export interface User {
  userId: number;
  email: string;
  nickname: string;
  userImage: string;
  preset: number;
}

interface FollowTabUser {
  userId: number;
  email: string | null;
  nickname?: string;
  userImage: string | null;
  preset: number | null;
}

interface FollowTabProps {
  userId: string;
}

const UserListItem: React.FC<
  FollowTabUser & {
    showUnfollowButton?: boolean;
    handleOpenModal?: (userId: number) => void;
  }
> = ({
  userId,
  userImage,
  nickname,
  email,
  showUnfollowButton,
  preset,
  handleOpenModal,
}) => {
  const router = useRouter();

  const handleNicknameClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    router.push(`/User/${userId}`);
  };

  const renderUnfollowButton = () => (
    <FollowButtonStyled onClick={() => handleOpenModal?.(userId)}>
      언팔로우
    </FollowButtonStyled>
  );

  return (
    <UserListItemStyled>
      <UserProfileImageBox>
        <ProfileImage
          onClick={handleNicknameClick}
          userImage={userImage}
          preset={preset}
        />
      </UserProfileImageBox>
      <UserInfo>
        <Nickname onClick={handleNicknameClick}>{nickname}</Nickname>
        <Email>{email}</Email>
      </UserInfo>

      {showUnfollowButton && renderUnfollowButton()}
    </UserListItemStyled>
  );
};

const FollowTab: React.FC<FollowTabProps> = () => {
  const router = useRouter();
  const userId = router.query.userId as string;
  const [activeTab, setActiveTab] = useState<'followers' | 'followings'>(
    'followers'
  );
  const [followers, setFollowers] = useState<FollowTabUser[]>([]);
  const [followings, setFollowings] = useState<FollowTabUser[]>([]);

  const { userData } = useAuth();
  const loggedInEmail = userData?.email;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToUnfollow, setUserToUnfollow] = useState<number | null>(null);

  const { data: followersData } = useQuery(['followers', userId], () =>
    getFollowers(userId)
  );
  const { data: followingsData } = useQuery(['followings', userId], () =>
    getFollowings(userId)
  );

  const handleOpenUnfollowModal = (targetUserId: number) => {
    setUserToUnfollow(targetUserId);
    setIsModalOpen(true);
  };

  const handleConfirmUnfollow = async () => {
    if (userToUnfollow !== null) {
      try {
        await unFollow(String(userToUnfollow));
        // You might want to refetch the followers/followings data here or handle it another way
        setIsModalOpen(false);
      } catch (error) {
        console.error('Error while sending unfollow request:', error);
      }
    }
  };

  useEffect(() => {
    if (followersData) setFollowers(followersData);
    if (followingsData) setFollowings(followingsData);
  }, [followersData, followingsData]);

  const activeData = activeTab === 'followers' ? followers : followings;

  return (
    <FollowContainer>
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

      <UserList>
        {Array.isArray(activeData) &&
          activeData.map((user) => (
            <UserListItem
              key={user.userId}
              {...user}
              showUnfollowButton={
                user.email !== loggedInEmail && activeTab === 'followings'
              }
              handleOpenModal={
                user.email !== loggedInEmail && activeTab === 'followings'
                  ? handleOpenUnfollowModal
                  : undefined
              }
            />
          ))}
      </UserList>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          actionText="예"
          onClickEvent={handleConfirmUnfollow}
        >
          언팔로우 하시겠습니까?
        </Modal>
      )}
    </FollowContainer>
  );
};

export default FollowTab;
