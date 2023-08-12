import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { createWrapper } from 'next-redux-wrapper';
import store from '../redux/config/configStore';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import AuthChecker from '@/components/common/AuthChecker';
import { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

const queryClient = new QueryClient();
const ENDPOINT = 'http://localhost:3001';

function MyApp({ Component, pageProps }: AppProps) {
  const [notification, setNotification] = useState<string | null>(null);
  const [randomPosts, setRandomPosts] = useState(null);

  useEffect(() => {
    // 로그인 성공 후 Socket.IO 클라이언트를 생성하고 서버에 연결합니다.
    const socket = socketIOClient(ENDPOINT);

    // 서버로부터 "notify-post" 이벤트를 수신하면 알림을 설정합니다.
    socket.on('notify-post', (data) => {
      setNotification(data.message);
    });

    socket.on('loginSuccess', (data) => {
      const { email, nickname } = data;
      setNotification(
        `User ${nickname} with email ${email} logged in successfully.`
      );

      setTimeout(() => {
        setNotification(null);
      }, 5000);
    });

    socket.on('random-posts', (posts) => {
      setRandomPosts(posts);

      // 2초 후에 게시물 숨기기
      setTimeout(() => {
        setRandomPosts(null);
      }, 5000);
    });

    // 컴포넌트가 언마운트될 때 소켓 연결을 닫습니다.
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {notification && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: '10px',
            textAlign: 'center',
            zIndex: 1000,
            animation: 'fadeIn 0.5s, fadeOut 0.5s 1.5s',
          }}
        >
          {notification}
        </div>
      )}
      {randomPosts && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: '10px',
            textAlign: 'center',
            zIndex: 1000,
            animation: 'fadeIn 0.5s, fadeOut 0.5s 1.5s',
          }}
        >
          {randomPosts &&
            randomPosts.map((post, index) => (
              <div key={index} className="fade-in-post">
                <h3>{post.title}</h3>
                <p>{post.content}</p>
              </div>
            ))}
        </div>
      )}
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

const wrapper = createWrapper(() => store);

export default wrapper.withRedux(MyApp);
