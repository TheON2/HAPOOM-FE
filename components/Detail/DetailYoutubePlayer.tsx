import React, { useEffect, useRef, useState } from 'react';
import { DetailYoutubePlayerComponent } from '@/styles/detail';

interface YoutubePlayerProps {
  videoId: string;
}

interface IPost {
  id: number;
  musicTitle: string;
  musicUrl: string;
}

interface IData {
  videoId: string;
  likePosts: IPost[];
  posts: IPost[];
  musicUrl: string;
  musicTitle: string;
}

declare global {
  interface Window {
    YT: any;
  }
}

const DetailYoutubePlayer = ({ videoId }: YoutubePlayerProps) => {
  console.log(videoId);
  const [player, setPlayer] = useState<YT.Player | null>(null);
  const playerRef = useRef<HTMLDivElement | null>(null);
  const [data, setData] = useState<IData | null>(null);
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/main')
      .then((response) => response.json())
      .then((data) => {
        console.log('API Response:', data);

        const itemWithIdOne = data.posts.find((item: any) => item.id === 1);
        if (itemWithIdOne) {
          const { musicTitle, musicUrl } = itemWithIdOne;
          console.log('musicTitle:', musicTitle);
          console.log('musicUrl:', musicUrl);
        }

        setData(data);
        setPosts(data.likePosts);
      });
  }, []);

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
            width: '600',
            playerVars: {
              autoplay: 1,
            },
          });
          setPlayer(newPlayer);
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

  const musicTitle = data?.musicTitle || '';
  const musicUrl = data?.musicUrl || '';

  return (
    <div>
      <div id="player" ref={playerRef} />

      <h2>Music Title: {musicTitle}</h2>
      <p>Music URL: {musicUrl}</p>
      {musicTitle && musicUrl && <DetailYoutubePlayerComponent />}
    </div>
  );
};

export default DetailYoutubePlayer;
