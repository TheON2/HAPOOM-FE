import { getAuthToken } from '@/apis/user';
import { AUTH_USER, UserResponse } from '@/redux/reducers/userSlice';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';

const SocialSuccess = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: userData, isSuccess: tokenSuccess } = useQuery(
    'user',
    getAuthToken,
    {
      onSuccess: (userData: UserResponse) => {
        dispatch(AUTH_USER(userData));
        router.push('/');
      },
      cacheTime: 0,
    }
  );
  return <></>;
};

export default SocialSuccess;
