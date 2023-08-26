import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { createWrapper, MakeStore } from 'next-redux-wrapper';
import store from '../redux/config/configStore';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import AuthChecker from '@/components/common/AuthChecker';
import { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import Layout from '@/components/common/layout/Layout';
import MobileBottomNav from '@/components/common/MobileBottomNav';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { AlarmBar } from '@/components/common/AlarmBar';
import { Provider } from 'react-redux';
const queryClient = new QueryClient();
const ENDPOINT = `${process.env.NEXT_PUBLIC_LOCAL_SERVER}`;

function MyApp({ Component, pageProps }: AppProps) {
  const [notification, setNotification] = useState<string | null>(null);
  const [randomPosts, setRandomPosts] = useState<any[] | null>(null);
  const router = useRouter();
  const excludedPages = [
    '/auth/SignIn',
    '/auth/SignUp',
    '/findPassword/FindPwd',
    '/findPwdComplete/FindPwdComplete',
    '/signUpComplete/SignUpComplete',
  ];
  const isExcludedPage = excludedPages.includes(router.pathname);

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
      }, 10000);
    });

    socket.on('newPost', (latestPosts) => {
      setNotification(`새 글이 등록 되었습니다.`);
    });

    // socket.on('latest-posts', (latestPosts) => {

    // });

    // Notification permission 요청
    function requestNotificationPermission() {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          subscribeUserToPush(); // 권한이 허용되면 Push Subscription 생성
        } else {
          console.error('Notification permission denied.');
        }
      });
    }

    // Push Subscription 생성
    async function subscribeUserToPush() {
      const registration = await navigator.serviceWorker.ready;

      const subscribeOptions = {
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      };

      const pushSubscription = await registration.pushManager.subscribe(
        subscribeOptions
      );

      // 서버에 Push Subscription 저장
      await fetch(`${ENDPOINT}/api/util/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pushSubscription),
      });
    }

    // 예시로, 앱이 로드될 때 알림 권한 요청
    requestNotificationPermission();

    // 컴포넌트가 언마운트될 때 소켓 연결을 닫습니다.
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <Provider store={store}>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
            />
            <Script id="ga-gtag" strategy="afterInteractive">
              {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
            `}
            </Script>
          </>
        )}
        <QueryClientProvider client={queryClient}>
          {!isExcludedPage ? (
            <>
              {notification && <AlarmBar alarm={notification} />}

              <Layout>
                <Component {...pageProps} randomPosts={randomPosts} />
              </Layout>
              <MobileBottomNav />
            </>
          ) : (
            <Component {...pageProps} />
          )}
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default MyApp;
