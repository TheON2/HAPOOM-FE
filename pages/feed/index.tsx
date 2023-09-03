import React from 'react';
import FeedUi from '@/components/Feed/FeedUi';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import { getAuthToken } from '@/apis/user';
import { AUTH_USER, UserResponse } from '@/redux/reducers/userSlice';

const Feed = () => {
  const dispatch = useDispatch();
  const isClientSide = typeof window !== 'undefined';
  const tokenExists = isClientSide ? !!localStorage.getItem('token') : false;
  const { data: userData, isSuccess: tokenSuccess } = useQuery(
    'user',
    getAuthToken,
    {
      onSuccess: (userData: UserResponse) => {
        dispatch(AUTH_USER(userData));
      },
      enabled: tokenExists,
      cacheTime: 0,
    }
  );
  return <FeedUi />;
};

export default Feed;
