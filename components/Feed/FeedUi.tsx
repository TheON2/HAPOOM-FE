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
import { FeedPlayer } from '../common/SVG';
import HeartIcon from '../common/HeartIcon';
import { useMutation, useQuery } from 'react-query';
import ProfileImage from '../common/ProfileImage';
import { useRouter } from 'next/router';
import KebabMenuUI, {
  KebabMenuAptionButton,
  KebabMenuStyle,
} from '../common/KebabMenuUI';
import { getFeed, reportPost } from '@/api/post';
import Modal from '../common/Modal';
import { FeedData } from '@/pages/feed/Feed';

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
type FeedUiProps = {
  initialFeedData: FeedData;
};
const FeedUi: React.FC<FeedUiProps> = ({ initialFeedData }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessge, setModalMessge] = useState<ModalMessage>({
    actionText: '',
    modalMessge: '',
    onClickEvent: '',
  });

  const { data } = useQuery('feed', getFeed, { initialData: initialFeedData });
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
      {data?.feed.map((feed: any) => {
        return (
          <FeedContainer key={feed.postId}>
            <FeedHeader>
              <div>
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
                height={189}
                quality={100}
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
