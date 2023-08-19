import React, { useEffect, useRef, useState } from 'react';
import Recorder from 'recorder-js';
import Slider from 'react-slider';
import toWav from 'audiobuffer-to-wav';
import { Title } from '@/styles/youtubeplayer';
import styled from 'styled-components';
import CustomPlayer from './CustomPlayer';
import RecordingInfo from './RecordingInfo';
import { GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';

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

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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

interface RecorderReference {
  recorder: Recorder;
  updateDurationInterval: number;
}

interface RecordPlayerProps {
  setAudioFile: React.Dispatch<React.SetStateAction<Blob | null>>;
  setSlicedAudioFile: React.Dispatch<React.SetStateAction<Blob | null>>;
  audioURL: string | undefined;
  setAudioURL: React.Dispatch<React.SetStateAction<string | undefined>>;
  slicedAudioURL: string | undefined;
  setSlicedAudioURL: React.Dispatch<React.SetStateAction<string | undefined>>;
  setIsShow: (state: boolean) => void;
}

const RecordPlayer: React.FC<RecordPlayerProps> = ({
  setAudioFile,
  setSlicedAudioFile,
  slicedAudioURL,
  setSlicedAudioURL,
  audioURL,
  setAudioURL,
  setIsShow,
}) => {
  const [recording, setInternalRecording] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const recorderRef = useRef<RecorderReference | null>(null);
  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(duration);

  const startRecording = async () => {
    setDuration(0);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)({
      sampleRate: 44100, // 샘플 레이트를 44.1kHz로 설정
    });
    audioContextRef.current = audioContext;

    const recorder = new Recorder(audioContext);
    recorder.init(stream);
    const updateDurationInterval = window.setInterval(() => {
      setDuration((prevDuration) => prevDuration + 1);
    }, 1000);

    recorderRef.current = {
      recorder, // Recorder 인스턴스
      updateDurationInterval, // setInterval의 반환값
    };
    recorder.start();

    setInternalRecording(true);
  };

  const stopRecording = async () => {
    if (recorderRef.current) {
      const { recorder, updateDurationInterval } = recorderRef.current;
      clearInterval(updateDurationInterval);
      const { blob } = await recorderRef.current.recorder.stop();
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
      setIsShow(false);
    }
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
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)({
      sampleRate: 44100,
    });
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

    const audioBlob = new Blob([wavBuffer], { type: 'audio/wav' });

    const url = URL.createObjectURL(audioBlob);
    setSlicedAudioURL(url);
    setSlicedAudioFile(audioBlob);
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
    } else {
      setSlicedAudioURL(undefined);
      setSlicedAudioFile(null);
    }
  }, [audioURL, playing, duration, setSlicedAudioURL, setSlicedAudioFile]);

  return (
    <Container>
      <div style={{ width: '400px', position: 'relative' }}>
        <Title>Audio Recorder</Title>

        {recording && (
          <>
            <RecordingInfo audioUrl={audioURL} recording={recording} />
          </>
        )}

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
    </Container>
  );
};

export default RecordPlayer;
