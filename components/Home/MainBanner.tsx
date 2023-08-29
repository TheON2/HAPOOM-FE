import Image from 'next/image';
import React from 'react';
import {
  ButtonTouchBox,
  MainBannerBox,
  MainBannerContainer,
} from '@/styles/home';
import { ArrowLong } from '../common/SVG';

const MainBanner = ({
  data,
  $isClick,
  randomPosts,
  onClickBottomNavHandler,
}: any) => {
  return (
    <MainBannerContainer $isClick={$isClick}>
      <Image
        src={data[0]?.src}
        alt="v13 image"
        width={768}
        height={800}
        loading="eager"
        priority={true}
      />
      <MainBannerBox $isClick={$isClick}>
        <p>
          {randomPosts && randomPosts[0].content1}
          <span>{randomPosts && randomPosts[0].content2}</span>
        </p>
        <ButtonTouchBox $isClick={$isClick}>
          touch
          <button onClick={onClickBottomNavHandler}>
            <ArrowLong />
          </button>
        </ButtonTouchBox>
      </MainBannerBox>
    </MainBannerContainer>
  );
};

export default MainBanner;
