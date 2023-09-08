import { getAuthToken } from '@/api/user';
import { AUTH_USER, UserResponse } from '@/redux/reducers/userSlice';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';

const SocialSuccess = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    // 쿼리에서 token 값을 가져옵니다.
    const { token } = router.query;

    if (token) {
      // 로컬 스토리지에 토큰을 저장합니다.
      window.localStorage.setItem('token', token as string);
      router.push('/');
    }
  }, [router.query, router]);

  return <></>;
};

export default SocialSuccess;
