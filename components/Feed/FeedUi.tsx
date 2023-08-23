import Image from 'next/image';
import React, { useState } from 'react';
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
  LikeIconContainer,
} from '../../styles/feed';
import KebabMenuUI, {
  KebabMenuAptionButton,
  KebabMenuStyle,
} from '../common/KebabMenuUI';
import { FeedPlayer } from '../common/SVG';
import { useMutation, useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { reportPost } from '@/api/post';
import Modal from '../common/Modal';
import HeartIcon from '../common/HeartIcon';
import ProfileImage from '../common/ProfileImage';
import axios from 'axios';

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
interface ModalMessage {
  actionText: string;
  modalMessge: string | undefined;
  onClickEvent: any;
}
type Feed = {
  email: string;
  image: string;
  musicTitle: string;
  musicUrl: string | null;
  nickname: string;
  postId: number;
  preset: number;
  updatedAt: string;
  userImage: string;
};
const FeedUi = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessge, setModalMessge] = useState<ModalMessage>({
    actionText: '',
    modalMessge: '',
    onClickEvent: '',
  });

  const getFeed = async () => {
    const response = await axios.get(`http://localhost:3001/api/main/feed`);
    return response.data;
  };

  const { data } = useQuery('feed', getFeed);
  console.log(data?.feed);

  const { mutate: report } = useMutation(reportPost, {
    onSuccess: (messag) => {
      setModalMessge({
        actionText: '확인',
        modalMessge: messag,
        onClickEvent: null,
      });
      setIsModalOpen(true);
    },
  });

  const moveDetailPage = (id: number) => {
    router.push(`/detail/${id}`);
  };
  const moveUserPage = (email: string) => {
    router.push(`/User/${email}`);
  };

  const handleReportClick = (id: any) => {
    setModalMessge({
      actionText: '신고',
      modalMessge: '해당 사용자를 신고하시겠습니까?',
      onClickEvent: () => report(id),
    });
    setIsModalOpen(true);
  };

  return (
    <FeedSection>
      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        actionText={modalMessge.actionText}
        onClickEvent={modalMessge.onClickEvent}
      >
        {modalMessge.modalMessge}
      </Modal>
      {data?.feed.map((feed: Feed) => {
        return (
          <FeedContainer key={feed.postId}>
            <FeedHeader>
              <div onClick={() => moveUserPage(feed.email)}>
                <ProfileImage userImage={feed.userImage} preset={feed.preset} />
              </div>
              <FeedUserNickName>{feed.nickname}</FeedUserNickName>
              <FeedTime>{timeSince(feed.updatedAt)}</FeedTime>
              <FeedIcon>
                <KebabMenuUI>
                  <KebabMenuStyle>
                    {feed.postId && (
                      <KebabMenuAptionButton
                        onClick={() => handleReportClick(feed.postId)}
                      >
                        신고하기 <span></span>
                      </KebabMenuAptionButton>
                    )}
                  </KebabMenuStyle>
                </KebabMenuUI>
              </FeedIcon>
            </FeedHeader>

            <MainImageContainer>
              <Image
                src={feed.image}
                alt={'Feed Image'}
                width={272}
                height={188}
                quality={100}
                priority
                onClick={() => moveDetailPage(feed.postId)}
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
