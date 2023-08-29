import Image from 'next/image';
import React from 'react';
import {
  ButtonTouchBox,
  MainBannerBox,
  MainBannerContainer,
  MainCardInfo,
  NewContentBox,
  RandomContentContainer,
  RandomText,
} from '@/styles/home';
import { ArrowLong } from '../common/SVG';
import ProfileImage from '../common/ProfileImage';
import HeartIcon from '../common/HeartIcon';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/config/configStore';
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
          <figure>
            <Image
              src={randomPost?.images}
              alt="random user image"
              width={768}
              height={800}
              loading="eager"
              priority={true}
            />
          </figure>
          <MainCardInfo>
            <ProfileImage
              userImage={randomPost?.user?.userImage}
              preset={randomPost?.user.preset}
            />
            <p>
              <span className="nickname-hightlight">
                {randomPost?.user.nickname}
              </span>
              님이 품은 하늘입니다
            </p>
            <HeartIcon postId={randomPost?.post.postId} />
          </MainCardInfo>
        </NewContentBox>
      </RandomContentContainer>

      <MainBannerBox $isClick={$isClick}>
        <ButtonTouchBox $isClick={$isClick}>
          more
          <button onClick={onClickBottomNavHandler}>
            <ArrowLong />
          </button>
        </ButtonTouchBox>
        {/* {randomPosts && ( */}
        {$isClick ? (
          <RandomText $isClick={$isClick}>
            랜덤글
            {randomPosts && randomPosts[0].content1}
            <span>{randomPosts && randomPosts[0].content2}</span>
          </RandomText>
        ) : null}

        {/* )} */}
      </MainBannerBox>
    </MainBannerContainer>
  );
};

export default MainBanner;
