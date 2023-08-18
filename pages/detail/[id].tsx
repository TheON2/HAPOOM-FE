import React, {
  ChangeEvent,
  FormEvent,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import {
  GlobalStyle,
  ImageContainer,
  PreviewContainer,
  StyledButton,
} from '../../styles/write';
import {
  DetialContentSection,
  OtherProfileBox,
  ContentsContainer,
  HashtagBox,
  Hashtag,
  CommentForm,
} from '@/styles/detail';
import { MapComponent } from '@/components/Write/MapComponent';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addPost, deletePost, getPost, updatePost } from '@/api/post';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, wrapper } from '@/redux/config/configStore';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { getAuthToken } from '@/api/user';
import { AUTH_USER, UserResponse } from '@/redux/reducers/userSlice';
import MainBannerSlider from '@/components/Home/MainBannerSlider';
import DetailProfile from '@/components/Detail/DetailProfile';
import MobileBottomNav from '@/components/common/MobileBottomNav';
import { parseCookies, setCookie } from 'nookies';
import { GetServerSidePropsContext, NextPage } from 'next';
import styled from 'styled-components';
import HeartIcon from '@/components/common/HeartIcon';
import Image from 'next/image';
import Button from '@/components/common/Button';
import Comment from '@/components/Detail/Comment';
import KebabMenuUI, {
  KebabMenuStyle,
  KebabMenuAptionButton,
} from '@/components/common/KebabMenuUI';
import PageLayout from '@/components/common/layout/PageLayout';
import {
  getComment,
  updateComment,
  deleteComment,
  addComment,
  reportPost,
} from '@/api/post';
import { identity } from 'lodash';
import Link from 'next/link';
import UpAndDownTab from '@/components/common/UpAndDownTab';
import CustomPlayer from '@/components/Write/CustomPlayer';
import Modal from '@/components/common/Modal';

const DynamicComponentWithNoSSR = dynamic(
  () => import('@/components/Write/YoutubePlayer'),
  { ssr: false }
);
interface Image {
  url: string;
}

interface Props {
  update: string;
  updateId: string;
}

type CommentData = {
  formData: FormData;
  id: string;
};

type CommentUpdateData = {
  formData: FormData;
  id: string;
  commentId: number;
};

type CommentDelete = {
  id: string;
  commentId: number;
};

