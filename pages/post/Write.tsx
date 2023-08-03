import React, { FormEvent, useState } from 'react';
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
import YoutubePlayer from '@/components/Write/YoutubePlayer';
import ContentArea from '@/components/Write/ContentArea';
import TagInput from '@/components/Write/TagInput';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addPost, getPost, updatePost } from '@/api/post';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/config/configStore';
import dynamic from 'next/dynamic';

const DynamicComponentWithNoSSR = dynamic(
  () => import('@/components/Write/YoutubePlayer'),
  { ssr: false }
);
interface Image {
  url: string;
}

const Write = () => {
  const { update, updateId } = useSelector((state: RootState) => state.post);
  const [images, setImages] = useState<File[]>([]);
  const [content, setContent] = useState<string>('');
  const [selectedTitle, setSelectedTitle] = useState<string>('');
  const [videoId, setVideoId] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [location, setLocation] = useState({ name: '', x: 0, y: 0 });
  const queryClient = useQueryClient();

  const removeImage = (index: number) => {
    setImages((images) => images.filter((_, i) => i !== index));
  };

  const handlePostSubmit = (event: FormEvent) => {
    event.preventDefault();
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
      queryClient.invalidateQueries('posts');
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
            return new File([blob], idx); // TODO: 실제 파일 이름 제공
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

  if (update && !isSuccess) return <div>Loading...</div>;

  return (
    <div>
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
          />
          <DynamicComponentWithNoSSR videoId={videoId} />
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
  );
};

export default Write;
