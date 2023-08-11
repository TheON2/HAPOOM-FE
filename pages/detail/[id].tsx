import React, { FormEvent, useEffect, useState } from 'react';
import {
  GlobalStyle,
  ImageContainer,
  PreviewContainer,
  StyledButton,
} from '../../styles/write';
import { MapComponent } from '@/components/Write/MapComponent';
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
import MainBannerSlider from '@/components/Home/MainBannerSlider';

const DynamicComponentWithNoSSR = dynamic(
  () => import('@/components/Write/YoutubePlayer'),
  { ssr: false }
);
interface Image {
  url: string;
}

function Detail() {
  const router = useRouter();
  const id = typeof router.query.id === 'string' ? router.query.id : '';
  const [images, setImages] = useState<File[]>([]);
  const [content, setContent] = useState<string>('');
  const [update, setUpdate] = useState<boolean>(true);
  const [selectedTitle, setSelectedTitle] = useState<string>('');
  const [videoId, setVideoId] = useState<string>('');
  const [tags, setTags] = useState<string>('');
  const [location, setLocation] = useState({ name: '', x: 0, y: 0 });
  const queryClient = useQueryClient();

  const handleEditClick = () => {
    localStorage.setItem('updateId', JSON.stringify(id));
    localStorage.setItem('update', JSON.stringify(true));
    router.push('/post/Write');
  };

  const dispatch = useDispatch();
  const { data: userData, isSuccess: tokenSuccess } = useQuery(
    'user',
    getAuthToken,
    {
      onSuccess: (userData: UserResponse) => {
        dispatch(AUTH_USER(userData));
      },
    }
  );

  const { isError, data, isSuccess } = useQuery(
    ['post', id],
    () => getPost(id),
    {
      onSuccess: async (data) => {
        setImages(data.images);
        setContent(data.post.content);
        setSelectedTitle(data.post.musicTitle);
        setVideoId(data.post.musicUrl);
        setTags(data.post.tag);
        setLocation({
          name: data.post.placeName,
          x: data.post.latitude,
          y: data.post.longitude,
        });
      },
    }
  );

  if (!isSuccess) return <div>Loading...</div>;
  return (
    <>
      <Header />
      {/* <MainBannerSlider data={images} /> */}
      <div
        style={{
          width: '600px',
          minHeight: '600px',
          display: 'block',
          textAlign: 'center',
        }}
      >
        <button onClick={handleEditClick}>글 수정하기</button>
        <div
          style={{
            width: '600px',
            height: '250px',
            textAlign: 'left',
            margin: '20px',
          }}
        >
          {content}
        </div>
        <div style={{ width: '600px', textAlign: 'center', margin: '20px' }}>
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
          {/* <DynamicComponentWithNoSSR
            videoId={videoId}
            setVideoId={setVideoId}
            setSelectedTitle={setSelectedTitle}
          /> */}
          <MapComponent
            setLocation={setLocation}
            location={location}
            update={update}
          />
        </ImageContainer>
      </div>
      <Footer />
    </>
  );
}

export default Detail;
