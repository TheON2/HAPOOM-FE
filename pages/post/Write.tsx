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

const Write = () => {
  const [videoId, setVideoId] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [locationInput, setLocationInput] = useState('');
  const [location, setLocation] = useState({ name: '', x: 0, y: 0 });
  const [content,setContent] = useState<string>('');

  const handlePostSubmit = (event: FormEvent) => {
    event.preventDefault();
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
          <YouTubeSearch setVideoId={setVideoId} />
          <YoutubePlayer videoId={videoId} />
          <TagInput tags={tags} setTags={setTags} />
          <MapComponent
            setLocation={setLocation}
            locationInput={locationInput}
            setLocationInput={setLocationInput}
            location={location}
          />
          <StyledButton type="submit">사진 올리기</StyledButton>
        </ImageContainer>
      </form>
    </div>
  );
};

export default Write;
