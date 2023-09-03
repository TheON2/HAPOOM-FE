import React, { FormEvent, useEffect, useState } from 'react';
import { Box } from '../../styles/write';
import Dropzone from '@/components/Write/Dropzone';
import ImagePreview from '@/components/Write/ImagePreview';
import { MapComponent } from '@/components/Write/MapComponent';
import ContentArea from '@/components/Write/ContentArea';
import TagInput from '@/components/Write/TagInput';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addPost, getPost, updatePost } from '@/apis/post';
import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { getAuthToken } from '@/apis/user';
import { AUTH_USER, UserResponse, UserState } from '@/redux/reducers/userSlice';
import { NextPage } from 'next';
import RecordPlayer from '@/components/Write/RecordPlayer';
import MusicSelector from '@/components/Write/MusicSelector';
import Accordion from '@/components/Write/Accordion';
import youtube from '@/public/youtube.png';
import music from '@/public/musiclibrary.png';
import record from '@/public/record.png';
import UpAndDownTab from '@/components/common/UpAndDownTab';
import CustomButton from '@/components/Write/CustomButton';
import { ReadOnlyMap } from '@/components/Write/ReadOnlyMap';
import YoutubePlayer from '@/components/Write/YoutubePlayer';
import Button from '@/components/common/Button';
//import CustomPlayer from '@/components/Write/CustomPlayer';
//import ReadOnlyYoutube from '@/components/Write/ReadOnlyYoutube';
import { styled } from 'styled-components';
import useModal from '@/hooks/useModal';
import Modal from '@/components/common/Modal';
import OneButtonModal from '@/components/common/OneButtonModal';
import { useTranslation } from 'next-i18next';
import { RootState } from '@/redux/config/configStore';

const ReadOnlyYoutube = dynamic(
  () => import('@/components/Write/ReadOnlyYoutube'),
  { loading: () => <div>Loading...</div> }
);
const CustomPlayer = dynamic(() => import('@/components/Write/CustomPlayer'), {
  loading: () => <div>Loading...</div>,
});

interface Props {
  update: string;
  updateId: string;
}

interface ModalMessage {
  actionText: string;
  modalMessge: string;
  onClickEvent?: () => void;
}

const WritePageContainer = styled.div`
  min-height: 800px;
  padding: 8px 24px 0;
`;

