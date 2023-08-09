import React from 'react';
import { DetailYoutubePlayerComponent } from '@/styles/detail';
import YoutubePlayer from '../Write/YoutubePlayer';

interface YoutubePlayerProps {
  videoId: string;
  musicTitle: string;
  musicUrl: string;
}

const DetailYoutubePlayer = ({
  videoId,
  musicTitle,
  musicUrl,
}: YoutubePlayerProps) => {
  return (
    <div>
      {/* YoutubePlayer 컴포넌트 사용 */}
      <YoutubePlayer
        videoId={videoId}
        setVideoId={() => {}}
        setSelectedTitle={() => {}}
      />

      <h2>Music Title: {musicTitle}</h2>
      <p>Music URL: {musicUrl}</p>
      {musicTitle && musicUrl && <DetailYoutubePlayerComponent />}
    </div>
  );
};

export default DetailYoutubePlayer;
