import React from 'react';
import FeedUi from '../../components/Feed/FeedUi';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import { getAuthToken } from '@/api/user';
import { AUTH_USER, UserResponse } from '@/redux/reducers/userSlice';
import { GetStaticProps, NextPage } from 'next';
import { getMain } from '@/api/post';

const Feed: NextPage<any> = ({ data }) => {
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
  return <FeedUi data={data} />;
};

export default Feed;

export const getStaticProps: GetStaticProps = async () => {
  const response = await getMain();

  const data = response;

  return {
    props: { data },
    revalidate: 60,
  };
};
