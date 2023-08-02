import React, { FormEvent, useState } from 'react';
import {
  GlobalStyle,
  ImageContainer,
  PreviewContainer,
  StyledAuthInput,
  StyledButton,
} from '../../styles/write';
import Dropzone from '@/components/Write/Dropzone';
import ImagePreview from '@/components/Write/ImagePreview';
import { YouTubeSearch } from '@/components/Write/YoutubeSearchInput';
import { MapComponent } from '@/components/Write/MapComponent';
import YoutubePlayer from '@/components/Write/YoutubePlayer';

const Write = () => {
  const [videoId, setVideoId] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);
  const [tag, setTag] = useState<string>('');
  const [locationInput, setLocationInput] = useState('');
  const [location, setLocation] = useState({ name: '', x: 0, y: 0 });

  const handlePostSubmit = (event: FormEvent) => {
    event.preventDefault();
  };
  const removeImage = (index: number) => {
    setImages((images) => images.filter((_, i) => i !== index));
  };
  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTag = e.target.value;

    const tags = newTag.split(' ');
    for (let tag of tags) {
      if (tag.startsWith('#')) {
        tag = tag.slice(1);
      }

      if (tag.length > 5) {
        alert('해시태그는 5글자를 넘길 수 없습니다!');
        return;
      }
    }
    setTag(newTag);
  };

  return (
    <div>
      <GlobalStyle />
      <form
        onSubmit={handlePostSubmit}
        style={{ display: 'block', textAlign: 'center' }}
      >
        <h1>New Post</h1>
        <ImageContainer>
          <Dropzone images={images} setImages={setImages} />
          <PreviewContainer>
            <ImagePreview images={images} removeImage={removeImage} />
          </PreviewContainer>
        </ImageContainer>
      </form>
      <ImageContainer>
        <input
          type="textarea"
          style={{ width: '600px', height: '100px', resize: 'none' }}
        />
        <YouTubeSearch setVideoId={setVideoId} />
        <YoutubePlayer videoId={videoId} />
        <StyledAuthInput
          type="text"
          placeholder="#태그"
          value={tag}
          onChange={handleTagChange}
          style={{ width: '600px' }}
        />
        <MapComponent
          setLocation={setLocation}
          locationInput={locationInput}
          setLocationInput={setLocationInput}
          location={location}
        />
        <StyledButton type="submit">사진 올리기</StyledButton>
      </ImageContainer>
    </div>
  );
};

export default Write;
