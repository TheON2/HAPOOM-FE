import { getAuthToken, getUser } from '@/api/user';
import { FollowContainer } from '@/styles/user';
import React from 'react';
import { useQuery } from 'react-query';

const FollowButton = ({
  currentPageUserEmail,
}: {
  currentPageUserEmail?: string;
}) => {
  const { data: loggedInUserData } = useQuery('loggedInUser', getAuthToken);
  const { data: currentPageUserData } = useQuery(
    ['user', currentPageUserEmail],
    () => (currentPageUserEmail ? getUser(currentPageUserEmail) : undefined),
    {
      enabled: !!currentPageUserEmail, // currentPageUserEmail이 있을 때만 API 호출
    }
  );

  // 로그인한 사용자와 현재 페이지의 사용자가 동일하면 팔로우 버튼을 렌더링하지 않습니다.
  if (loggedInUserData?.email === currentPageUserData?.email) {
    return null;
  }

  return (
    <FollowContainer>
      <button>팔로우</button>
    </FollowContainer>
  );
};

export default FollowButton;
