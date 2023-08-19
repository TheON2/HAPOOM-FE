import React, { FormEvent, useEffect, useState } from 'react';
import {
  GlobalStyle,
  ImageContainer,
  PreviewContainer,
  StyledButton,
} from '../../styles/write';
import Dropzone from '@/components/Write/Dropzone';
import ImagePreview from '@/components/Write/ImagePreview';
import { YouTubeSearch } from '@/components/Write/YoutubeSearchInput';
import { MapComponent } from '@/components/Write/MapComponent';
import ContentArea from '@/components/Write/ContentArea';
import TagInput from '@/components/Write/TagInput';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addPost, getPost, updatePost } from '@/api/post';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, wrapper } from '@/redux/config/configStore';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { getAuthToken } from '@/api/user';
import { AUTH_USER, UserResponse } from '@/redux/reducers/userSlice';
import MobileBottomNav from '@/components/common/MobileBottomNav';
import { parseCookies, setCookie } from 'nookies';
import { GetServerSidePropsContext, NextPage } from 'next';
import RecordPlayer from '@/components/Write/RecordPlayer';
import CustomPlayer from '@/components/Write/CustomPlayer';
import MusicSelector from '@/components/Write/MusicSelector';
import { Form } from 'react-bootstrap';
import Accordion from '@/components/Write/Accordion';
import youtube from '@/public/youtube.png';
import music from '@/public/music.png';
import record from '@/public/record.png';
import UpAndDownTab from '@/components/common/UpAndDownTab';
import CustomButton from '@/components/Write/CustomButton';

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
  data: any;
}


