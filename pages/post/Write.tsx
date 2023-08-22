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
import { ReadOnlyMap } from '@/components/Write/ReadOnlyMap';
import YoutubePlayer from '@/components/Write/YoutubePlayer';
import Button from '@/components/common/Button';
import ReadOnlyYoutube from '@/components/Write/ReadOnlyYoutube';

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

const Write: NextPage<Props> = ({ update = '1', updateId, data }) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [commentEdit, setCommentEdit] = useState<any>({
    show: false,
    action: '',
    uiTitle: '',
    buttonText: '',
    postId: '',
  });
  const handleCommentCreateHandler = () => {
    if (musicType !== 0) {
      return;
    }
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

  const [content, setContent] = useState<string>('');
  const [images, setImages] = useState<File[]>([]);
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const [audioFile, setAudioFile] = useState<Blob | null>(null);
  const [slicedAudioFile, setSlicedAudioFile] = useState<Blob | null>(null);
  const [musicType, setMusicType] = useState<number>(0);
  const [musicChoose, setMusicChoose] = useState<number>(0);
  const [audioURL, setAudioURL] = useState<string | undefined>(undefined);
  const [slicedAudioURL, setSlicedAudioURL] = useState<string | undefined>(
    undefined
  );
  const [musicURL, setMusicURL] = useState<string | undefined>(undefined);
  const [videoId, setVideoId] = useState<string>('');
  const [selectedTitle, setSelectedTitle] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [location, setLocation] = useState({ name: '', x: 0, y: 0 });
  const [audioSubmit, setAudioSubmit] = useState(false);
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
    setImageURLs((imageURLs) => imageURLs.filter((_, i) => i !== index));
  };

  const handleAccordionClick = (value: number) => {
    // 현재 선택된 아코디언과 클릭한 아코디언이 같으면 닫히고, 그렇지 않으면 열립니다.
    if (musicChoose === value) {
      setMusicChoose(0); // 0은 닫힌 상태를 나타냅니다.
    } else {
      setMusicChoose(value);
    }
  };

  const submitMusic = () => {
    if (musicChoose === 0) {
      return;
    }
    setMusicType(musicChoose);
    setIsShow(false);
  };

  const handlePostSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (images.length === 0 && imageURLs.length === 0) {
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

    imageURLs.forEach((imageURL) => {
      formData.append('imageURL', imageURL);
    });

    if (musicType === 1) {
      setSelectedTitle('유튜브 링크');
      formData.append('musicUrl', videoId);
    } else if (musicType === 2 && musicURL !== undefined) {
      formData.append('musicUrl', musicURL);
    } else if (musicType === 3 && slicedAudioURL !== undefined) {
      setSelectedTitle('녹음된 음성');
      formData.append('musicUrl', slicedAudioURL);
    } else if (
      musicType === 3 &&
      slicedAudioURL === undefined &&
      audioURL !== undefined
    ) {
      setSelectedTitle('녹음된 음성');
      formData.append('musicUrl', audioURL);
    }

    if (slicedAudioFile) {
      setSelectedTitle('녹음된 음성');
      formData.append('audio', slicedAudioFile);
    } else if (audioFile) {
      setSelectedTitle('녹음된 음성');
      formData.append('audio', audioFile);
    }

    formData.append('musicType', String(musicType));
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

  useEffect(() => {
    if (update === '2') {
      data.images.map((image: any) => {
        setImageURLs((images) => [...images, image.url]);
      });

      setContent(data.post.content);
      setSelectedTitle(data.post.musicTitle);

      setMusicType(data.post.musicType);
      data.post.musicType === 1 && setVideoId(data.post.musicUrl);
      data.post.musicType === 2 && setMusicURL(data.post.musicUrl);
      data.post.musicType === 3 && setAudioURL(data.post.musicUrl);

      setTags(data.post.tag.split(', '));
      setLocation({
        name: data.post.placeName,
        x: data.post.latitude,
        y: data.post.longitude,
      });
    }
  }, []);

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
                <Dropzone
                  images={images}
                  setImages={setImages}
                  imageURLs={imageURLs}
                  setImageURLs={setImageURLs}
                />
                <PreviewContainer>
                  <ImagePreview
                    images={images}
                    removeImage={removeImage}
                    imageURLs={imageURLs}
                  />
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
                    className={musicType !== 0 ? 'secondary' : undefined}
                  >
                    음악 설정하기
                  </CustomButton>
                </div>
                {musicType === 1 && (
                  <>
                    <ReadOnlyYoutube
                      videoId={videoId}
                      update={update}
                      setVideoId={setVideoId}
                      setMusicType={setMusicType}
                      setSelectedTitle={setSelectedTitle}
                      setMusicChoose={setMusicChoose}
                      setAudioSubmit={setAudioSubmit}
                    />
                  </>
                )}
                {musicType === 2 && (
                  <CustomPlayer
                    audioUrl={musicURL}
                    setAudioUrl={setMusicURL}
                    title={selectedTitle}
                    setMusicChoose={setMusicChoose}
                    setMusicType={setMusicType}
                    setAudioSubmit={setAudioSubmit}
                    update={'2'}
                  />
                )}
                {musicType === 3 && slicedAudioURL && (
                  <CustomPlayer
                    title={'잘라낸 녹음 파일'}
                    audioUrl={slicedAudioURL}
                    setAudioUrl={setAudioURL}
                    setMusicChoose={setMusicChoose}
                    setMusicType={setMusicType}
                    setAudioSubmit={setAudioSubmit}
                    update={'2'}
                  />
                )}
                {musicType === 3 && audioURL && !slicedAudioURL && (
                  <CustomPlayer
                    title={'녹음된 파일'}
                    audioUrl={audioURL}
                    setAudioUrl={setAudioURL}
                    setMusicChoose={setMusicChoose}
                    setMusicType={setMusicType}
                    setAudioSubmit={setAudioSubmit}
                    update={'2'}
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

                  {location.x !== 0 && location.y !== 0 && (
                    <ReadOnlyMap location={location} />
                  )}
                </div>
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
                          <YoutubePlayer
                            setVideoId={setVideoId}
                            setSelectedTitle={setSelectedTitle}
                            update={update}
                            videoId={videoId}
                            setAudioSubmit={setAudioSubmit}
                          />
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
                          setAudioSubmit={setAudioSubmit}
                          setSelectedTitle={setSelectedTitle}
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
                          setAudioSubmit={setAudioSubmit}
                          setMusicChoose={setMusicChoose}
                          setMusicType={setMusicType}
                        />
                      </Accordion>
                      <div style={{ display: 'flex', gap: '20px' }}>
                        <Button type="button" className="secondary">
                          닫기
                        </Button>
                        <Button
                          onClick={submitMusic}
                          type="button"
                          className={!audioSubmit ? 'secondary' : undefined}
                        >
                          확인
                        </Button>
                      </div>
                      {commentEdit.show && (
                        <div style={{ height: '50px' }}></div>
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
                      setIsShowMap={setIsShowMap}
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
