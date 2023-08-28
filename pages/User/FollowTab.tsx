import {
  getFollowers,
  getFollowings,
  getUserProfile,
  unFollow,
} from '@/api/user';
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
import { useMutation, useQueryClient } from 'react-query';
import Tabs from '@/components/common/Tabs';

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
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<'followers' | 'followings'>(
    'followers'
  );
  const [loggedInUserId, setLoggedInUserId] = useState<number | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToUnfollow, setUserToUnfollow] = useState<number | null>(null);

  const handleOpenUnfollowModal = (targetUserId: number) => {
    if (loggedInUserId !== Number(userId)) return;
    setUserToUnfollow(targetUserId);
    setIsModalOpen(true);
  };

  const unFollowMutation = useMutation(unFollow, {
    onSuccess: () => {
      queryClient.invalidateQueries(['followings', userId]);
    },
  });

  const handleConfirmUnfollow = () => {
    if (userToUnfollow !== null) {
      try {
        unFollowMutation.mutate(String(userToUnfollow));
        setIsModalOpen(false);
      } catch (error) {
        console.error('Error while sending unfollow request:', error);
      }
    }
  };

  const { data: followers } = useQuery(['followers', userId], () =>
    getFollowers(userId)
  );

  const { data: followings } = useQuery(['followings', userId], () =>
    getFollowings(userId)
  );

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile = await getUserProfile({ UserId: userId });
        setLoggedInUserId(userProfile.user.userId);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const activeData = activeTab === 'followers' ? followers : followings;

  return (
    <FollowContainer>
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

      <UserList>
        {Array.isArray(activeData) &&
          activeData.map((user) => {
            return (
              <UserListItem
                key={user.userId}
                {...user}
                showUnfollowButton={
                  activeTab === 'followings' &&
                  loggedInUserId === Number(userId) &&
                  loggedInUserId !== user.userId
                }
                handleOpenModal={handleOpenUnfollowModal}
              />
            );
          })}
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
