import Link from 'next/link';
import { FollowBtn } from '@/styles/user';
import React, { useState } from 'react';
import Modal from '../common/Modal';

interface FollowButtonProps {
  currentUserId?: string;
  profileUserId?: string;
}

const FollowButton: React.FC<FollowButtonProps> = ({
  currentUserId,
  profileUserId,
}) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFollowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFollowing) {
      setIsModalOpen(true);
    } else {
      setIsFollowing(true);
    }
  };

  const handleConfirmUnfollow = () => {
    setIsFollowing(false);
    setIsModalOpen(false);
  };

  return (
    <>
      {currentUserId === profileUserId ? (
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
