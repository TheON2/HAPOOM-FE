import Link from 'next/link';
import { FollowBtn } from '@/styles/user';
import React, { useState, useEffect } from 'react';

interface FollowButtonProps {
  currentUserId: string;
  profileUserId: string;
}

const ConfirmModal: React.FC<{
  onClose: () => void;
  onConfirm: () => void;
}> = ({ onClose, onConfirm }) => {
  return (
    <div>
      언팔로우 하시겠습니까?
      <button onClick={onConfirm}>예</button>
      <button onClick={onClose}>아니오</button>
    </div>
  );
};

const FollowButton: React.FC<FollowButtonProps> = ({
  currentUserId,
  profileUserId,
}) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // TODO: API 호출 로직 추가
    // 임시 팔로우 상태 설정
    setIsFollowing(false);
  }, [currentUserId, profileUserId]);

  const handleFollowClick = () => {
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
        <FollowBtn status="설정">
          <Link href="/setting/Setting">
            <button>설정</button>
          </Link>
        </FollowBtn>
      ) : (
        <FollowBtn status={isFollowing ? '팔로잉' : '팔로우'}>
          <button onClick={handleFollowClick}>
            {isFollowing ? '팔로잉' : '팔로우'}
          </button>
        </FollowBtn>
      )}
      {isModalOpen && (
        <ConfirmModal
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmUnfollow}
        />
      )}
    </>
  );
};

export default FollowButton;
