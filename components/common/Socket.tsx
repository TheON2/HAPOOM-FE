import { RootState } from '@/redux/config/configStore';
import {
  ADD_NOTIFICATION,
  CLEAR_NOTIFICATION,
} from '@/redux/reducers/notificationSlice';
import { UserState } from '@/redux/reducers/userSlice';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
  // console.log('소켓 컴포넌트');

  // const dispatch = useDispatch();
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    // push가 true인 경우에만 소켓 이벤트를 수신
    console.log('푸시 설정 ON');


    socket.on('notify-post', (data) => {
      if (user.push) setNotification(data.message);
    });

    socket.on('loginSuccess', (data) => {
      const { email, nickname } = data;
      if (user.push)
        setNotification(
          `User ${nickname} with email ${email} logged in successfully.`
        );

      setTimeout(() => {
        setNotification(null);
      }, 5000);
    });

    socket.on('random-posts', (posts) => {
      if (user.push) setRandomPosts(posts);
    });

    socket.on('newPost', () => {
      if (user.push) setNotification(`새 글이 등록 되었습니다.`);
    });

    return () => {
      socket.disconnect();
    };

  }, [user.push, setNotification, setRandomPosts]); // user.push를 의존성 배열에 추가

  return null; // 이 컴포넌트는 UI를 렌더링하지 않습니다.
}

export default SocketManager;
