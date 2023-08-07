import React, { useEffect, useState } from 'react';
import { DetailYoutubePlayerComponent } from '@/styles/detail';

const DetailYoutubePlayer = () => {
  const [videoId, setVideoId] = useState('');
  const [data, setData] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/main')
      .then((response) => response.json())
      .then((data) => {
        console.log('API Response:', data);

        // Find the item with id: 1 in the posts array
        const itemWithIdOne = data.posts.find((item) => item.id === 1);

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

  const { musicTitle, musicUrl } = data;

  return (
    <div>
      {/* Render the YouTube player in this div */}
      <div id="player" />

      {/* Display the musicTitle and musicUrl */}
      <h2>Music Title: {musicTitle}</h2>
      <p>Music URL: {musicUrl}</p>

      {/* You can pass other data to the DetailYoutubePlayerComponent */}
      {musicTitle && musicUrl && (
        <DetailYoutubePlayerComponent
          posts={posts}
          videoId={videoId}
          musicTitle={musicTitle}
          musicUrl={musicUrl}
        />
      )}
    </div>
  );
};

export default DetailYoutubePlayer;
