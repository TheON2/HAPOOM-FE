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
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Modal from '@/components/common/Modal';
import ProfileImage from '@/components/common/ProfileImage';
import { useQuery, useQueryClient } from 'react-query';
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
  const { userData } = useAuth();
  console.log('FollowTab userData:', userData);
  const loggedInEmail = userData?.email;
  const isMyProfile = loggedInEmail === userId;

  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToUnfollow, setUserToUnfollow] = useState<number | null>(null);

  const followersQuery = useQuery(
    ['followers', userId],
    () => getFollowers(userId),
    {
      onSuccess: (data) => {
        console.log('Followers successfully fetched:', data);
      },
    }
  );

  const followingsQuery = useQuery(
    ['followings', userId],
    () => getFollowings(userId),
    {
      onSuccess: (data) => {
        console.log('Followings successfully fetched:', data);
      },
    }
  );

  if (followersQuery.isLoading || followingsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (followersQuery.isError || followingsQuery.isError) {
    return (
      <div>
        Error:{' '}
        {(followersQuery.error as Error)?.message ||
          (followingsQuery.error as Error)?.message}
      </div>
    );
  }

  const handleOpenUnfollowModal = (targetUserId: number) => {
    setUserToUnfollow(targetUserId);
    setIsModalOpen(true);
  };

  const handleConfirmUnfollow = async () => {
    if (userToUnfollow !== null) {
      try {
        await unFollow(String(userToUnfollow));
        setIsModalOpen(false);

        queryClient.invalidateQueries(['followings', userId]);
      } catch (error) {
        console.error('Error while sending unfollow request:', error);
      }
    }
  };

  const activeData =
    activeTab === 'followers' ? followersQuery.data : followingsQuery.data;

  return (
    <FollowContainer>
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
      <UserList>
        {Array.isArray(activeData) &&
          activeData.map((user) => (
            <UserListItem
              key={user.email}
              {...user}
              showUnfollowButton={
                !isMyProfile &&
                user.email !== loggedInEmail &&
                activeTab === 'followings'
              }
              handleOpenModal={
                !isMyProfile &&
                user.email !== loggedInEmail &&
                activeTab === 'followings'
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
