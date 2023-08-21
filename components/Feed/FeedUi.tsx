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

const FeedUi = () => {
  return (
    <FeedSection>
      <FeedContainer>
        <FeedHeader>
          <Image />
          <FeedUserNickName>닉네임</FeedUserNickName>
          <FeedTime>19시</FeedTime>
          <div>아이콘</div>
        </FeedHeader>

        <Image />

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
