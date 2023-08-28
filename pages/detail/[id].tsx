import React, {
  ChangeEvent,
  FormEvent,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import {
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
  DetailContentBox,
} from '@/styles/detail';
import { MapComponent } from '@/components/Write/MapComponent';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addPost, deletePost, getPost, updatePost } from '@/api/post';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/config/configStore';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { getAuthToken } from '@/api/user';
import { AUTH_USER, UserResponse } from '@/redux/reducers/userSlice';
import MainBannerSlider from '@/components/Home/InfiniteCarousel';
import DetailProfile from '@/components/Detail/DetailProfile';
import { parseCookies, setCookie } from 'nookies';
import { GetServerSidePropsContext, NextPage } from 'next';
import HeartIcon from '@/components/common/HeartIcon';
import Comment from '@/components/Detail/DetailComments';
import KebabMenuUI, {
  KebabMenuStyle,
  KebabMenuAptionButton,
} from '@/components/common/KebabMenuUI';
import DetailKebabMenu from '@/components/Detail/DetailKebabMenu';
import { getComment, reportPost } from '@/api/post';
import { identity } from 'lodash';
import Link from 'next/link';
import CustomPlayer from '@/components/Write/CustomPlayer';
import Modal from '@/components/common/Modal';
import { ReadOnlyMap } from '@/components/Write/ReadOnlyMap';
import ReadOnlyYoutube from '@/components/Write/ReadOnlyYoutube';

import { BannerSliderProps } from '@/types/home';
import useModal from '@/hooks/useModal';
import OneButtonModal from '@/components/common/OneButtonModal';
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
const Detail: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const id = typeof router.query.id === 'string' ? router.query.id : '';
  const [images, setImages] = useState<BannerSliderProps[]>([]);
  const [content, setContent] = useState<string>('');
  const [selectedTitle, setSelectedTitle] = useState<string>('');
  const [musicTitle, setMusicTitle] = useState<string>('');
  const [musicType, setMusicType] = useState<number>(0);
  const [musicChoose, setMusicChoose] = useState<number>(0);
  const [audioURL, setAudioURL] = useState<string | undefined>(undefined);
  const [videoId, setVideoId] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [location, setLocation] = useState({ name: '', x: 0, y: 0 });

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
      enabled: id !== '',
      onSuccess: async (data) => {
        setMusicChoose(data.post.musicType);
        setImages(data.images);
        setContent(data.post.content);
        setSelectedTitle(data.post.musicTitle);
        setVideoId(data.post.musicUrl);
        setAudioURL(data.post.musicUrl);
        setTags(data.tag);
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

  const { data: commentsData } = useQuery(
    ['comment', id],
    () => getComment(id),
    {
      enabled: id !== '',
    }
  );
  if (!isSuccess) return <div>Loading...</div>;
  return (
    <>
      <ContentsContainer>
        <OtherProfileBox>
          <Link href={`/User/${data?.user?.userId}`}>
            <DetailProfile
              userImage={data?.user?.userImage}
              preset={data?.user?.preset}
              nick={data?.user?.nickname}
            />
          </Link>
          <DetailKebabMenu
            data={data?.user.email}
            userData={userData?.email}
            id={id}
          />
        </OtherProfileBox>
        <div className="carousel-box">
          <MainBannerSlider data={images} />
          <HeartIcon postId={parseInt(id)} />
        </div>

        {musicChoose === 1 && (
          <DetialContentSection>
            <ReadOnlyYoutube videoId={videoId} update={'3'} />
          </DetialContentSection>
        )}
        {musicChoose === 2 && (
          <DetialContentSection>
            <CustomPlayer
              setAudioUrl={setAudioURL}
              audioUrl={audioURL}
              title={musicTitle}
              setMusicChoose={setMusicChoose}
              setMusicType={setMusicType}
              update={'3'}
            />
          </DetialContentSection>
        )}
        {musicChoose === 3 && (
          <DetialContentSection>
            <CustomPlayer
              setAudioUrl={setAudioURL}
              audioUrl={audioURL}
              title={musicTitle}
              setMusicChoose={setMusicChoose}
              setMusicType={setMusicType}
              update={'3'}
            />
          </DetialContentSection>
        )}
        <DetialContentSection className="content-box">
          {content && <DetailContentBox>{content}</DetailContentBox>}
          {tags.length !== 0 && (
            <HashtagBox>
              {tags.map((tag, index) => (
                <Hashtag key={index}>#{tag.trim()}</Hashtag>
              ))}
            </HashtagBox>
          )}
        </DetialContentSection>
        <DetialContentSection>
          <h3 style={{ marginBottom: '20px' }}>위치 정보</h3>
          {!(location.x === 0) && <ReadOnlyMap location={location} />}
        </DetialContentSection>
        <DetialContentSection>
          <h3>댓글</h3>
          <Comment data={commentsData?.comments} id={id} userData={userData} />
        </DetialContentSection>
      </ContentsContainer>
    </>
  );
};

export default Detail;
