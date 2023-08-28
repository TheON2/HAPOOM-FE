import Image from 'next/image';
import React, { useEffect, useState } from 'react';
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
  FeedContent,
  MoreButton,
  FeedContentBox,
} from '../../styles/feed';
import KebabMenuUI, {
  KebabMenuAptionButton,
  KebabMenuStyle,
} from '../common/KebabMenuUI';
import { FeedPlayer } from '../common/SVG';
import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { reportPost } from '@/api/post';
import Modal from '../common/Modal';
import HeartIcon from '../common/HeartIcon';
import ProfileImage from '../common/ProfileImage';
import { InView, useInView } from 'react-intersection-observer';

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
interface ExpandedPosts {
  [key: number]: boolean;
}
interface Feed {
  content: string;
  email: string;
  image: string;
  musicTitle: string;
  musicUrl: string | null;
  nickname: string;
  updatedAt: string;
  userImage: string;
  postId: number;
  preset: number;
  userId: number;
}
const FeedUi = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessge, setModalMessge] = useState<ModalMessage>({
    actionText: '',
    modalMessge: '',
    onClickEvent: '',
  });
  const [expandedPosts, setExpandedPosts] = useState<ExpandedPosts>({});
  const [ref, inView] = useInView();

  const getFeed = async ({ pageParam }: { pageParam: number }) => {
    return fetch(
      `${process.env.NEXT_PUBLIC_LOCAL_SERVER}/api/main/feed?page=${pageParam}`
    ).then((res) => res.json());
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery('feed', ({ pageParam = 1 }) => getFeed({ pageParam }), {
    getNextPageParam: (lastPage, pages) => {
      console.log('Inside getNextPageParam', lastPage, pages);
      return lastPage.nextPage;
    },
  });

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
  const moveUserPage = (userId: number) => {
    router.push(`/User/${userId}`);
  };

  const handleReportClick = (id: any) => {
    setModalMessge({
      actionText: '신고',
      modalMessge: '해당 사용자를 신고하시겠습니까?',
      onClickEvent: () => report(id),
    });
    setIsModalOpen(true);
  };

  const toggleExpanded = (postId: number) => {
    setExpandedPosts((prevState: ExpandedPosts) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  if (isFetching || isFetchingNextPage) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러가 발생했습니다</div>;
  }

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
      {data?.pages
        .flatMap((page) => page.feed)
        .map((feed: Feed) => {
          const isExpanded = expandedPosts[feed.postId];
          const content = isExpanded
            ? feed.content
            : `${feed.content.slice(0, 30)}......`;
          return (
            <FeedContainer key={feed.postId}>
              <FeedHeader>
                <div onClick={() => moveUserPage(feed.userId)}>
                  <ProfileImage
                    userImage={feed.userImage}
                    preset={feed.preset}
                  />
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
              <FeedContentBox>
                <FeedContent>{content}</FeedContent>
                {feed.content.length > 30 && (
                  <MoreButton onClick={() => toggleExpanded(feed.postId)}>
                    {isExpanded ? null : '더보기'}
                  </MoreButton>
                )}
              </FeedContentBox>
            </FeedContainer>
          );
        })}
      {hasNextPage && (
        <InView
          as="div"
          onChange={(inView, entry) => {
            if (inView) fetchNextPage();
          }}
          style={{ height: '200px', opacity: 0 }}
        />
      )}
    </FeedSection>
  );
};

export default FeedUi;
