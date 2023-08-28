import React, { useState } from 'react';
import { FeedSection } from '../../styles/feed';
import { useInfiniteQuery, useMutation } from 'react-query';
import { reportPost } from '@/api/post';
import Modal from '../common/Modal';
import { InView, useInView } from 'react-intersection-observer';
import FeedPost from './FeedPost';

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
  console.log('feeddata', data);
  const { mutate: report } = useMutation(reportPost, {
    onSuccess: (message) => {
      setModalMessge({
        actionText: '확인',
        modalMessge: message,
        onClickEvent: null,
      });
      setIsModalOpen(true);
    },
  });

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
        .map((feed: Feed) => (
          <FeedPost
            key={feed.postId}
            feed={feed}
            handleReportClick={handleReportClick}
            toggleExpanded={toggleExpanded}
            isExpanded={expandedPosts[feed.postId]}
          />
        ))}
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
