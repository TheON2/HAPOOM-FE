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
      enabled: tokenExists, // 클라이언트 측에서만 토큰 존재 여부 확인
    }
  );
  const [isClick, setIsClick] = useState<boolean>(false);
  const onClickBottomNavHandler = () => {
    setIsClick(!isClick);
  };
  console.log(isClick);

  if (typeof window !== 'undefined') {
    setCookie(null, 'update', '1', { path: '/' });
    setCookie(null, 'updateId', '0', { path: '/' });
  }

  return (
    <HomePageLayout>
      <Header sticky={'sticky'} />
      <MainBanner data={data} isClick={isClick} />
      {/* <MainBannerSlider data={data} /> */}
      <MobileBottomNav />
      <HashtagNavBar
        data={hashtagData}
        isClick={isClick}
        onClickEvent={onClickBottomNavHandler}
      />
      <Main>
        <HashtagContents data={hashContent} />
        <PopularContentsCarousel />
        {/* <Slidetest /> */}
        {/* <PopularContents data={popularContent} /> */}
        <Footer />
      </Main>
    </HomePageLayout>
  );
};

export default Home;

// const MainPost = async () => {
//   const response = await axios.get(`http://localhost:3001/api/main`);
//   return response.data;
// };
// MainPost();

export const getStaticProps: GetStaticProps = async () => {
  const response = await axios.get(`http://localhost:3001/api/main`);
  const data = sliderImages;
  const hashtagData = hashtagImages;
  // const hashContent = hashtagContentsImages;
  // const popularContent = popularContentsImages;
  // console.log(data);
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
