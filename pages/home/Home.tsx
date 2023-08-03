import React from 'react';
import MainBannerSlider from '@/components/Home/MainBannerSlider';
import HashtagNavBar from '@/components/Home/HashtagNavBar';
import HashtagContents from '@/components/Home/HashtagContents';
import Main from '@/components/Home/Main';
import PopularContents from '@/components/Home/PopularContents';
import {
  sliderImages,
  SliderImage,
  hashtagImages,
  hashtagContentsImages,
  popularContentsImages,
} from '../../public/data';
import { GetStaticProps, NextPage } from 'next';

interface Props {
  data: SliderImage[];
  hashtagData: SliderImage[];
  hashContent: SliderImage[];
  popularContent: SliderImage[];
}

const Home: NextPage<Props> = ({
  data,
  hashtagData,
  hashContent,
  popularContent,
}) => {
  // console.log(data);
  return (
    <Main>
      <MainBannerSlider data={data} />
      <HashtagNavBar data={hashtagData} />
      <HashtagContents data={hashContent} />
      <PopularContents data={popularContent} />
    </Main>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const data = sliderImages;
  const hashtagData = hashtagImages;
  const hashContent = hashtagContentsImages;
  const popularContent = popularContentsImages;
  // console.log(data);
  return {
    props: { data, hashtagData, hashContent, popularContent },
    revalidate: 60,
    //MEMO : revalidate
    //stale : 신선하지 않은 데이터
    //5초 동안 hit가 유지된다.
    //데이터가 변하지 않으면 pre-render가 실행되지 않는다.
  };
};
