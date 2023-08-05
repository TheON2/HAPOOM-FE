import React, { useState, useEffect } from 'react';
import YoutubePlayer from '../Write/YoutubePlayer'; // YoutubePlayer의 경로를 적절하게 수정해주세요.

const DetailYoutubePlayer: React.FC = () => {
  const [videoId, setVideoId] = useState<string>('');

  // 비디오 ID를 가져오는 로직
  useEffect(() => {
    // 예를 들어, 여기에 비디오 ID를 가져오는 API 호출 또는 로직을 넣어주세요.
    // 예시: setVideoId(retrievedVideoId);
  }, []);

  return (
    <div>
      <h1>Detail Youtube Player</h1>
      {videoId && <YoutubePlayer videoId={videoId} />}
    </div>
  );
};

export default DetailYoutubePlayer;
