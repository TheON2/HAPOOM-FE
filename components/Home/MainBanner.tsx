import Image from 'next/image';
import React from 'react';
import { MainBannerContainer } from '@/styles/home';

const MainBanner = ({ data, $isClick }: any) => {
  return (
    <MainBannerContainer $isClick={$isClick}>
      <p>
        집에 가고 싶다.
        <br /> 집 떠나면 개고생이다.
      </p>
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
