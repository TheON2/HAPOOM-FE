import {
  CloseButton,
  CustomPlayerWrapper,
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
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import playImage from '@/public/play.png';
import pauseImage from '@/public/pause.png';

interface UniversalPlayerProps {
  audioUrl: string|undefined;
  setAudioUrl: React.Dispatch<React.SetStateAction<string|undefined>>;
  title?: string;
}

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const CustomPlayer = ({
  audioUrl,
  setAudioUrl,
  title,
}: UniversalPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [seek, setSeek] = useState(0);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = +e.target.value;
    setSeek(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.volume = +e.target.value / 100;
    }
  };

  const handleClosePlayer = () => {
    setAudioUrl(''); // 플레이어를 닫습니다.
    setSeek(0);
    setDuration(0);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current!.duration);
      });

      audioRef.current.addEventListener('timeupdate', () => {
        setSeek(audioRef.current!.currentTime);
      });

      audioRef.current.addEventListener('pause', () => setPlaying(false));
      audioRef.current.addEventListener('play', () => setPlaying(true));
    }
  }, [audioUrl]);

  return (
    <>
      <CustomPlayerWrapper>
        <CloseButton onClick={handleClosePlayer}>X</CloseButton>
        <Title>{title}</Title>
        <audio ref={audioRef} src={audioUrl} style={{ display: 'none' }} />

        <PlayerControls>
          <PlayButtonGroup>
            <PlayButton type="button" onClick={handlePlayPause}>
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
      </CustomPlayerWrapper>
    </>
  );
};

export default CustomPlayer;
