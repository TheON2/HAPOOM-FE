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
import Link from 'next/link';
const sentences = [
  '힘들고 지칠 땐 하늘을 바라봐요',
  '당신의 하늘을 공유해주세요',
  '8월 31일 저녁에 떠오른 슈퍼문을 보셨나요?',
  '#슈퍼문 해시태그를 달고 감성을 나눠 보세요:)',
  '#슈퍼문 해시태그 이벤트에 많은 참여 바랍니다.',
  '#슈퍼문 이벤트 참가자는 가입한 이메일로 당첨 소식을 안내드립니다',
  '하늘 사진이 아닌 경우 게시글이 삭제될 수 있습니다',
  '유저 피드백 링크 -> https://forms.gle/ANh4mg8Uf2KGGnuYA',
];
const MainBanner = ({
  data,
  $isClick,
  randomPosts,
  onClickBottomNavHandler,
}: any) => {
  const randomPost = useSelector((state: RootState) => state.notification.post);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number>(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSentenceIndex(
        (prevIndex) => (prevIndex + 1) % sentences.length
      );
    }, 8000);
    return () => clearInterval(intervalId);
  }, []);

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
                님이 품은 하늘입니다
              </p>
            </ProfileLink>
            <HeartIcon postId={randomPost?.post?.postId} />
          </MainCardInfo>
        </NewContentBox>
      </RandomContentContainer>
      <MainBannerBox $isClick={$isClick}>
        <ButtonTouchBox $isClick={$isClick}>
          {$isClick ? 'now' : 'popular'}
          <button onClick={onClickBottomNavHandler}>
            <ArrowLong />
          </button>
        </ButtonTouchBox>
        {$isClick ? (
          <RandomText $isClick={$isClick}>
            {sentences[currentSentenceIndex]}
          </RandomText>
        ) : null}
      </MainBannerBox>
    </MainBannerContainer>
  );
};

export default MainBanner;
