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
      // 이후 다른 라우트로 이동하거나 추가 작업을 수행할 수 있습니다.
      // 예: router.push('/');
    }
  }, [router.query, router]);

  // const { data: userData, isSuccess: tokenSuccess } = useQuery(
  //   'user',
  //   getAuthToken,
  //   {
  //     onSuccess: (userData: UserResponse) => {
  //       dispatch(AUTH_USER(userData));
  //       router.push('/');
  //     },
  //     cacheTime: 0,
  //   }
  // );
  return <></>;
};

export default SocialSuccess;
