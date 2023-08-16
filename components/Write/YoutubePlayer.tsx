import {
  CloseButton,
  PlayButton,
  PlayButtonGroup,
  PlayerControls,
  PlayerWrapper,
  SeekSlider,
  SeekSliderGroup,
  TimeLabel,
  Title,
  VolumeSlider,
  VolumeSliderGroup,
} from '@/styles/youtubeplayer';
import Script from 'next/script';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import playImage from '@/public/play.png';
import pauseImage from '@/public/pause.png';

interface YoutubePlayerProps {
  videoId: string;
  setVideoId: React.Dispatch<React.SetStateAction<string>>;
  setSelectedTitle: React.Dispatch<React.SetStateAction<string>>;
}

interface Windows extends Window {
  onYouTubeIframeAPIReady: () => void;
}

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const YoutubePlayer = ({
  videoId,
  setVideoId,
  setSelectedTitle,
}: YoutubePlayerProps) => {
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [player, setPlayer] = useState<YT.Player | null>(null);
  const playerRef = useRef<HTMLDivElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [seek, setSeek] = useState(0);
  const [duration, setDuration] = useState(0);
  const [title, setTitle] = useState<string | null>(null);

  const handlePlayPause = (e: React.MouseEvent) => {
    e.preventDefault();
    if (player) {
      if (player.getPlayerState() === YT.PlayerState.PLAYING) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
    }
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (player) {
      const time = +e.target.value;
      setSeek(time); // 현재 탐색 시간을 업데이트하여 UI가 반응하게 합니다.
      player.seekTo(time, true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (player) {
      player.setVolume(+e.target.value);
    }
  };

  const handleClosePlayer = (e: FormEvent) => {
    e.preventDefault();
    if (intervalId) {
      clearInterval(intervalId); // 인터벌 종료
    }
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
            height: '0',
            width: '0',
            playerVars: {
              autoplay: 1,
            },
            events: {
              onReady: (event) => {
                const playerInstance = event.target;
                setTitle(playerInstance.getVideoData().title);
                const interval = setInterval(() => {
                  if (
                    playerInstance.getPlayerState() === YT.PlayerState.PLAYING
                  ) {
                    setSeek(playerInstance.getCurrentTime());
                    setDuration(playerInstance.getDuration());
                  }
                }, 1000);
                setIntervalId(interval);
                setPlayer(playerInstance);
              },
              onStateChange: (event) => {
                if (event.data === YT.PlayerState.PLAYING) {
                  setPlaying(true);
                } else if (event.data === YT.PlayerState.PAUSED) {
                  setPlaying(false);
                } else if (event.data === YT.PlayerState.ENDED) {
                  setPlaying(false);
                  setSeek(duration); // 플레이가 종료되면 Seek을 duration으로 설정
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
    <>
      <PlayerWrapper videoId={videoId}>
        <CloseButton onClick={handleClosePlayer}>X</CloseButton>
        <Title>{title}</Title>
        <div id="player" ref={playerRef} style={{ display: 'none' }} />

        <PlayerControls>
          <PlayButtonGroup>
            <PlayButton onClick={handlePlayPause}>
              {playing ? (
                <Image src={pauseImage} alt="Pause" width={25} height={25} />
              ) : (
                <Image src={playImage} alt="Play" width={25} height={25} />
              )}
            </PlayButton>
          </PlayButtonGroup>
          <SeekSliderGroup>
            <TimeLabel>{formatTime(seek)}</TimeLabel>
            <SeekSlider
              type="range"
              min="0"
              max={duration}
              value={seek}
              onChange={handleSeekChange}
              step={0.01}
            />
            <TimeLabel>{formatTime(duration)}</TimeLabel>
          </SeekSliderGroup>
          <VolumeSliderGroup>
            <VolumeSlider
              type="range"
              min="0"
              max="100"
              onChange={handleVolumeChange}
            />
          </VolumeSliderGroup>
        </PlayerControls>
        <Script src="https://www.youtube.com/iframe_api" />
      </PlayerWrapper>
    </>
  );
};

export default YoutubePlayer;
