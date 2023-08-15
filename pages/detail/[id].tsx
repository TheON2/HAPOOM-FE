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

const DetialContentSection = styled.section`
  margin-bottom: 40px;
  h3 {
    width: 100%;
    padding-bottom: 8px;
    border-bottom: 1px solid #cdcdcd;
    font-size: 16px;
    line-height: 16px;
    &::after {
      content: '';
      display: block;
      position: relative;
      bottom: -10px;
      width: 60px;
      height: 3px;
      background-color: #0084ff;
    }
  }
  .comments-header {
    display: flex;
    gap: 8px;
    h3 {
      width: 60%;
    }
    button {
      width: 40%;
      padding: 4px 22px 2px;
    }
  }
  .button-box {
    width: 40%;
    display: flex;
    gap: 8px;
    button {
      width: 50%;
      padding: 4px 4px 2px;
    }
  }
  & > div:last-child {
    border: none;
  }
`;

const OtherProfileBox = styled.div`
  width: 100%;
  padding: 12px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ContentsContainer = styled.div`
  width: 100%;
  padding: 0 24px;
  /* position: relative; */
  .heart {
    position: static;
    width: 36px;
    height: 36px;
    margin-top: 10px;
    margin-bottom: 12px;
  }
  .detail-content-text {
    margin-bottom: 12px;
  }
  .carousel-box {
    border-radius: 8px;
    overflow: hidden;
    height: 26vh;
  }
`;
const HashtagBox = styled.div`
  display: flex;
  gap: 8px;
`;

const Hashtag = styled.div`
  padding: 4px 12px 2px;
  border: 1px solid #000;
  border-radius: 20px;
  font-size: 10px;
`;

type styleProps = {
  $up?: boolean;
  className: any;
};

const CreateComment = styled.div<styleProps>`
  width: 100%;
  /* height: 80vh; */
  padding: 20px 24px;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 15;
  border-radius: 25px 25px 0 0;
  background-color: #fff;
  box-shadow: 0px -5px 10px rgba(0, 0, 0, 0.2);

  &.up {
    animation: comment-up 0.8s forwards;
  }
  &.down {
    animation: comment-down 0.8s forwards;
  }
  span {
    display: block;
    width: 23px;
    height: 3px;
    margin: 0 auto 25px;
    border-radius: 2px;
    background-color: #ddd;
  }
  @keyframes comment-up {
    0% {
      transform: translateY(70%);
    }
    100% {
      transform: translateY();
    }
  }
  @keyframes comment-down {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(70%);
    }
  }
`;

const CommentForm = styled.form`
  width: 100%;
  padding: 8px 0;
  textarea {
    width: 100%;
    height: 141px;
    padding: 16px 12px;
    margin-top: 8px;
    resize: none;
    border: 1px solid #0084ff;
    border-radius: 3px;
    ::placeholder {
      color: #b3b3b3;
    }
  }
