import Image from 'next/image';
import React from 'react';
import {
  FeedContainer,
  FeedHeader,
  FeedMusicLikeBox,
  FeedSection,
  FeedTime,
  FeedUserNickName,
  MusicBox,
} from '../../styles/feed';
import { feedData } from './data';

const FeedUi = () => {
  const data = feedData;
  return (
    <FeedSection>
      <FeedContainer>
        <FeedHeader>
          <div>
            <Image
              src={data[0].userImage}
              alt={data[0].alt}
              width={33}
              height={33}
              quality={100}
            />
          </div>
          <FeedUserNickName>{data[0].userNickname}</FeedUserNickName>
          <FeedTime>{data[0].time}</FeedTime>
          <div>...아이콘</div>
        </FeedHeader>

        <div>
          <Image
            src={data[0].src}
            alt={data[0].alt}
            width={272}
            height={189}
            quality={100}
          />
        </div>

        <FeedMusicLikeBox>
          <MusicBox>
            <div>뮤직아이콘</div>
            <div>버즈-가시</div>
            <div>이퀄라이저</div>
          </MusicBox>
          <div>아이콘</div>
        </FeedMusicLikeBox>
      </FeedContainer>
    </FeedSection>
  );
};

export default FeedUi;
