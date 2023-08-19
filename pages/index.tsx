import React, { useState } from 'react';
import MainBannerSlider from '@/components/Home/MainBannerSlider';
import HashtagNavBar from '@/components/Home/HashtagNavBar';
import HashtagContents from '@/components/Home/HashtagContents';
import Main from '@/components/Home/Main';
import PopularContents from '@/components/Home/PopularContents';
import MainBanner from '@/components/Home/MainBanner';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import PopularContentsCarousel from '@/components/Home/PopularContentsCarousel';
import styled from 'styled-components';
import {
  sliderImages,
  SliderImage,
  hashtagImages,
  hashtagContentsImages,
  popularContentsImages,
} from '../public/data';
import { GetStaticProps, NextPage, GetServerSideProps } from 'next';
import { useQuery } from 'react-query';
import axios from 'axios';
import MobileBottomNav from '@/components/common/MobileBottomNav';
import { getAuthToken } from '@/api/user';
import { AUTH_USER, UserResponse } from '@/redux/reducers/userSlice';
import { useDispatch } from 'react-redux';
import { setCookie } from 'nookies';
import api from '../axios/api';
interface Props {
  data: SliderImage[];
  hashtagData: SliderImage[];
  hashContent: any;
  popularContent: any;
}

const HomePageLayout = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  /* @media screen and (min-width: 768px) {
    overflow: initial;
  } */
`;

const Home: NextPage<Props> = ({
  data,
  hashtagData,
  hashContent,
  popularContent,
}) => {
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
  const [isClick, setIsClick] = useState<boolean>(false);
  const onClickBottomNavHandler = () => {
    setIsClick(!isClick);
  };

  if (typeof window !== 'undefined') {
    setCookie(null, 'update', '1', { path: '/' });
    setCookie(null, 'updateId', '0', { path: '/' });
  }

  return (
    <HomePageLayout>
      <Header $sticky={'sticky'} />
      <MainBanner data={data} $isClick={isClick} />
      <HashtagNavBar
        data={hashtagData}
        $isClick={isClick}
        onClickEvent={onClickBottomNavHandler}
      />
      <Main>
        <HashtagContents data={hashContent} />
        <PopularContentsCarousel data={popularContent} />
        <Footer />
      </Main>
    </HomePageLayout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const response = await api.get(`/api/main`);
  const data = sliderImages;
  const hashtagData = hashtagImages;

  return {
    props: {
      data,
      hashtagData,
      hashContent: response.data.posts,
      popularContent: response.data.likePosts,
    },
    revalidate: 60,
    //MEMO : revalidate
    //stale : 신선하지 않은 데이터
    //5초 동안 hit가 유지된다.
    //데이터가 변하지 않으면 pre-render가 실행되지 않는다.
  };
};
