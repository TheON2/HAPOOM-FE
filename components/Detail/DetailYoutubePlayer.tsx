import React, { useEffect, useState } from 'react';
import { DetailYoutubePlayerComponent } from '@/styles/detail';

interface IPost {
  id: number;
  musicTitle: string;
  musicUrl: string;
  // 다른 필요한 필드도 여기에 추가할 수 있습니다.
}

interface IData {
  videoId: string;
  likePosts: IPost[];
  posts: IPost[];
  musicUrl: string;
  musicTitle: string;
}

// YouTube Player 타입 정의
declare global {
  interface Window {
    YT: any;
  }
}

const DetailYoutubePlayer = () => {
  const [videoId, setVideoId] = useState<string>('');
  const [data, setData] = useState<IData | null>(null);
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/main')
      .then((response) => response.json())
      .then((data) => {
        console.log('API Response:', data);

        // Find the item with id: 1 in the posts array
        const itemWithIdOne = data.posts.find((item: any) => item.id === 1);

        // Access the musicTitle and musicUrl from the found item
        if (itemWithIdOne) {
          const { musicTitle, musicUrl } = itemWithIdOne;
          console.log('musicTitle:', musicTitle);
          console.log('musicUrl:', musicUrl);
        }

        setVideoId(data.videoId);
        setData(data);
        setPosts(data.likePosts);
      });
  }, []);

  useEffect(() => {
    // Load the YouTube API script
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    // YouTube Player 생성
    if (videoId && window.YT) {
      const player = new window.YT.Player('player', {
        videoId: videoId,
        height: '150',
        width: '600',
        playerVars: {
          autoplay: 1,
        },
      });

      // Optional: Add an event listener for when the player is ready
      player.addEventListener('onReady', () => {
        // Do something when the player is ready
      });

      // Cleanup function to remove the player when the component unmounts
      return () => {
        player.destroy();
      };
    }
  }, [videoId]);

  const musicTitle = data?.musicTitle || '';
  const musicUrl = data?.musicUrl || '';

  return (
    <div>
      {/* Render the YouTube player in this div */}
      <div id="player" />

      {/* Display the musicTitle and musicUrl */}
      <h2>Music Title: {musicTitle}</h2>
      <p>Music URL: {musicUrl}</p>

      {/* You can pass other data to the DetailYoutubePlayerComponent */}
      {musicTitle && musicUrl && <DetailYoutubePlayerComponent />}
    </div>
  );
};

export default DetailYoutubePlayer;
