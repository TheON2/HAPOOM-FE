import Image from 'next/image';
import React from 'react';
import {
  FeedContainer,
  FeedHeader,
  FeedMusicLikeBox,
  FeedSection,
  FeedTime,
  FeedIcon,
  FeedUserNickName,
  MusicBox,
  MainImageContainer,
  Equalizer,
  LikeIconContainer,
} from '../../styles/feed';
import { feedData } from './data';
import { FeedPlayer } from '../common/SVG';
import HeartIcon from '../common/HeartIcon';

const timeSince = (date: string) => {
  const now: Date = new Date();
  const inputDate: Date = new Date(date);
  const seconds: number = Math.floor(
    (now.getTime() - inputDate.getTime()) / 1000
  );
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return days + '일 전';
  } else if (hours > 0) {
    return hours + '시간 전';
  } else if (minutes > 0) {
    return minutes + '분 전';
  } else {
    return '방금 전';
  }
};

const FeedUi = () => {
  const data = feedData;

  return (
    <FeedSection>
      {data.map((feed) => {
        return (
          <FeedContainer key={feed.id}>
            <FeedHeader>
              <div>
                <Image
                  src={feed.userImage}
                  alt={feed.alt}
                  width={33}
                  height={33}
                  quality={100}
                />
              </div>
              <FeedUserNickName>{feed.userNickname}</FeedUserNickName>
              <FeedTime>{timeSince(feed.createdAt)}</FeedTime>
              <FeedIcon>...I</FeedIcon>
            </FeedHeader>

            <MainImageContainer>
              <Image
                src={feed.src}
                alt={feed.alt}
                width={272}
                height={189}
                quality={100}
              />
            </MainImageContainer>

            <FeedMusicLikeBox>
              <MusicBox>
                <FeedPlayer />
                <div>{feed.musicTitle}</div>
                <Equalizer>EI</Equalizer>
              </MusicBox>
              <LikeIconContainer>
                <HeartIcon postId={feed.id} />
              </LikeIconContainer>
            </FeedMusicLikeBox>
          </FeedContainer>
        );
      })}
    </FeedSection>
  );
};

export default FeedUi;
