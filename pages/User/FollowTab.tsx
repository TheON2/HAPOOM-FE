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
  TabButton,
  TabContainer,
  TabUnderline,
  UserInfo,
  UserList,
  UserListItemStyled,
  UserProfileImageBox,
} from '@/styles/followTab';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Modal from '@/components/common/Modal';
import ProfileImage from '@/components/common/ProfileImage';

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
  const router = useRouter(); // useRouter 훅을 사용하여 router 객체를 가져옵니다.

  const handleNicknameClick = () => {
    router.push(`/User/${userId}`); // 닉네임을 클릭하면 해당 사용자의 프로필 페이지로 이동합니다.
  };

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
        <Nickname onClick={handleNicknameClick}>{nickname}</Nickname>{' '}
        <Email>{email}</Email>
      </UserInfo>

      {showUnfollowButton && (
        <FollowButtonStyled
          onClick={() => handleOpenModal && handleOpenModal(userId)}
        >
          언팔로우
        </FollowButtonStyled>
      )}
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

  const [loggedInUserId, setLoggedInUserId] = useState<number | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToUnfollow, setUserToUnfollow] = useState<number | null>(null);

  const handleOpenUnfollowModal = (targetUserId: number) => {
    if (loggedInUserId !== Number(userId)) return;
    setUserToUnfollow(targetUserId);
    setIsModalOpen(true);
  };

  const handleConfirmUnfollow = async () => {
    if (userToUnfollow !== null) {
      try {
        await unFollow(String(userToUnfollow));
        setFollowings((prevFollowings) =>
          prevFollowings.filter((user) => user.userId !== userToUnfollow)
        );
        setIsModalOpen(false);
      } catch (error) {
        console.error('Error while sending unfollow request:', error);
      }
    }
  };

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
      <TabContainer>
        <TabButton onClick={() => setActiveTab('followers')}>팔로워</TabButton>
        <TabButton onClick={() => setActiveTab('followings')}>팔로잉</TabButton>
        <TabUnderline $activeTab={activeTab} />
      </TabContainer>

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
