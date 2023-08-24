import Image from 'next/image';
import React from 'react';
import { MainBannerContainer } from '@/styles/home';

const MOCK = '집에 가고 싶다.,집 떠나면 개고생이다.';

const MainBanner = ({ data, $isClick, randomPosts }: any) => {
  console.log(randomPosts);
  return (
    <MainBannerContainer $isClick={$isClick}>
      {randomPosts && (
        <p>
          {randomPosts[0].content1}
          <br />
          {randomPosts[0].content2}
        </p>
      )}
      <Image
        src={data[0]?.src}
        alt="v13 image"
        width={768}
        height={800}
        loading="eager"
        priority={true}
      />
    </MainBannerContainer>
  );
};

export default MainBanner;
