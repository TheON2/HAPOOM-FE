import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Image from 'next/image';
import axios from 'axios';
import { debounce } from 'lodash';
import { useDropzone } from 'react-dropzone';
import {
  GlobalStyle,
  StyledAuthInput,
  StyledButton,
  StyledDevider,
  StyledForm,
  StyledHeader,
  StyledSection,
  StyledSpan,
  StyledTextField,
} from '../../styles/write';
import Script from 'next/script';
import styled from 'styled-components';
import Dropzone from '@/components/Write/Dropzone';
import ImagePreview from '@/components/Write/ImagePreview';

const SuggestionBox = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 300px; // 원하는 너비로 설정
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
`;

const SuggestionItem = styled.li`
  padding: 10px;
  background-color: white;
  border-bottom: 1px solid #f1f1f1;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
  &:last-child {
    border-bottom: none;
  }
`;

const PreviewContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 600px;
`;
const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Write = () => {
  const [videoId, setVideoId] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);
  const handlePostSubmit = (event: FormEvent) => {
    event.preventDefault();
  };
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const searchYoutube = async (term: string) => {
    if (term.length >= 2) {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search`,
        {
          params: {
            part: 'snippet',
            maxResults: 5,
            key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
            q: term,
            type: 'video',
          },
        }
      );
      setSearchSuggestions(
        response.data.items.map((item: any) => {
          return {
            title: item.snippet.title,
            url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          };
        })
      );
    }
  };

  const debouncedSearchYoutube = debounce(searchYoutube, 100);

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    if (value.trim() === '') {
      setSearchSuggestions([]);
    } else {
      debouncedSearchYoutube(value);
    }
  };

  const handleSuggestionClick = (url: string) => {
    setVideoId(url);
    setSearchSuggestions([]);
  };

  // 이미지 제거 함수
  const removeImage = (index: number) => {
    setImages((images) => images.filter((_, i) => i !== index));
  };

  const [locationInput, setLocationInput] = useState('');
  const [mapOpen, setMapOpen] = useState(false);
  const [location, setLocation] = useState({ name: '', x: 0, y: 0 });

  const handleSearchIconClick = () => {
    setMapOpen(true);
  };

  const handleMapClick = async (event) => {
    const coord = event.coord;
    alert(coord);

    try {
      const response = await axios.get(
        'https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc',
        {
          params: {
            request: 'coordsToaddr',
            coords: `${coord.x},${coord.y}`,
            orders: 'roadaddr',
            output: 'json',
          },
          headers: {
            'X-NCP-APIGW-API-KEY-ID': `${process.env.NEXT_PUBLIC_GEO_API_KEY}`,
            'X-NCP-APIGW-API-KEY': `${process.env.NEXT_PUBLIC_GEO_SECRET_API_KEY}`,
          },
        }
      );

      const roadAddress = response.data.results[0]?.region?.area1?.name;
      if (!roadAddress) {
        throw new Error('주소를 가져올 수 없습니다.');
      }

      setLocation({
        name: roadAddress,
        x: coord.x,
        y: coord.y,
      });
    } catch (error) {
      console.error('Geocoding API 호출 중 오류가 발생했습니다:', error);
    }
  };

  const handleConfirmClick = () => {
    setLocationInput(`${location.name}(${location.x},${location.y})`);
    setMapOpen(false);
  };

  useEffect(() => {
    if (mapOpen && window.naver) {
      const map = new window.naver.maps.Map('map');
      window.naver.maps.Event.once(map, 'click', handleMapClick);
    }
  }, [mapOpen, handleMapClick]);

  const playerRef = useRef(null);

  const [player, setPlayer] = useState<YT.Player | null>(null);

  useEffect(() => {
    // videoId가 없으면 플레이어 삭제
    if (!videoId && player) {
      player.destroy();
      setPlayer(null);
    }
    // videoId가 있으면 플레이어 생성
    if (videoId && !player) {
      // URL에서 videoId 파라미터를 추출
      const url = new URL(videoId);
      const videoIdParam = url.searchParams.get('v');

      // videoId 파라미터로 새 플레이어를 생성
      if (videoIdParam) {
        const newPlayer = new YT.Player(playerRef.current, {
          videoId: videoIdParam,
          height: '150',
          width: '600',
          playerVars: {
            autoplay: 1,
          },
        });
        setPlayer(newPlayer);
      }
    }
  }, [videoId]);

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
        <StyledAuthInput
          type="text"
          placeholder="음악 제목"
          value={searchTerm}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          style={{ width: '600px' }}
        />
        <SuggestionBox>
          {searchSuggestions.map((suggestion, index) => (
            <SuggestionItem
              key={index}
              onClick={() => handleSuggestionClick(suggestion.url)}
            >
              {suggestion.title}
            </SuggestionItem>
          ))}
        </SuggestionBox>
        <StyledAuthInput
          type="text"
          placeholder="URL"
          value={videoId}
          readOnly={true}
          style={{ width: '600px' }}
        />
        <div id="player" ref={playerRef} />
        <Script src="https://www.youtube.com/iframe_api" />
        <StyledAuthInput
          type="text"
          placeholder="#태그"
          style={{ width: '600px' }}
        />
        <Script
          src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVERMAP_API_KEY}`}
        />
        <input
          type="text"
          placeholder="🔍️"
          value={locationInput}
          onClick={handleSearchIconClick}
          readOnly
        />
        {mapOpen && (
          <div>
            <div id="map" style={{ width: '600px', height: '400px' }} />
            <button onClick={handleConfirmClick}>확인</button>
          </div>
        )}
        <script
          dangerouslySetInnerHTML={{
            __html: `
          var map = new naver.maps.Map('map');
          naver.maps.Event.addListener(map, 'click', ${handleMapClick.toString()});
        `,
          }}
        />

        <StyledButton type="submit">사진 올리기</StyledButton>
      </ImageContainer>
    </div>
  );
};

export default Write;
