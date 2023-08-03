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
import { useMutation, useQueryClient } from 'react-query';
import { addPost } from '@/api/post';

const Write = () => {
  const [images, setImages] = useState<File[]>([]);
  const [content,setContent] = useState<string>('');
  const [selectedTitle, setSelectedTitle] = useState<string>('');
  const [videoId, setVideoId] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [location, setLocation] = useState({ name: '', x: 0, y: 0 });
  const queryClient = useQueryClient();
  const { mutate: addPost_Mutate, isLoading: addPostLoading } = useMutation(
    addPost,
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("");
      },
    }
  );


  const handlePostSubmit = (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append(`image${index+1}`, image);
    });
    formData.append('content', content);
    formData.append('musicTitle', selectedTitle);
    formData.append('musicUrl', videoId);
    formData.append('tag', tags.join(', '));
    formData.append('latitude', String(location.x));
    formData.append('longitude', String(location.y));
    formData.append('placeName', location.name);
    addPost_Mutate(formData);
  };
  const removeImage = (index: number) => {
    setImages((images) => images.filter((_, i) => i !== index));
  };

  return (
    <div>
      <GlobalStyle />
      <form
        onSubmit={handlePostSubmit}
        style={{ display: 'block', textAlign: 'center' }}
      >
        <ImageContainer>
        <h1>새 게시글</h1>
          <Dropzone images={images} setImages={setImages} />
          <PreviewContainer>
            <ImagePreview images={images} removeImage={removeImage} />
          </PreviewContainer>
        </ImageContainer>
        <ImageContainer>
        <ContentArea content={content} setContent={setContent}/>
          <YouTubeSearch 
            setVideoId={setVideoId} 
            selectedTitle={selectedTitle} 
            setSelectedTitle={setSelectedTitle} 
          />
          <YoutubePlayer videoId={videoId} />
          <TagInput tags={tags} setTags={setTags} />
          <MapComponent
            setLocation={setLocation}
            location={location}
          />
          <StyledButton type="submit">사진 올리기</StyledButton>
        </ImageContainer>
      </form>
    </div>
  );
};

export default Write;
