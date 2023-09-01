import React, { useCallback, useEffect, useState } from 'react';
import { FeedSection } from '../../styles/feed';
import { useInfiniteQuery, useMutation } from 'react-query';
import { getFeed, reportPost } from '@/api/post';
import Modal from '../common/Modal';
import { InView, useInView } from 'react-intersection-observer';
import FeedPost from './FeedPost';
import { useRouter } from 'next/router';

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
  tags: string[];
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
  const route = useRouter();

  let results: Feed[] = [];
  const {
    data,
    isLoading,
    isSuccess,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('feeds', ({ pageParam = 1 }) => getFeed({ pageParam }), {
    getNextPageParam: (lastPage, allPages) => {
      const morePagesExist = allPages.length < lastPage.totalPages;
      return morePagesExist ? allPages.length + 1 : false;
    },
  });
  console.log('feed', data);
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

  const handleReportClick = useCallback(
    (id: any) => {
      const token = localStorage.getItem('token');
      if (token) {
        setModalMessge({
          actionText: '신고',
          modalMessge: '해당 사용자를 신고하시겠습니까?',
          onClickEvent: () => report(id),
        });
      } else {
        setModalMessge({
          actionText: '확인',
          modalMessge: '로그인이 필요한 서비스입니다.',
          onClickEvent: () => route.push('/auth/SignIn'),
        });
      }
      setIsModalOpen(true);
    },
    [report]
  );

  const toggleExpanded = useCallback((postId: number) => {
    setExpandedPosts((prevState: ExpandedPosts) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  }, []);

  const handleFetchMore = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  if (isSuccess) {
    data.pages.forEach((page) => results.push(...page.content));
  }

  useEffect(() => {
    const scrollPos = sessionStorage.getItem('scrollPos');
    if (scrollPos) {
      window.scrollTo(0, parseInt(scrollPos));
    }
    window.addEventListener('beforeunload', () => {
      sessionStorage.removeItem('scrollPos');
    });
  }, [data]);

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
      {results?.map((post: Feed) => (
        <FeedPost
          key={post.postId}
          feed={post}
          handleReportClick={handleReportClick}
          toggleExpanded={toggleExpanded}
          isExpanded={expandedPosts[post.postId]}
        />
      ))}

      {hasNextPage && (
        <InView
          as="div"
          onChange={(inView, entry) => {
            if (inView) handleFetchMore();
          }}
          style={{ height: '200px', opacity: 0 }}
        />
      )}
    </FeedSection>
  );
};

export default FeedUi;
