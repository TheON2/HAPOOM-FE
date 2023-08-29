import React, { useEffect, useState } from 'react';
import MainBannerSlider from '@/components/Home/InfiniteCarousel';
import HashtagNavBar from '@/components/Home/HashtagNavBar';
import HashtagContents from '@/components/Home/HashtagContents';
import Main from '@/components/Home/HomeMain';
import MainBanner from '@/components/Home/MainBanner';
import Header from '@/components/common/Header';
import PopularContentsCarousel from '@/components/Home/PopularContentsCarousel';
import { sliderImages } from '../../public/data';
import { GetStaticProps, NextPage, GetServerSideProps } from 'next';
import { useQuery, useQueryClient } from 'react-query';
import { getMain, getSearch } from '@/api/post';
import axios from 'axios';
import { getAuthToken } from '@/api/user';
import { AUTH_USER, UserResponse } from '@/redux/reducers/userSlice';
import { useDispatch } from 'react-redux';
import { setCookie } from 'nookies';
import { HomePageLayout } from '@/styles/home';
import { MainPageProps } from '@/types/home';

const Home: NextPage<MainPageProps> = ({
  data,
  hashtagData,
  hashContent,
  popularContent,
  randomPosts,
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
  const tagFilter = hashtagData.filter((tag) => tag.tag !== undefined);
  const undefindeTag = hashtagData.filter((tag) => tag.tag === undefined);
  const undefindeTagThumbnail = undefindeTag[0].image;
  const allTagThumbnail = hashContent[0].image;
  const [hashTag, setHashTag] = useState<string>(tagFilter[0].tag);
  const [tagCategory, setTagCategory] = useState<string>('전체');
  const [isClick, setIsClick] = useState<boolean>(false);
  const onClickBottomNavHandler = () => {
    console.log('클릭중');
    setIsClick(!isClick);
  };
  const { data: hashtagSearch, isLoading } = useQuery(
    ['hashtag', hashTag],
    () => getSearch({ search: hashTag, option: 'tags' }),
    {
      enabled: tagCategory === 'unique',
      staleTime: 60 * 1000,
    }
  );

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY > 0) {
        setIsClick(true);
      }
      window.removeEventListener('wheel', handleWheel);
    };
    window.addEventListener('wheel', handleWheel);
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isClick]);

  if (typeof window !== 'undefined') {
    setCookie(null, 'update', '1', { path: '/' });
    setCookie(null, 'updateId', '0', { path: '/' });
  }

  return (
    <HomePageLayout>
      <MainBanner
        data={data}
        $isClick={isClick}
        randomPosts={randomPosts}
        onClickBottomNavHandler={onClickBottomNavHandler}
      />
      <HashtagNavBar
        data={tagFilter}
        $isClick={isClick}
        onClickEvent={onClickBottomNavHandler}
        hashTag={hashTag}
        setHashTag={setHashTag}
        setTagCategory={setTagCategory}
        undefindeTagThumbnail={undefindeTagThumbnail}
        allTagThumbnail={allTagThumbnail}
      />
      <Main>
        <HashtagContents
          serverPropData={hashContent}
          tagData={hashtagSearch}
          undefindeTag={undefindeTag}
          hashTag={hashTag}
          tagCategory={tagCategory}
        />
        <PopularContentsCarousel data={popularContent} />
      </Main>
    </HomePageLayout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_LOCAL_SERVER}/api/main`
  );

  const data = sliderImages;
  // const hashtagData = hashtagImages;

  return {
    props: {
      data,
      hashtagData: response.data.mainTags,
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
