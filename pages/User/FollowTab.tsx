import { getFollowers, getFollowings, unFollow } from '@/api/user';
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
import { useRouter } from 'next/router';
import Modal from '@/components/common/Modal';
import { useAuth } from '@/hooks/useAuth';

interface FollowTabUser {
  userId: number;
  email: string | null;
  nickname?: string;
  userImage: string | null;
}

interface FollowTabProps {
  userId: string;
}

const UserListItem: React.FC<
  FollowTabUser & { onUnfollow?: (userId: number) => void }
> = ({ userId, userImage, nickname, email, onUnfollow }) => (
  <UserListItemStyled>
    <UserProfileImage
      src={userImage || 'DEFAULT_IMAGE_URL_OR_EMPTY_STRING'}
      alt={nickname || 'Unknown'}
    />
    <UserInfo>
      <Nickname>{nickname || '알 수 없음'}</Nickname>
      <Email>{email || '이메일 없음'}</Email>
    </UserInfo>
    {onUnfollow && (
      <FollowButtonStyled onClick={() => onUnfollow(userId)}>
        언팔로우
      </FollowButtonStyled>
    )}
  </UserListItemStyled>
);

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

  const handleOpenUnfollowModal = (targetUserId: number) => {
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
    console.log('userData:', userData); // userData 콘솔 출력
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
  }, [userId, userData]);

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
            <UserListItem
              key={user.userId}
              {...user}
              onUnfollow={
                user.email !== loggedInEmail && activeTab === 'followings'
                  ? () => handleOpenUnfollowModal(user.userId)
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
