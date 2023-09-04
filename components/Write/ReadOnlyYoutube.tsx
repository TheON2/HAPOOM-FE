import { CloseButton, PlayerWrapper } from '@/styles/youtubeplayer';
import Script from 'next/script';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { Xmark } from '../common/SVG';

interface YoutubePlayerProps {
  videoId: string;
  setVideoId?: React.Dispatch<React.SetStateAction<string>>;
  setSelectedTitle?: React.Dispatch<React.SetStateAction<string>>;
  setMusicType?: React.Dispatch<React.SetStateAction<number>>;
  setMusicChoose?: React.Dispatch<React.SetStateAction<number>>;
  setAudioSubmit?: React.Dispatch<React.SetStateAction<boolean>>;
  update: string;
}

interface Windows extends Window {
  onYouTubeIframeAPIReady: () => void;
}

const ReadOnlyYoutube = ({
  videoId,
  setVideoId,
  setSelectedTitle,
  setMusicType,
  setMusicChoose,
  setAudioSubmit,
  update,
}: YoutubePlayerProps) => {
  const [player, setPlayer] = useState<YT.Player | null>(null);
  const playerRef = useRef<HTMLDivElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [seek, setSeek] = useState(0);
  const [duration, setDuration] = useState(0);
  const [title, setTitle] = useState<string | null>(null);

  const handleClosePlayer = (e: FormEvent) => {
    e.preventDefault();
    setTitle('');
    if (setVideoId) setVideoId('');
    if (setSelectedTitle) setSelectedTitle('');
    if (setMusicType) setMusicType(0);
    if (setMusicChoose) setMusicChoose(0);
    if (setAudioSubmit) setAudioSubmit(false);
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
                  if (setVideoId) setVideoId('');
                  if (setSelectedTitle) setSelectedTitle('');
                  if (setMusicType) setMusicType(0);
                  setTitle('');
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
    <>
      <PlayerWrapper videoId={videoId}>
        {update !== '3' && (
          <CloseButton onClick={handleClosePlayer}>
            <Xmark />
          </CloseButton>
        )}
        <div id="player" ref={playerRef} />
        <Script src="https://www.youtube.com/iframe_api" />
      </PlayerWrapper>
    </>
  );
};

export default ReadOnlyYoutube;
