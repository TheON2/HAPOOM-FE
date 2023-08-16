// import Link from 'next/link';
// import { FollowBtn } from '@/styles/user';
// import React, { useState, useEffect } from 'react';

// interface FollowButtonProps {
//   currentUserId: string; // 현재 로그인한 사용자의 아이디
//   profileUserId: string; // 현재 페이지에서 보고 있는 프로필의 아이디
// }

// const FollowButton: React.FC<FollowButtonProps> = ({
//   currentUserId,
//   profileUserId,
// }) => {
//   const [followingStatus, setFollowingStatus] = useState<
//     '팔로우' | '팔로잉' | '언팔로우'
//   >('팔로우');

//   useEffect(() => {
//     TODO: 추후에 백엔드 API 호출 로직 추가

//     fetch(`/api/follow-status?currentUserId=${currentUserId}&profileUserId=${profileUserId}`)
//       .then(response => response.json())
//       .then(data => {
//         if (data.isFollowing) {
//           setFollowingStatus('팔로잉');
//         } else {
//           setFollowingStatus('팔로우');
//         }
//       });

//     임시로 팔로우 상태 설정 (API 연동 후 제거 필요)
//     setFollowingStatus('팔로우'); // 예시
//   }, [currentUserId, profileUserId]);

//   const handleFollowClick = () => {
//     if (followingStatus === '팔로우') {
//       setFollowingStatus('팔로잉');
//     } else if (followingStatus === '팔로잉') {
//       setFollowingStatus('언팔로우');
//     } else {
//       setFollowingStatus('팔로우');
//     }
//   };

//   if (currentUserId === profileUserId) {
//     return (
//       <FollowBtn status="설정">
//         <Link href={'/setting/Setting'}>
//           <button onClick={handleFollowClick}>설정</button>
//         </Link>
//       </FollowBtn>
//     );
//   } else {
//     return (
//       <FollowBtn status={followingStatus}>
//         <button onClick={handleFollowClick}>{followingStatus}</button>
//       </FollowBtn>
//     );
//   }
// };

// export default FollowButton;

import React from 'react';
import { FollowBtn } from '@/styles/user';

const FollowButton = () => {
  return (
    <FollowBtn>
      <button>팔로우</button>
    </FollowBtn>
  );
};

export default FollowButton;
