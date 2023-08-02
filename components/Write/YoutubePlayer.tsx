import { StyledAuthInput } from '@/styles/write';
import Script from 'next/script';
import React, { useEffect, useRef, useState } from 'react';

const YoutubePlayer = ({ videoId }) => {
  const [player, setPlayer] = useState(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!videoId && player) {
      player.destroy();
      setPlayer(null);
    }
    if (videoId && !player) {
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
  }, [videoId, player]);
  return (
    <>
      <StyledAuthInput
        type="text"
        placeholder="URL"
        value={videoId}
        readOnly={true}
        style={{ width: '600px' }}
      />
      <div id="player" ref={playerRef} />
      <Script src="https://www.youtube.com/iframe_api" />
    </>
  );
};

export default YoutubePlayer;
