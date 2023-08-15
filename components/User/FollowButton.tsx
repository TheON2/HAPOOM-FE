import { FollowBtn } from '@/styles/user';
import Link from 'next/link';
import React from 'react';

interface FollowButtonProps {
  currentUserId: string; // 현재 로그인한 사용자의 아이디
  profileUserId: string; // 현재 페이지에서 보고 있는 프로필의 아이디
}

const FollowButton: React.FC<FollowButtonProps> = ({
  currentUserId,
  profileUserId,
}) => {
  if (currentUserId === profileUserId) {
    // 현재 사용자가 자신의 프로필을 보고 있을 경우 "설정" 버튼을 표시
    return (
      <FollowBtn>
        {/* Link 태그로 버튼을 감싸고, href 속성을 설정 페이지의 경로로 설정 */}
        <Link href="/Setting">
          <button>설정</button>
        </Link>
      </FollowBtn>
    );
  } else {
    // 현재 사용자가 다른 사람의 프로필을 보고 있을 경우 "팔로우" 버튼을 표시
    return (
      <FollowBtn>
        <button>팔로우</button>
      </FollowBtn>
    );
  }
};

export default FollowButton;
