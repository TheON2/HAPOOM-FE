import { useRouter } from 'next/router';

const AudioPlayerPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const audioSrc = id ? `http://localhost:3001/test/stream/${id}` : ''; // API 엔드포인트에 따라 변경

  return (
    <div>
      <h3>Now Playing:</h3>
      {id ? (
        <audio controls autoPlay>
          <source src={audioSrc} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AudioPlayerPage;
