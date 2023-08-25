import React from 'react';
import FeedUi from '../../components/Feed/FeedUi';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import { getAuthToken } from '@/api/user';
import { AUTH_USER, UserResponse } from '@/redux/reducers/userSlice';
import axios from 'axios';
import { GetServerSidePropsResult, NextPage } from 'next';

export type FeedData = {
  email: string;
  image: string;
  musicTitle: string;
  musicUrl: string | null;
  nickname: string;
  postId: number;
  preset: number;
  updatedAt: string;
  userImage: string;
}[];
export type FeedProps = {
  initialFeedData: FeedData;
};
const Feed: NextPage<FeedProps> = ({ initialFeedData }) => {
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
  return <FeedUi initialFeedData={initialFeedData} />;
};

export default Feed;

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<{ initialFeedData: FeedData }>
> {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_LOCAL_SERVER}/api/main/feed`
  );

  return {
    props: {
      initialFeedData: response.data,
    },
  };
}
