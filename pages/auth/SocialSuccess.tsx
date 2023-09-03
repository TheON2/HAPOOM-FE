import { getAuthToken } from '@/api/user';
import { AUTH_USER, UserResponse } from '@/redux/reducers/userSlice';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';

const SocialSuccess = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const tempId = urlParams.get('tempId');
  const dispatch = useDispatch();
  const router = useRouter();

  if (tempId) {
    fetch(`${process.env.NEXT_PUBLIC_LOCAL_SERVER}/get-token?tempId=${tempId}`)
      .then((res) => res.json())
      .then((data) => {
        const token = data.token;
        localStorage.setItem('token', token);
      });
  }

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
