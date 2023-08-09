import React, { useEffect, useState } from 'react';
import { DetailYoutubePlayerComponent } from '@/styles/detail';
import YoutubePlayer from '../Write/YoutubePlayer';

interface YoutubePlayerProps {
  videoId: string;
  musicTitle: string;
  musicUrl: string;
}

const DetailYoutubePlayer = () => {
  const [data, setData] = useState<YoutubePlayerProps>({
    videoId: '',
    musicTitle: '',
    musicUrl: '',
  });

  useEffect(() => {
    fetch('http://localhost:3001/test/post/1')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((responseData) => {
        setData({
          videoId: responseData.post.videoId,
          musicTitle: responseData.post.musicTitle,
          musicUrl: responseData.post.musicUrl,
        });
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      {/* YoutubePlayer 컴포넌트 사용 */}
      <YoutubePlayer
        videoId={data.videoId}
        setVideoId={() => {}}
        setSelectedTitle={() => {}}
      />

      <h2>Music Title: {data.musicTitle}</h2>
      <p>Music URL: {data.musicUrl}</p>
      {data.musicTitle && data.musicUrl && <DetailYoutubePlayerComponent />}
    </div>
  );
};

export default DetailYoutubePlayer;
