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

  const audioSrc = id ? `http://localhost:3001/test/stream/${id}` : '';

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
      formData.append('comment', comment);
      commentCreate({ formData, id });
    } else if (commentEdit.action === 'edit') {
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
      },
    }
  );

  const { data: commentsData } = useQuery('comments', () => getComment(id));

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

              <>
                {!(update === '3' && location.x === 0) && (
                  <>
                    <Header />
                    <GlobalStyle />
                    <div
                      style={{
                        display: 'block',
                        textAlign: 'center',
                      }}
                    >
                      <ImageContainer>
                        <button onClick={handleEditClick}>글 수정하기</button>
                        <button type="button" onClick={handleDeleteClick}>
                          글 삭제하기
                        </button>
                        <div style={{ width: '100%' }}>
                          <DetailProfile
                            userImage={userData?.userImage}
                            preset={userData?.preset}
                            nick={userData?.nickname}
                          />
                        </div>
                        <MainBannerSlider data={images} />
                        <div
                          style={{
                            width: '400px',
                            height: '100px',
                            textAlign: 'left',
                            margin: '20px',
                          }}
                        >
                          {content}
                        </div>
                        <div
                          style={{
                            width: '400px',
                            textAlign: 'center',
                            margin: '20px',
                          }}
                        >
                          {tags.split(',').map((tag, index) => (
                            <span
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
                            </span>
                          ))}
                        </div>
                        <ImageContainer>
                          {musicChoose === 1 && (
                            <>
                              <DynamicComponentWithNoSSR
                                videoId={videoId}
                                setVideoId={setVideoId}
                                setSelectedTitle={setSelectedTitle}
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
                          <MapComponent
                            setLocation={setLocation}
                            location={location}
                            update={update}
                          />
                          <h4>댓글</h4>
                          <div>
                            <div></div>
                          </div>
                        </ImageContainer>
                      </ImageContainer>
                    </div>
                    <Footer />
                    <MobileBottomNav />
                  </>
                )}
              </>
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
          <UpAndDownTab
            onClickEvent={handleCommentShowHandler}
            $isUp={commentEdit.show}
          >
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
          </UpAndDownTab>
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
