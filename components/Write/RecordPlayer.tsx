import React, { useEffect, useRef, useState } from 'react';
import Recorder from 'recorder-js';
import Slider from 'react-slider';
import toWav from 'audiobuffer-to-wav';
import { Title } from '@/styles/youtubeplayer';
import styled from 'styled-components';
import CustomPlayer from './CustomPlayer';

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const StyledSlider = styled(Slider)`
  width: 100%;
  height: 25px;
`;

const Thumb = styled.div`
  height: 25px;
  line-height: 25px;
  width: 25px;
  text-align: center;
  background-color: #000;
  color: #fff;
  border-radius: 50%;
  cursor: grab;
`;

interface RecordPlayerProps {
  setRecording: React.Dispatch<React.SetStateAction<boolean>>;
  setAudioFile: React.Dispatch<React.SetStateAction<Blob | null>>;
}

const RecordPlayer: React.FC<RecordPlayerProps> = ({
  setRecording,
  setAudioFile,
}) => {
  const [recording, setInternalRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | undefined>(undefined);
  const [slicedAudioURL, setSlicedAudioURL] = useState<string | undefined>(
    undefined
  );
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const recorderRef = useRef<Recorder | null>(null);
  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(duration);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)({
      sampleRate: 44100, // 샘플 레이트를 44.1kHz로 설정
    });
    audioContextRef.current = audioContext;

    const recorder = new Recorder(audioContext);
    recorder.init(stream);
    recorderRef.current = recorder;
    recorder.start();
    setInternalRecording(true);
  };

  const stopRecording = async () => {
    if (recorderRef.current) {
      const { blob } = await recorderRef.current.stop();
      const url = URL.createObjectURL(blob);
      setAudioURL(url);
      setInternalRecording(false);

      console.log('Recorded Blob:', blob); // 녹음된 Blob 객체를 출력
      console.log('Audio URL:', url); // 오디오 URL을 출력

      const audio = new Audio(url);
      audio.onloadedmetadata = () => {
        setDuration(Math.floor(audio.duration));
      };
      if (setAudioFile) {
        // 부모 컴포넌트에게 오디오 파일 전달
        setAudioFile(blob);
      }
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setPlaying(!playing);
    }
  };

  const handleClosePlayer = () => {
    setAudioURL(undefined);
    setSlicedAudioURL(undefined);
    setPlaying(false);
    setDuration(0);
    setInternalRecording(false);
    if (recorderRef.current) {
      recorderRef.current.stop();
    }
    setRecording(false); // 부모 컴포넌트에게 플레이어 닫힘 알리기
  };

  const handleSliderChange = (
    values: number | readonly number[],
    index: number
  ) => {
    if (Array.isArray(values)) {
      setSelectionStart(values[0]);
      setSelectionEnd(values[1]);
    }
  };

  const sliceAudio = async (start: number, end: number) => {
    const audioContext = audioContextRef.current;
    if (!audioContext || !audioURL) return;

    // 원본 오디오 데이터 로드
    const response = await fetch(audioURL);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    // 선택된 구간만큼 버퍼 복사
    const slicedBuffer = audioContext.createBuffer(
      audioBuffer.numberOfChannels,
      (end - start) * audioBuffer.sampleRate,
      audioBuffer.sampleRate
    );

    for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
      const originalData = audioBuffer.getChannelData(channel);
      const slicedData = slicedBuffer.getChannelData(channel);
      for (
        let i = start * audioBuffer.sampleRate, j = 0;
        i < end * audioBuffer.sampleRate;
        i++, j++
      ) {
        slicedData[j] = originalData[i];
      }
    }
    const wavBuffer = toWav(slicedBuffer);

    // Blob 객체 생성
    const audioBlob = new Blob([wavBuffer], { type: 'audio/wav' });

    // 새 URL 생성
    // const url = URL.createObjectURL(audioBlob);
    // setAudioURL(url);
    // if (setAudioFile) {
    //   // 부모 컴포넌트에게 오디오 파일 전달
    //   setAudioFile(audioBlob);
    // }
    const url = URL.createObjectURL(audioBlob);
    setSlicedAudioURL(url);
  };

  useEffect(() => {
    if (audioURL) {
      const audio = new Audio(audioURL);
      audioRef.current = audio;
      audio.onloadedmetadata = () => {
        setDuration(audio.duration);
        setSelectionEnd(audio.duration);
        console.log('Audio Duration:', audio.duration); // 여기에서 지속 시간을 콘솔에 출력
      };
      audio.ontimeupdate = () => {};
      audio.onended = () => {
        setPlaying(false);
      };
    }
  }, [audioURL, playing, duration]);

  return (
    <div style={{ width: '400px', position: 'relative' }}>
      <Title>Audio Recorder</Title>
      {audioURL ? (
        <>
          <CustomPlayer
            audioUrl={audioURL}
            setAudioUrl={setAudioURL}
            title={'녹음된 파일'}
          />
          <StyledSlider
            value={[selectionStart, selectionEnd]}
            min={0}
            max={duration}
            step={0.01}
            onChange={handleSliderChange}
            renderThumb={(props, state) => (
              <Thumb {...props}>{state.valueNow}</Thumb>
            )}
          />
          <button
            type="button"
            onClick={() => sliceAudio(selectionStart, selectionEnd)}
          >
            Slice Audio
          </button>
          {slicedAudioURL && (
            <div>
              <CustomPlayer
                audioUrl={slicedAudioURL}
                setAudioUrl={setSlicedAudioURL}
                title={'잘라낸 녹음 파일'}
              />
            </div>
          )}
        </>
      ) : recording ? (
        <button type="button" onClick={stopRecording}>
          Stop Recording
        </button>
      ) : (
        <button type="button" onClick={startRecording}>
          Start Recording
        </button>
      )}
    </div>
  );
};

export default RecordPlayer;