const Write: NextPage<Props> = ({ update = '1', updateId }) => {
  const { t } = useTranslation('common');
  const [isShow, setIsShow] = useState<boolean>(false);
  const {
    isModalOpen: oneModalOpen,
    modalMessge: oneModalMessage,
    openModal: openOneModal,
    closeModal: closeOneModal,
  } = useModal();
  const { isModalOpen, modalMessge, openModal, closeModal } = useModal();
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
  const { user }: { user: UserState['user'] } = useSelector(
    (state: RootState) => state.user
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
      // refetchOnWindowFocus: false,
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
      openModal({
        actionText: '확인',
        modalMessge: '최소한 한 장의 사진을 업로드해야 합니다.',
      });
      return;
    }

    if (location.x === 0 || location.y === 0 || location.name === '') {
      openModal({
        actionText: '확인',
        modalMessge: '위치를 선택해주세요.',
      });
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
    if (user.userId !== null) {
      formData.append('userId', user.userId.toString());
    }

    // console.log(images);
    postMutation({ formData, updateId });
  };

  const mutationOptions = {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
      if (update === '2') {
        openOneModal({
          actionText: '확인',
          modalMessge: '게시물이 수정되었습니다!',
          onClickEvent: () => {
            router.push('/feed');
          },
        });
      } else {
        openOneModal({
          actionText: '확인',
          modalMessge: '게시물이 추가되었습니다!',
          onClickEvent: () => {
            router.push('/feed');
          },
        });
      }
    },
  };

  const { mutate: postMutation, isLoading: postLoading } = useMutation(
    update === '2' ? updatePost : addPost,
    mutationOptions
  );

  useEffect(() => {
    if (update === '2') {
      getPost(updateId).then((data) => {
        data.images.map((image: any) => {
          setImageURLs((images) => [...images, image.url]);
        });

        setContent(data.post.content);
        setSelectedTitle(data.post.musicTitle);

        setMusicType(data.post.musicType);
        data.post.musicType === 1 && setVideoId(data.post.musicUrl);
        data.post.musicType === 2 && setMusicURL(data.post.musicUrl);
        data.post.musicType === 3 && setAudioURL(data.post.musicUrl);

        setTags(data.tag);
        setLocation({
          name: data.post.placeName,
          x: data.post.latitude,
          y: data.post.longitude,
        });
      });
    }
  }, [update, updateId]);

  return (
    <>
      {!(update === '2' && location.x === 0) && (
        <>
          {oneModalOpen && (
            <OneButtonModal
              isOpen={oneModalOpen}
              setIsOpen={closeOneModal}
              onClickEvent={oneModalMessage.onClickEvent || null}
            >
              {oneModalMessage.modalMessge}
            </OneButtonModal>
          )}
          {isModalOpen && (
            <Modal
              isOpen={isModalOpen}
              setIsOpen={closeModal}
              actionText={modalMessge.actionText}
              onClickEvent={modalMessge.onClickEvent || null}
            >
              {modalMessge.modalMessge}
            </Modal>
          )}
          <WritePageContainer>
            {/* <GlobalStyle /> */}
            <div>
              <Box>
                {update === '2' ? (
                  <h2>게시글 수정</h2>
                ) : (
                  <h2>게시글 작성하기</h2>
                )}
                <Dropzone
                  images={images}
                  setImages={setImages}
                  imageURLs={imageURLs}
                  setImageURLs={setImageURLs}
                />
                {/* <PreviewContainer> */}
                <ImagePreview
                  images={images}
                  removeImage={removeImage}
                  imageURLs={imageURLs}
                />
                {/* </PreviewContainer> */}
              </Box>
              <ContentArea content={content} setContent={setContent} />
              <Box>
                <TagInput tags={tags} setTags={setTags} />
              </Box>
              <Box>
                <label
                  style={{
                    display: 'block',
                  }}
                >
                  음악추가
                </label>

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
                    update={update}
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
                <CustomButton
                  type="button"
                  onClick={handleCommentCreateHandler}
                  $addStyle
                  className={musicType !== 0 ? 'secondary' : undefined}
                >
                  음악 설정하기
                </CustomButton>
              </Box>

              <Box>
                <label>장소</label>
                {location.x !== 0 && location.y !== 0 && (
                  <ReadOnlyMap location={location} />
                )}
                <CustomButton
                  type="button"
                  onClick={handleMapCreateHandler}
                  $addStyle
                >
                  위치 설정하기
                </CustomButton>
              </Box>
              <Box>
                <CustomButton onClick={handlePostSubmit}>
                  {update === '2' ? '사진 수정하기' : '사진 게시하기'}
                </CustomButton>
              </Box>

              {isShow ? (
                <UpAndDownTab
                  onClickEvent={handleCommentShowHandler}
                  $isUp={commentEdit.show}
                  className="write"
                >
                  {commentEdit.show && (
                    <>
                      <Accordion
                        image={youtube}
                        selected={musicChoose === 1}
                        onClick={() => handleAccordionClick(1)}
                        bgClass={'youtube'}
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
                        bgClass={'music'}
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
                        bgClass={'record'}
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
                          setMusicType={setMusicType}
                          setMusicChoose={setMusicChoose}
                        />
                      </Accordion>
                      <div style={{ display: 'flex', gap: '20px' }}>
                        {/* <Button
                          type="button"
                          className="secondary"
                          onClick={handleCommentShowHandler}
                        >
                          닫기
                        </Button> */}
                        <Button
                          onClick={submitMusic}
                          type="button"
                          className={!audioSubmit ? 'secondary' : undefined}
                        >
                          확인
                        </Button>
                      </div>
                    </>
                  )}
                </UpAndDownTab>
              ) : null}
              {isShowMap ? (
                <UpAndDownTab
                  onClickEvent={handleMapShowHandler}
                  $isUp={mapEdit.show}
                  className="write"
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
            </div>
          </WritePageContainer>
        </>
      )}
    </>
  );
};

export default Write;
