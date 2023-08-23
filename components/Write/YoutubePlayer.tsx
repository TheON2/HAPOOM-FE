import { StyledAuthInput, InputBox } from '@/styles/write';
import { CloseButton, PlayerWrapper } from '@/styles/youtubeplayer';
import Script from 'next/script';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import Button from '../common/Button';

interface YoutubePlayerProps {
  videoId: string;
  setVideoId: React.Dispatch<React.SetStateAction<string>>;
  setSelectedTitle: React.Dispatch<React.SetStateAction<string>>;
  setAudioSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  update: string;
}

interface Windows extends Window {
  onYouTubeIframeAPIReady: () => void;
}

const YoutubePlayer = ({
  videoId,
  setVideoId,
  setSelectedTitle,
  setAudioSubmit,
  update,
}: YoutubePlayerProps) => {
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [player, setPlayer] = useState<YT.Player | null>(null);
  const playerRef = useRef<HTMLDivElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [seek, setSeek] = useState(0);
  const [duration, setDuration] = useState(0);
  const [title, setTitle] = useState<string | null>(null);
  const [inputURL, setInputURL] = useState(''); // 입력된 URL을 추적
  const [validURL, setValidURL] = useState(true); // URL 유효성을 추적

  // URL 유효성 검사 함수
  const handleURLValidation = () => {
    setValidURL(true);
    try {
      const url = new URL(inputURL);
      const videoIdParam = url.searchParams.get('v');
      if (videoIdParam) {
        setVideoId(inputURL); // 일단 영상 ID를 설정
        //setAudioSubmit(true);
        // setValidURL(true); // 여기에서는 유효성을 설정하지 않습니다.
      } else {
        throw new Error('Invalid URL');
      }
    } catch (error) {
      setValidURL(false);
    }
  };

  const handleClosePlayer = (e: FormEvent) => {
    e.preventDefault();
    if (intervalId) {
      clearInterval(intervalId); // 인터벌 종료
    }
    setAudioSubmit(false);
    setVideoId(''); // 비디오 ID를 지워 플레이어를 닫습니다.
    setTitle('');
    setSelectedTitle('');
    setSeek(0);
    setDuration(0);
  };

  useEffect(() => {
    function createPlayer() {
      if (!videoId && player) {
        player.destroy();
        setPlayer(null);
      }
      if (videoId && !player && playerRef.current) {
        const url = new URL(videoId);
        const videoIdParam = url.searchParams.get('v');
        if (videoIdParam) {
          const newPlayer = new YT.Player(playerRef.current, {
            videoId: videoIdParam,
            height: '150',
            width: '400',
            playerVars: {
              autoplay: 1,
            },
            events: {
              onReady: (event) => {
                const playerInstance = event.target;
                setTitle(playerInstance.getVideoData().title);
                setPlayer(playerInstance);
              },
              onStateChange: (event) => {
                if (event.data === YT.PlayerState.PLAYING) {
                  setAudioSubmit(true);
                  setPlaying(true);
                } else if (event.data === YT.PlayerState.PAUSED) {
                  setPlaying(false);
                } else if (event.data === YT.PlayerState.ENDED) {
                  setPlaying(false);
                  setSeek(duration); // 플레이가 종료되면 Seek을 duration으로 설정
                }
              },
              onError: (event) => {
                if ([2, 5, 100, 101, 150].includes(event.data)) {
                  setValidURL(false); // 여기에서 비디오의 유효성을 다시 검사
                  setAudioSubmit(false);
                  if (intervalId) {
                    clearInterval(intervalId);
                  }
                  setVideoId('');
                  setTitle('');
                  setSelectedTitle('');
                  setSeek(0);
                  setDuration(0);
                }
              },
            },
          });
        }
      }
    }

    if (typeof window !== 'undefined') {
      if ('YT' in window) {
        createPlayer();
      } else {
        (window as Windows).onYouTubeIframeAPIReady = () => {
          createPlayer();
        };
      }
    }
  }, [videoId, player]);

  return (
    <div
      style={{
        marginTop: '12px',
      }}
    >
      <InputBox
        type="text"
        placeholder="YouTube URL을 입력하세요"
        value={inputURL}
        onChange={(e) => setInputURL(e.target.value)}
      />
      <Button type="button" onClick={handleURLValidation}>
        확인
      </Button>
      {!validURL && <div>URL이 유효하지 않습니다.</div>}
      <PlayerWrapper videoId={videoId}>
        {update !== '3' && (
          <CloseButton onClick={handleClosePlayer}>X</CloseButton>
        )}
        <div id="player" ref={playerRef} />
        <Script src="https://www.youtube.com/iframe_api" />
      </PlayerWrapper>
    </div>
  );
};

export default YoutubePlayer;
