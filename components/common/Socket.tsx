import { RootState } from '@/redux/config/configStore';
import { UserState } from '@/redux/reducers/userSlice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import socketIOClient from 'socket.io-client';

const ENDPOINT = `${process.env.NEXT_PUBLIC_LOCAL_SERVER}`;

interface SocketManagerProps {
  setNotification: React.Dispatch<React.SetStateAction<string | null>>;
  setRandomPosts: React.Dispatch<React.SetStateAction<any[] | null>>;
}

function SocketManager({
  setNotification,
  setRandomPosts,
}: SocketManagerProps) {
  const { user }: { user: UserState['user'] } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (user.push) {
      // push가 true인 경우에만 소켓 이벤트를 수신
      const socket = socketIOClient(ENDPOINT);

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

        setTimeout(() => {
          setRandomPosts(null);
        }, 10000);
      });

      socket.on('newPost', () => {
        setNotification(`새 글이 등록 되었습니다.`);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [user.push, setNotification, setRandomPosts]); // user.push를 의존성 배열에 추가

  return null; // 이 컴포넌트는 UI를 렌더링하지 않습니다.
}

export default SocketManager;
