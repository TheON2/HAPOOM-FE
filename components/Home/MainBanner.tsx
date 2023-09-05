import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import {
  ButtonTouchBox,
  IntroduceText,
  MainBannerBox,
  MainBannerContainer,
  MainCardInfo,
  NewContentBox,
  ProfileLink,
  RandomContentContainer,
  RandomText,
} from '@/styles/home';
import { ArrowLong } from '../common/SVG';
import ProfileImage from '../common/ProfileImage';
import HeartIcon from '../common/HeartIcon';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/config/configStore';
import Announcement from '@/components/Home/Announcement';
import Link from 'next/link';

const MainBanner = ({
  data,
  $isClick,
  randomPosts,
  onClickBottomNavHandler,
}: any) => {
  const randomPost = useSelector((state: RootState) => state.notification.post);

  return (
    <MainBannerContainer $isClick={$isClick}>
      <RandomContentContainer $isClick={$isClick}>
        <NewContentBox>
          <IntroduceText>당신이 품은 하늘을 공유해주세요</IntroduceText>
          <Link href={`/detail/${randomPost?.post?.postId}`}>
            <figure>
              <Image
                src={randomPost?.images[0]?.url}
                alt="random user image"
                width={768}
                height={800}
                loading="eager"
                priority={true}
              />
            </figure>
          </Link>
          <MainCardInfo>
            <ProfileLink href={`/User/${randomPost?.post?.userId}`}>
              <ProfileImage
                userImage={randomPost?.user?.userImage}
                preset={randomPost?.user.preset}
              />
              <p>
                <span className="nickname-hightlight">
                  {randomPost?.user.nickname}
                </span>
                님이 방금 품은 하늘입니다
              </p>
            </ProfileLink>
            <HeartIcon postId={randomPost?.post?.postId} />
          </MainCardInfo>
        </NewContentBox>
      </RandomContentContainer>
      <MainBannerBox $isClick={$isClick}>
        <ButtonTouchBox $isClick={$isClick}>
          {$isClick ? 'now' : 'popular'}
          <button
            onClick={onClickBottomNavHandler}
            aria-label="scroll up and down button"
          >
            <ArrowLong />
          </button>
        </ButtonTouchBox>
        {$isClick ? <Announcement /> : null}
      </MainBannerBox>
    </MainBannerContainer>
  );
};

export default MainBanner;
