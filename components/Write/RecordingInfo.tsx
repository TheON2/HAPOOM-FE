import { RecordButtonBox } from '@/styles/write';
import React, { useEffect, useState } from 'react';

interface RecordingInfoProps {
  audioUrl: string | undefined;
  recording: boolean;
}

const RecordingInfo = ({ audioUrl, recording }: RecordingInfoProps) => {
  const [recordingTime, setRecordingTime] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (recording) {
      setRecordingTime(0);
      timer = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [recording]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <RecordButtonBox>
      <h3>녹음 정보</h3>
      <p>녹음 시간: {formatTime(recordingTime)}</p>
    </RecordButtonBox>
  );
};

export default RecordingInfo;