const Detail: NextPage<Props> = ({ update, updateId }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const id = typeof router.query.id === 'string' ? router.query.id : '';
  const [images, setImages] = useState<File[]>([]);
  const [content, setContent] = useState<string>('');
  const [musicChoose, setMusicChoose] = useState<number>();
  const [selectedTitle, setSelectedTitle] = useState<string>('');
  const [musicTitle, setMusicTitle] = useState<string>('');
  const [audioURL, setAudioURL] = useState<string | undefined>(undefined);
  const [videoId, setVideoId] = useState<string>('');
  const [tags, setTags] = useState<string>('');
  const [location, setLocation] = useState({ name: '', x: 0, y: 0 });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessge, setModalMessge] = useState<any>({
    actionText: '',
    modalMessge: '',
    onClickEvent: '',
  });
  const queryClient = useQueryClient();

  const audioSrc = id ? `http://localhost:3001/test/stream/${id}` : '';

  const { mutate: delete_mutate } = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
      alert('Post deleted');
      router.push('/');
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

  const handleEditClick = () => {
    setCookie(null, 'updateId', id, { path: '/' });
    setCookie(null, 'update', '2', { path: '/' });
    router.push('/post/Write');
  };

  const handleDeleteClick = () => {
    setModalMessge({
      actionText: '삭제',
      modalMessge: '정말로 해당 게시글을 삭제하시겠습니까?',
      onClickEvent: () => delete_mutate(id),
    });
    setIsModalOpen(true);
  };

  const handleReportClick = () => {
    setModalMessge({
      actionText: '신고',
      modalMessge: '해당 사용자를 신고하시겠습니까?',
      onClickEvent: () => report(id),
    });
    setIsModalOpen(true);
  };
  // console.log(isModalOpen);
  const isClientSide = typeof window !== 'undefined';
  const tokenExists = isClientSide ? !!localStorage.getItem('token') : false;

  const { data: userData, isSuccess: tokenSuccess } = useQuery(
    'user',
    getAuthToken,
    {
      onSuccess: (userData: UserResponse) => {
        dispatch(AUTH_USER(userData));
      },
      enabled: tokenExists,
      cacheTime: 0,
    }
  );

  const { isError, data, isSuccess } = useQuery(
    ['post', id],
    () => getPost(id),
    {
      onSuccess: async (data) => {
        setMusicChoose(data.post.musicType);
        setImages(data.images);
        setContent(data.post.content);
        setSelectedTitle(data.post.musicTitle);
        setVideoId(data.post.musicUrl);
        setAudioURL(data.post.musicUrl);
        setTags(data.post.tag);
        setMusicTitle(data.post.musicTitle);
        setLocation({
          name: data.post.placeName,
          x: data.post.latitude,
          y: data.post.longitude,
        });
        setCookie(null, 'userId', data.post.userId, { path: '/' });
      },
    }
  );
  const { data: commentsData } = useQuery('comments', () => getComment(id));

  if (!isSuccess) return <div>Loading...</div>;
  return (
    <>
      <>{!(update === '3' && location.x === 0) && <></>}</>
      <GlobalStyle />
      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        actionText={modalMessge.actionText}
        onClickEvent={modalMessge.onClickEvent}
      >
        {modalMessge.modalMessge}
      </Modal>
      <ContentsContainer>
        <OtherProfileBox>
          <Link href={`/User/sss@gmail.com`}>
            <DetailProfile
              userImage={userData?.userImage}
              preset={userData?.preset}
              nick={userData?.nickname}
            />
          </Link>
          <KebabMenuUI>
            <KebabMenuStyle>
              <KebabMenuAptionButton onClick={handleDeleteClick}>
                글 삭제하기 <span></span>
              </KebabMenuAptionButton>
              <KebabMenuAptionButton onClick={handleEditClick}>
                글 수정하기 <span></span>
              </KebabMenuAptionButton>
              <KebabMenuAptionButton onClick={handleReportClick}>
                신고하기 <span></span>
              </KebabMenuAptionButton>
            </KebabMenuStyle>
          </KebabMenuUI>
        </OtherProfileBox>
        <div className="carousel-box">
          <MainBannerSlider data={images} />
        </div>
        <DetialContentSection>
          <HeartIcon postId={parseInt(id)} />
          <p className="detail-content-text">{content}</p>
          <HashtagBox>
            {tags.split(',').map((tag, index) => (
              <Hashtag key={index}>#{tag.trim()}</Hashtag>
            ))}
          </HashtagBox>
        </DetialContentSection>
        <DetialContentSection
          style={{
            display: `flex`,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {musicChoose === 1 && (
            <>
              <DynamicComponentWithNoSSR
                videoId={videoId}
                setVideoId={setVideoId}
                setSelectedTitle={setSelectedTitle}
                update={update}
              />
            </>
          )}
          {musicChoose === 2 && (
            <CustomPlayer
              setAudioUrl={setAudioURL}
              audioUrl={audioURL}
              title={musicTitle}
            />
          )}
          {musicChoose === 3 && (
            <CustomPlayer
              setAudioUrl={setAudioURL}
              audioUrl={audioURL}
              title={musicTitle}
            />
          )}
        </DetialContentSection>
        <DetialContentSection>
          <MapComponent
            setLocation={setLocation}
            location={location}
            update={update}
          />
        </DetialContentSection>
        <DetialContentSection>
          <h3>댓글</h3>
          <Comment data={commentsData} id={id} userData={userData} />
        </DetialContentSection>
      </ContentsContainer>
    </>
  );
};

export default Detail;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const cookies = parseCookies(context);
  const update = cookies.update || '';
  const updateId = cookies.updateId || '';

  return {
    props: {
      update,
      updateId,
    },
  };
};
