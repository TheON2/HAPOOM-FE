import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import axios from 'axios';
import { GlobalStyle, StyledAuthInput, StyledButton } from '../../styles/write';
import Script from 'next/script';
import styled from 'styled-components';
import Dropzone from '@/components/Write/Dropzone';
import ImagePreview from '@/components/Write/ImagePreview';
import { YouTubeSearch } from '@/components/Write/YoutubeSearchInput';

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

  const handleMapClick = useCallback(async (event) => {
    const coord = event.coord;
    try {
      const response = await axios.get(
        'http://localhost:3001/map/reversegeocode',
        {
          params: {
            x: coord.x,
            y: coord.y,
          },
        }
      );

      const result = response.data.results[0];

      const roadAddress = `${result?.region?.area1?.name} ${result?.region?.area2?.name} ${result?.region?.area3?.name} ${result?.land?.name} ${result?.land?.number1} ${result?.land?.number2} ${result?.land?.addition0?.value}`;

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
  }, []);

  const handleConfirmClick = () => {
    setLocationInput(location.name);
    setMapOpen(false);
  };

  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapOpen && window.naver) {
      mapRef.current = new window.naver.maps.Map(mapContainerRef.current);
      window.naver.maps.Event.once(mapRef.current, 'click', handleMapClick);
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
        <YouTubeSearch setVideoId={setVideoId} />
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
        <StyledAuthInput
          type="text"
          placeholder="🔍️"
          value={locationInput}
          onClick={handleSearchIconClick}
          readOnly
        />
        {mapOpen && (
          <div>
            <div
              ref={mapContainerRef}
              id="map"
              style={{ width: '600px', height: '400px' }}
            />
            <button onClick={handleConfirmClick}>확인</button>
          </div>
        )}
        <StyledButton type="submit">사진 올리기</StyledButton>
      </ImageContainer>
    </div>
  );
};

export default Write;
