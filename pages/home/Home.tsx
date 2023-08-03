import React from 'react';
import MainBannerSlider from '@/components/Home/MainBannerSlider';
import HashtagNavBar from '@/components/Home/HashtagNavBar';
import HashtagContents from '@/components/Home/HashtagContents';
import Main from '@/components/Home/Main';
import PopularContents from '@/components/Home/PopularContents';
const Home = () => {
  return (
    <Main>
      <MainBannerSlider />
      <HashtagNavBar />
      <HashtagContents />
      <PopularContents />
    </Main>
  );
};

export default Home;
