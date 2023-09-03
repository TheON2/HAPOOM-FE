import { FollowBtn } from '@/styles/user';
import React, { useEffect, useState } from 'react';
import Modal from '../common/Modal';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/config/configStore';
import { getUserProfile } from '@/apis/user';
import Link from 'next/link';
import { useFollow } from '@/hooks/useFollow';

interface FollowButtonProps {
  profileUserId?: number | undefined;
}

const FollowButton: React.FC<FollowButtonProps> = ({ profileUserId }) => {
  const { follow, unfollow, followers } = useFollow(
    String(profileUserId) || ''
  );

  const [isFollowing, setIsFollowing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileUserEmail, setProfileUserEmail] = useState<string | null>(null);

  const loggedInUserEmail = useSelector(
    (state: RootState) => state.user.user.email
  );

  useEffect(() => {
    const fetchProfileUserEmail = async () => {
      if (profileUserId) {
        try {
          const profileData = await getUserProfile({
            UserId: String(profileUserId),
          });
          setProfileUserEmail(profileData.user.email);
        } catch (error) {
          // console.error('Error fetching profile user data:', error);
        }
      }
    };

    if (profileUserId) {
      fetchProfileUserEmail();
    }

    if (
      followers &&
      followers.some((user) => user.email === loggedInUserEmail)
    ) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, [profileUserId, followers, loggedInUserEmail]);

  const handleFollowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFollowing) {
      setIsModalOpen(true);
    } else {
      follow();
      setIsFollowing(true);
    }
  };

  const handleConfirmUnfollow = () => {
    unfollow();
    setIsFollowing(false);
    setIsModalOpen(false);
  };

  return (
    <>
      {loggedInUserEmail === profileUserEmail ? (
        <Link href="/setting/Setting">
          <FollowBtn $status="설정">설정</FollowBtn>
        </Link>
      ) : (
        <FollowBtn
          $status={isFollowing ? '팔로잉' : '팔로우'}
          onClick={handleFollowClick}
        >
          {isFollowing ? '팔로잉' : '팔로우'}
        </FollowBtn>
      )}
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
    </>
  );
};

export default FollowButton;
