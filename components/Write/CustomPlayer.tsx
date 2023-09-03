import {
  CloseButton,
  CustomPlayerWrapper,
  PlayButton,
  PlayButtonGroup,
  PlayerControls,
  PlayHeader,
  SeekSlider,
  SeekSliderGroup,
  TimeLabel,
  TitleBox,
  VolumeButton,
  VolumeSlider,
  VolumeSliderGroup,
} from '@/styles/youtubeplayer';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import playImage from '@/public/play.png';
import pauseImage from '@/public/pause.png';
import { Volume, Xmark } from '../common/SVG';

interface UniversalPlayerProps {
  audioUrl: string | undefined;
  setAudioUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
  setMusicType?: React.Dispatch<React.SetStateAction<number>>;
  setMusicChoose?: React.Dispatch<React.SetStateAction<number>>;
  setAudioSubmit?: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  propsduration?: number;
  update: string;
}

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const CustomPlayer = ({
  audioUrl,
  setAudioUrl,
  setMusicType,
  setMusicChoose,
  setAudioSubmit,
  title,
  propsduration,
  update,
}: UniversalPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [seek, setSeek] = useState(0);
  const [isVolume, setIsVolume] = useState<boolean>(false);

  const handleVolumeClick = () => {
    setIsVolume(!isVolume);
  };

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
    if (audioRef.current) {
      audioRef.current.pause(); // 재생 중지
    }
    setAudioUrl(''); // 플레이어 제거
    setSeek(0);
    setDuration(0);
    if (setMusicChoose && setMusicType) {
      setMusicChoose(0);
      setMusicType(0);
    }
    if (setAudioSubmit) {
      setAudioSubmit(false);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      const handleLoadedMetadata = () => {
        if (audioRef.current) {
          setDuration(audioRef.current.duration);
        }
      };

      if (propsduration === undefined) {
        audioRef.current.addEventListener(
          'loadedmetadata',
          handleLoadedMetadata
        );
      }

      audioRef.current.addEventListener('timeupdate', () => {
        if (audioRef.current) {
          setSeek(audioRef.current.currentTime);
        }
      });

      audioRef.current.addEventListener('pause', () => setPlaying(false));
      audioRef.current.addEventListener('play', () => setPlaying(true));

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener(
            'loadedmetadata',
            handleLoadedMetadata
          );
        }
      };
    }
  }, [propsduration]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        // 자동 재생 정책에 의해 재생이 차단될 수 있으므로 여기에서 오류 처리를 할 수 있습니다.
        // console.error('자동 재생 실패:', error);
      });
    }
  }, [audioUrl]);

  return (
    <>
      <CustomPlayerWrapper>
        <audio ref={audioRef} src={audioUrl} style={{ display: 'none' }} />
        <PlayHeader>
          <TitleBox>{title}</TitleBox>
          {update !== '3' && (
            <CloseButton type="button" onClick={handleClosePlayer}>
              <Xmark />
            </CloseButton>
          )}
        </PlayHeader>
        <PlayerControls>
          <SeekSliderGroup>
            <TimeLabel>{formatTime(seek)}</TimeLabel>
            <SeekSlider
              type="range"
              min="0"
              max={propsduration ?? duration}
              value={seek}
              onChange={handleSeekChange}
              step={0.01}
            />
            <TimeLabel className="end">
              {formatTime(propsduration ?? duration)}
            </TimeLabel>
          </SeekSliderGroup>
          <PlayButtonGroup>
            <PlayButton type="button" onClick={handlePlayPause}>
              {playing ? (
                <Image src={pauseImage} alt="Pause" width={25} height={25} />
              ) : (
                <Image src={playImage} alt="Play" width={25} height={25} />
              )}
            </PlayButton>
          </PlayButtonGroup>
          <PlayButtonGroup>
            <VolumeButton type="button" onClick={handleVolumeClick}>
              <Volume />
              {/* <Image src={pauseImage} alt="Pause" width={25} height={25} /> */}
            </VolumeButton>
          </PlayButtonGroup>
          {isVolume && (
            <VolumeSliderGroup>
              <VolumeSlider
                type="range"
                min="0"
                max="100"
                onChange={handleVolumeChange}
              />
            </VolumeSliderGroup>
          )}
        </PlayerControls>
      </CustomPlayerWrapper>
    </>
  );
};

export default CustomPlayer;
