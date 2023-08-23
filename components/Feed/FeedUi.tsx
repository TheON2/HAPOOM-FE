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
import { FeedPlayer } from '../common/SVG';
import HeartIcon from '../common/HeartIcon';
import { useQuery } from 'react-query';
import axios from 'axios';
import ProfileImage from '../common/ProfileImage';

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
  const getFeed = async () => {
    const response = await axios.get(`http://localhost:3001/api/main/feed`);
    return response.data;
  };
  const { data } = useQuery('feedData', getFeed);
  console.log(data?.feed);

  return (
    <FeedSection>
      {data?.feed.map((feed: any) => {
        return (
          <FeedContainer key={feed.postId}>
            <FeedHeader>
              <div>
                <ProfileImage userImage={feed.userImage} preset={feed.preset} />
              </div>
              <FeedUserNickName>{feed.nickname}</FeedUserNickName>
              <FeedTime>{timeSince(feed.updatedAt)}</FeedTime>
              <FeedIcon>...I</FeedIcon>
            </FeedHeader>

            <MainImageContainer>
              <Image
                src={feed.image}
                alt={'Feed Image'}
                width={272}
                height={189}
                quality={100}
              />
            </MainImageContainer>

            <FeedMusicLikeBox>
              <MusicBox>
                <FeedPlayer />
                <div>{feed.musicTitle}</div>
              </MusicBox>
              <LikeIconContainer>
                <HeartIcon postId={feed.postId} />
              </LikeIconContainer>
            </FeedMusicLikeBox>
          </FeedContainer>
        );
      })}
    </FeedSection>
  );
};

export default FeedUi;