const Write: NextPage<Props> = ({ update, updateId, data }) => {

  const [isShow, setIsShow] = useState<boolean>(false);
  const [commentEdit, setCommentEdit] = useState<any>({
    show: false,
    action: '',
    uiTitle: '',
    buttonText: '',
    postId: '',
  });
  const handleCommentCreateHandler = () => {
    setIsShow(true);
    setCommentEdit({
      show: true,
      action: 'create',
      uiTitle: '음악 선택',
      buttonText: '업로드',
      commentId: '',
    });
  };

  const handleCommentShowHandler = () => {
    // if (commentEdit.show) {
    //   setMusicChoose(0);
    // }
    setCommentEdit((pre: any) => ({
      ...pre,
      show: !commentEdit.show,
    }));
  };

  const [isShowMap, setIsShowMap] = useState<boolean>(false);
  const [mapEdit, setMapEdit] = useState<any>({
    show: false,
    action: '',
    uiTitle: '',
    buttonText: '',
    postId: '',
  });
  const handleMapCreateHandler = () => {
    setIsShowMap(true);
    setMapEdit({
      show: true,
      action: 'create',
      uiTitle: '위치 선택',
      buttonText: '업로드',
      commentId: '',
    });
  };

  const handleMapShowHandler = () => {
    // if (commentEdit.show) {
    //   setMusicChoose(0);
    // }
    setMapEdit((pre: any) => ({
      ...pre,
      show: !mapEdit.show,
    }));
  };

  const [images, setImages] = useState<File[]>([]);
  const [content, setContent] = useState<string>('');
  const [musicChoose, setMusicChoose] = useState<number>(0);
  const [audioFile, setAudioFile] = useState<Blob | null>(null);
  const [slicedAudioFile, setSlicedAudioFile] = useState<Blob | null>(null);
  const [audioURL, setAudioURL] = useState<string | undefined>(undefined);
  const [musicURL, setMusicURL] = useState<string>('');
  const [slicedAudioURL, setSlicedAudioURL] = useState<string | undefined>(
    undefined
  );
  const [selectedTitle, setSelectedTitle] = useState<string>('');
  const [videoId, setVideoId] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [location, setLocation] = useState({ name: '', x: 0, y: 0 });
  const queryClient = useQueryClient();
  const router = useRouter();

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

  const removeImage = (index: number) => {
    setImages((images) => images.filter((_, i) => i !== index));
  };

  const handleAccordionClick = (value: number) => {
    // 현재 선택된 아코디언과 클릭한 아코디언이 같으면 닫히고, 그렇지 않으면 열립니다.
    if (musicChoose === value) {
      setMusicChoose(0); // 0은 닫힌 상태를 나타냅니다.
    } else {
      setMusicChoose(value);
    }
  };

  const handlePostSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (images.length === 0) {
      alert('최소한 한 장의 사진을 업로드해야 합니다.');
      return;
    }

    if (location.x === 0 || location.y === 0) {
      alert('위치를 선택해주세요.');
      return;
    }

    const formData = new FormData();

    images.forEach((image) => {
      formData.append('image', image);
    });

    if (musicChoose === 1) {
      formData.append('musicUrl', videoId);
    } else if (musicChoose === 2) {
      formData.append('musicUrl', musicURL);
    } else if (musicChoose === 3 && slicedAudioURL !== undefined) {
      formData.append('musicUrl', slicedAudioURL);
    } else if (
      musicChoose === 3 &&
      slicedAudioURL === undefined &&
      audioURL !== undefined
    ) {
      formData.append('musicUrl', audioURL);
    }

    if (slicedAudioFile) {
      formData.append('audio', slicedAudioFile);
    } else if (audioFile) {
      formData.append('audio', audioFile);
    }

    formData.append('musicType', String(musicChoose));
    formData.append('musicTitle', selectedTitle);
    formData.append('content', content);
    formData.append('tag', tags.join(', '));
    formData.append('latitude', String(location.x));
    formData.append('longitude', String(location.y));
    formData.append('placeName', location.name);

    console.log(images);
    postMutation({ formData, updateId });
  };

  const mutationOptions = {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
      if (update === '2') {
        alert('게시물이 수정되었습니다!');
      } else {
        alert('게시물이 추가되었습니다!');
      }
      router.push('/');
    },
  };

  const { mutate: postMutation, isLoading: postLoading } = useMutation(
    update === '2' ? updatePost : addPost,
    mutationOptions
  );

  // const { isLoading, isError, data, isSuccess } = useQuery(
  //   ['post', updateId],
  //   () => getPost(updateId),
  //   {
  //     onSuccess: async (data) => {
  //       console.log('진입함');
  //       setCookie(null, 'update', '1', { path: '/' });
  //       const imageFiles = await Promise.all(
  //         data.images.map(async (image: Image, idx: string) => {
  //           const response = await fetch(image.url);
  //           const blob = await response.blob();
  //           return new File([blob], idx);
  //         })
  //       );
  //       console.log(data.post.musicType === 3);
  //       if (data.post.musicType === 3) {
  //         console.log('진입함');
  //         try {
  //           const response = await fetch(data.post.musicUrl);
  //           const audioBlob = await response.blob();
  //           const url = URL.createObjectURL(audioBlob);
  //           setAudioFile(audioBlob);
  //           setAudioURL(url);
  //         } catch (error) {
  //           console.error('오디오 파일을 불러오는 중 오류 발생:', error);
  //         }
  //       }
  //       setImages(imageFiles);
  //       setContent(data.post.content);
  //       setSelectedTitle(data.post.musicTitle);
  //       setMusicChoose(data.post.musicType);
  //       data.post.musicType === 1 && setVideoId(data.post.musicUrl);
  //       data.post.musicType === 3 && setAudioURL(data.post.musicUrl);
  //       console.log(data.post.musicType === 3);
  //       if (data.post.musicType === 3) {
  //         console.log('진입함');
  //         try {
  //           const response = await fetch(data.post.musicUrl);
  //           const audioBlob = await response.blob();
  //           const url = URL.createObjectURL(audioBlob);
  //           setAudioFile(audioBlob);
  //           setAudioURL(url);
  //         } catch (error) {
  //           console.error('오디오 파일을 불러오는 중 오류 발생:', error);
  //         }
  //       }
  //       setVideoId(data.post.musicUrl);
  //       setTags(data.post.tag.split(', '));
  //       setLocation({
  //         name: data.post.placeName,
  //         x: data.post.latitude,
  //         y: data.post.longitude,
  //       });
  //     },
  //     enabled: update === '2',
  //   }
  // );

  useEffect(() => {
    if (update === '2') {
      const fetchData = async () => {
        console.log('진입함');
        setCookie(null, 'update', '1', { path: '/' });

        const imageFiles = await Promise.all(
          data.images.map(async (image: Image, idx: string) => {
            const response = await fetch(image.url);
            const blob = await response.blob();
            return new File([blob], idx);
          })
        );

        setImages(imageFiles);
        setContent(data.post.content);
        setSelectedTitle(data.post.musicTitle);
        setMusicChoose(data.post.musicType);
        data.post.musicType === 1 && setVideoId(data.post.musicUrl);

        if (data.post.musicType === 3) {
          try {
            const response = await fetch(data.post.musicUrl);
            const audioBlob = await response.blob();
            const url = URL.createObjectURL(audioBlob);
            setAudioFile(audioBlob);
            setAudioURL(url);
          } catch (error) {
            console.error('오디오 파일을 불러오는 중 오류 발생:', error);
          }
        }

        setTags(data.post.tag.split(', '));
        setLocation({
          name: data.post.placeName,
          x: data.post.latitude,
          y: data.post.longitude,
        });
      };

      fetchData(); // 비동기 함수 호출
    }
  }, []);

  useEffect(() => {
    console.log(images); // images 배열이 변경될 때마다 여기에 로깅됩니다.
  }, [images]);

  return (
    <>
      {!(update === '2' && location.x === 0) && (
        <>
          <div style={{ minHeight: '800px' }}>
            <GlobalStyle />
            <form
              onSubmit={handlePostSubmit}
              style={{ display: 'block', textAlign: 'center' }}
            >
              <ImageContainer>
                {update === '2' ? (
                  <h1 style={{ alignSelf: 'flex-start', margin: '25px' }}>
                    게시글 수정
                  </h1>
                ) : (
                  <h1 style={{ alignSelf: 'flex-start', margin: '25px' }}>
                    새 게시글
                  </h1>
                )}
                <Dropzone images={images} setImages={setImages} />
                <PreviewContainer>
                  <ImagePreview images={images} removeImage={removeImage} />
                </PreviewContainer>
              </ImageContainer>
              <ImageContainer>
                <ContentArea content={content} setContent={setContent} />
                <div
                  style={{
                    position: 'relative',
                    width: 400,
                  }}
                >
                  <label style={{ textAlign: 'left' }}>
                    <h3 style={{ margin: '10px 0' }}>음악추가</h3>
                  </label>
                  <CustomButton
                    type="button"
                    onClick={handleCommentCreateHandler}
                  >
                    음악 설정하기
                  </CustomButton>
                </div>
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
                  <MusicSelector
                    musicURL={musicURL}
                    setMusicURL={setMusicURL}
                    setIsShow={setIsShow}
                  />
                )}
                {musicChoose === 3 && (
                  <RecordPlayer
                    setAudioFile={setAudioFile}
                    setSlicedAudioFile={setSlicedAudioFile}
                    setSlicedAudioURL={setSlicedAudioURL}
                    slicedAudioURL={slicedAudioURL}
                    audioURL={audioURL}
                    setAudioURL={setAudioURL}
                    setIsShow={setIsShow}
                  />
                )}
                <div
                  style={{
                    position: 'relative',
                    width: 400,
                  }}
                >
                  <label style={{ textAlign: 'left' }}>
                    <h3 style={{ margin: '10px 0' }}>태그</h3>
                  </label>
                  <TagInput tags={tags} setTags={setTags} />
                </div>
                <div
                  style={{
                    position: 'relative',
                    width: 400,
                  }}
                >
                  <label style={{ textAlign: 'left' }}>
                    <h3 style={{ margin: '10px 0' }}>장소</h3>
                  </label>
                  <CustomButton type="button" onClick={handleMapCreateHandler}>
                    위치 설정하기
                  </CustomButton>
                </div>
                {/* <MapComponent
                  setLocation={setLocation}
                  location={location}
                  update={update}
                /> */}
                <StyledButton type="submit">
                  {update === '2' ? (
                    <h3>사진 수정하기</h3>
                  ) : (
                    <h3>사진 게시하기</h3>
                  )}
                </StyledButton>
              </ImageContainer>
              {isShow ? (
                <UpAndDownTab
                  onClickEvent={handleCommentShowHandler}
                  $isUp={commentEdit.show}
                >
                  {commentEdit.show && (
                    <div>
                      <Accordion
                        image={youtube}
                        selected={musicChoose === 1}
                        onClick={() => handleAccordionClick(1)}
                      >
                        <>
                          <YouTubeSearch
                            setVideoId={setVideoId}
                            selectedTitle={selectedTitle}
                            setSelectedTitle={setSelectedTitle}
                            update={update}
                            videoId={videoId}
                            setIsShow={setIsShow}
                          />
                          {/* <DynamicComponentWithNoSSR
                          videoId={videoId}
                          setVideoId={setVideoId}
                          setSelectedTitle={setSelectedTitle}
                        /> */}
                        </>
                      </Accordion>
                      <Accordion
                        image={music}
                        selected={musicChoose === 2}
                        onClick={() => handleAccordionClick(2)}
                      >
                        <MusicSelector
                          musicURL={musicURL}
                          setMusicURL={setMusicURL}
                          setIsShow={setIsShow}
                        />
                      </Accordion>
                      <Accordion
                        image={record}
                        selected={musicChoose === 3}
                        onClick={() => handleAccordionClick(3)}
                      >
                        <RecordPlayer
                          setAudioFile={setAudioFile}
                          setSlicedAudioFile={setSlicedAudioFile}
                          setSlicedAudioURL={setSlicedAudioURL}
                          slicedAudioURL={slicedAudioURL}
                          audioURL={audioURL}
                          setAudioURL={setAudioURL}
                          setIsShow={setIsShow}
                        />
                      </Accordion>
                      {commentEdit.show && (
                        <div style={{ height: '200px' }}></div>
                      )}
                    </div>
                  )}
                </UpAndDownTab>
              ) : null}
              {isShowMap ? (
                <UpAndDownTab
                  onClickEvent={handleMapShowHandler}
                  $isUp={mapEdit.show}
                >
                  {mapEdit.show && (
                    <MapComponent
                      setLocation={setLocation}
                      location={location}
                      update={update}
                    />
                  )}
                </UpAndDownTab>
              ) : null}
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default Write;

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const cookies = parseCookies(context);
//   const update = cookies.update || '';
//   const updateId = cookies.updateId || '';

//   return {
//     props: {
//       update,
//       updateId,
//     },
//   };
// };