`;

const COMMENT = [
  {
    commentId: 2,
    userId: 5,
    nickname: 'test',
    userImage: '/c1.jpeg',
    comment: 'test1234',
    createdAt: '2023-08-10T02:51:56.000Z',
    updatedAt: '2023-08-10T02:51:56.000Z',
  },
  {
    commentId: 3,
    userId: 5,
    nickname: 'test',
    userImage: '/c1.jpeg',
    comment: 'test1234',
    createdAt: '2023-08-10T02:51:56.000Z',
    updatedAt: '2023-08-10T02:51:56.000Z',
  },
  {
    commentId: 5,
    userId: 6,
    nickname: 'test',
    userImage: '/c1.jpeg',
    comment: 'test1234',
    createdAt: '2023-08-10T02:51:56.000Z',
    updatedAt: '2023-08-10T02:51:56.000Z',
  },
  {
    commentId: 6,
    userId: 2,
    nickname: 'test',
    userImage: '/c1.jpeg',
    comment: 'test1234',
    createdAt: '2023-08-10T02:51:56.000Z',
    updatedAt: '2023-08-10T02:51:56.000Z',
  },
  {
    commentId: 7,
    userId: 5,
    nickname: 'test',
    userImage: '/c1.jpeg',
    comment: 'test1234',
    createdAt: '2023-08-10T02:51:56.000Z',
    updatedAt: '2023-08-10T02:51:56.000Z',
  },
];

const Detail: NextPage<Props> = ({ update, updateId }) => {
  const router = useRouter();
  const id = typeof router.query.id === 'string' ? router.query.id : '';
  const [images, setImages] = useState<File[]>([]);
  const [content, setContent] = useState<string>('');
  const [selectedTitle, setSelectedTitle] = useState<string>('');
  const [videoId, setVideoId] = useState<string>('');
  const [tags, setTags] = useState<string>('');
  const [location, setLocation] = useState({ name: '', x: 0, y: 0 });
  const [isShow, setIsShow] = useState<boolean>(false);
  const [commentEdit, setCommentEdit] = useState<any>({
    show: false,
    action: '',
    uiTitle: '',
    buttonText: '',
    postId: '',
  });
  const [comment, setComment] = useState<string>('');
  const queryClient = useQueryClient();

  const { mutate: delete_mutate } = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
      alert('Post deleted');
      router.push('/');
    },
  });

  const { mutate: report } = useMutation(reportPost, {
    onSuccess: () => {
      // queryClient.invalidateQueries('posts');
      alert('신고 완료했습니다.');
    },
  });

  const handleEditClick = () => {
    setCookie(null, 'updateId', id, { path: '/' });
    setCookie(null, 'update', '2', { path: '/' });
    router.push('/post/Write');
  };

  const handleDeleteClick = () => {
    delete_mutate(id);
  };

  const handleReportClick = () => {
    report(id);
    // alert('신고기능');
  };

  const handleCommentCreateHandler = () => {
    setIsShow(true);
    setCommentEdit({
      show: true,
      action: 'create',
      uiTitle: '댓글 생성',
      buttonText: '업로드',
      commentId: '',
    });
  };

  const handleCommentEditHandler = (commentId: number, preComment: string) => {
    setIsShow(true);
    setCommentEdit({
      show: true,
      action: 'edit',
      uiTitle: '댓글 수정',
      buttonText: '수정',
      commentId: commentId,
    });
    setComment(preComment);
  };

  const handleCommentShowHandler = () => {
    setCommentEdit((pre: any) => ({
      ...pre,
      show: !commentEdit.show,
    }));
  };

  const handleCommentExitHandler = () => {
    setIsShow(!isShow);
  };

  const onChangeCommentHandler = (e: any) => {
    setComment(e.target.value);
  };
  // console.log(update);
  // console.log(updateId);
  // console.log(id);
  type comment = {
    formData: FormData;
    id?: string;
  };

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
  // console.log(id);
  // const commentCreate = useMutation(({ formData, id }: comment) =>
  //   addComment(formData, id),
  // );
  const { mutate: commentCreate } = useMutation<void, Error, CommentData>(
    (comment) => addComment(comment),
    {
      onSuccess: () => {
        alert('성공하냐');
      },
    }
  );
  const { mutate: commentUpdate } = useMutation<void, Error, CommentUpdateData>(
    (comment) => updateComment(comment),
    {
      onSuccess: () => {
        alert('성공하냐');
      },
    }
  );
  const { mutate: commentDelete } = useMutation<void, Error, CommentDelete>(
    (comment) => deleteComment(comment),
    {
      onSuccess: () => {
        alert('성공하냐');
      },
    }
  );

  const onClickDeleteCommentHandler = (commentId: number) => {
    commentDelete({ id, commentId });
  };

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (commentEdit.action === 'create') {
      // alert('create');
      formData.append('comment', comment);
      commentCreate({ formData, id });
    } else if (commentEdit.action === 'edit') {
      // alert('edit');
      formData.append('comment', comment);
      const commentId = commentEdit.commentId;
      commentUpdate({ formData, id, commentId });
    }
  };

  const dispatch = useDispatch();
  const { data: userData, isSuccess: tokenSuccess } = useQuery(
    'user',
    getAuthToken,
    {
      onSuccess: (userData: UserResponse) => {
        dispatch(AUTH_USER(userData));
      },
      cacheTime: 0,
    }
  );

  const { isError, data, isSuccess } = useQuery(
    ['post', id],
    () => getPost(id),
    {
      onSuccess: async (data) => {
        // console.log(data);
        setImages(data.post.images);
        setContent(data.post.content);
        setSelectedTitle(data.post.musicTitle);
        setVideoId(data.post.musicUrl);
        setTags(data.tag);
        setLocation({
          name: data.post.placeName,
          x: data.post.latitude,
          y: data.post.longitude,
        });
      },
    }
  );

  const { data: commentsData } = useQuery('comments', () => getComment(id));
  console.log(commentsData);

  console.log(data);
  console.log(data?.userId);
  if (!isSuccess) return <div>Loading...</div>;
  return (
    <div style={{ backgroundColor: ` #2797FF` }}>
      <Header />
      <GlobalStyle />
      <PageLayout>
        {/* <ImageContainer> */}
        <ContentsContainer>
          <OtherProfileBox>
            <Link href={`/User/User/${data?.post?.userId}`}>
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
            <HeartIcon postId={1} />
            <p className="detail-content-text">
              {content}일정을 정해봅시다. 오늘은 마음이 좋네요~!일정을
              정해봅시다. 오늘은 마음이 좋네요~!일정을 정해봅시다. 오늘은 마음이
              좋네요~!일정을 정해봅시다. 오늘은 마음이 좋네요~!일정을
              정해봅시다. 오늘은 마음이 좋네요~!일정을 정해봅시다. 오늘은 마음이
              좋네요~!
            </p>
            <HashtagBox>
              <Hashtag>#하늘을품다</Hashtag>
              <Hashtag>#공룡크아앙</Hashtag>
              <Hashtag>#하늘을품다</Hashtag>
              {/* {tags.split(',').map((tag, index) => (
              <Hashtag
                key={index}
                style={{
                  display: 'inline-block',
                  padding: '5px',
                  border: '1px solid #000',
                  marginRight: '5px',
                  borderRadius: '5px',
                }}
              >
                #{tag.trim()}
              </Hashtag>
            ))} */}
            </HashtagBox>
          </DetialContentSection>
          <DetialContentSection>
            <MapComponent
              setLocation={setLocation}
              location={location}
              update={update}
            />
          </DetialContentSection>
          <DetialContentSection>
            <div className="comments-header">
              <h3>댓글</h3>
              <Button onClick={handleCommentCreateHandler}>댓글쓰기</Button>
            </div>
            {commentsData.comments.map((comment: any) => {
              return (
                <>
                  <Comment
                    onClickUpdateEvent={handleCommentEditHandler}
                    onClcikDeleteEvent={onClickDeleteCommentHandler}
                    data={comment}
                  />
                </>
              );
            })}
          </DetialContentSection>
        </ContentsContainer>
        <ImageContainer>
          {/* <DynamicComponentWithNoSSR
              videoId={videoId}
              setVideoId={setVideoId}
              setSelectedTitle={setSelectedTitle}
            /> */}
        </ImageContainer>
        {/* </ImageContainer> */}
        {isShow ? (
          <CreateComment className={commentEdit.show ? `up` : `down`}>
            <span onClick={handleCommentShowHandler}></span>
            <DetialContentSection>
              <CommentForm onSubmit={onSubmitHandler}>
                <div className="comments-header">
                  <h3>{commentEdit.uiTitle}</h3>
                  <div className="button-box">
                    <Button onClick={handleCommentExitHandler}>닫기</Button>
                    <Button type="submit">{commentEdit.buttonText}</Button>
                  </div>
                </div>
                <div>
                  <textarea
                    name=""
                    id=""
                    placeholder="댓글을 입력해주세요"
                    value={comment}
                    onChange={onChangeCommentHandler}
                  />
                </div>
              </CommentForm>
            </DetialContentSection>
          </CreateComment>
        ) : null}
        <Footer />
      </PageLayout>
      <MobileBottomNav />
    </div>
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
