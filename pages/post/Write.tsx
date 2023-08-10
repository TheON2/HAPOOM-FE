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

const DynamicComponentWithNoSSR = dynamic(
  () => import('@/components/Write/YoutubePlayer'),
  { ssr: false }
);
interface Image {
  url: string;
}

function Write() {
  const [update, setUpdate] = useState<boolean>(false);
  const [updateId, setUpdateId] = useState<string>('');
  const [images, setImages] = useState<File[]>([]);
  const [content, setContent] = useState<string>('');
  const [selectedTitle, setSelectedTitle] = useState<string>('');
  const [videoId, setVideoId] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [location, setLocation] = useState({ name: '', x: 0, y: 0 });
  const queryClient = useQueryClient();
  const router = useRouter();

  const dispatch = useDispatch();

  console.log(update, updateId);

  const { data: userData, isSuccess: tokenSuccess } = useQuery(
    'user',
    getAuthToken,
    {
      onSuccess: (userData: UserResponse) => {
        dispatch(AUTH_USER(userData));
      },
    }
  );

  const removeImage = (index: number) => {
    setImages((images) => images.filter((_, i) => i !== index));
  };

  const handlePostSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (images.length === 0) {
      alert('최소한 한 장의 사진을 업로드해야 합니다.');
      return;
    }

    const formData = new FormData();
    images.forEach((image) => {
      formData.append('image', image);
    });
    formData.append('content', content);
    formData.append('musicTitle', selectedTitle);
    formData.append('musicUrl', videoId);
    formData.append('tag', tags.join(', '));
    formData.append('latitude', String(location.x));
    formData.append('longitude', String(location.y));
    formData.append('placeName', location.name);
    postMutation({ formData, updateId });
  };

  const mutationOptions = {
    onSuccess: () => {
      localStorage.removeItem('update');
      localStorage.removeItem('updateId');

      queryClient.invalidateQueries('posts');
      if (update) {
        alert('게시물이 수정되었습니다!');
      } else {
        alert('게시물이 추가되었습니다!');
      }
      router.push('/test/main');
    },
  };

  const { mutate: postMutation, isLoading: postLoading } = useMutation(
    update ? updatePost : addPost,
    mutationOptions
  );

  const { isError, data, isSuccess } = useQuery(
    ['post', updateId],
    () => getPost(updateId),
    {
      onSuccess: async (data) => {
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
        setVideoId(data.post.musicUrl);
        setTags(data.post.tag.split(', '));
        setLocation({
          name: data.post.placeName,
          x: data.post.latitude,
          y: data.post.longitude,
        });
      },
      enabled: update,
    }
  );

  useEffect(() => {
    const initialUpdate = localStorage.getItem('update') === 'true';
    const initialUpdateId = localStorage.getItem('updateId')
      ? JSON.parse(localStorage.getItem('updateId') || '')
      : '';

    setUpdate(initialUpdate);
    setUpdateId(initialUpdateId);
  }, []);

  if (update && !isSuccess) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <div style={{ minHeight: '800px' }}>
        <GlobalStyle />
        <form
          onSubmit={handlePostSubmit}
          style={{ display: 'block', textAlign: 'center' }}
        >
          <ImageContainer>
            {update ? <h1>게시글 수정</h1> : <h1>새 게시글</h1>}
            <Dropzone images={images} setImages={setImages} />
            <PreviewContainer>
              <ImagePreview images={images} removeImage={removeImage} />
            </PreviewContainer>
          </ImageContainer>
          <ImageContainer>
            <ContentArea content={content} setContent={setContent} />
            <YouTubeSearch
              setVideoId={setVideoId}
              selectedTitle={selectedTitle}
              setSelectedTitle={setSelectedTitle}
              update={update}
              videoId={videoId}
            />
            <DynamicComponentWithNoSSR
              videoId={videoId}
              setVideoId={setVideoId}
              setSelectedTitle={setSelectedTitle}
            />
            <TagInput tags={tags} setTags={setTags} />
            <MapComponent
              setLocation={setLocation}
              location={location}
              update={update}
            />
            <StyledButton type="submit">
              {update ? <h1>사진 수정하기</h1> : <h1>사진 올리기</h1>}
            </StyledButton>
          </ImageContainer>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default wrapper.withRedux(Write);
