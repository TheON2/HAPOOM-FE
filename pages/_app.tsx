import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { createWrapper, MakeStore } from 'next-redux-wrapper';
import store, { RootState } from '../redux/config/configStore';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import AuthChecker from '@/components/common/AuthChecker';
import { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import Layout from '@/components/common/layout/Layout';
import MobileBottomNav from '@/components/common/MobileBottomNav';
import { useRouter } from 'next/router';
import Script from 'next/script';
import AlarmContainer, { AlarmBar } from '@/components/common/AlarmBar';
import { Provider, useDispatch, useSelector } from 'react-redux';
import SocketManager from '@/components/common/Socket';
import ThemedApp from '@/components/common/ThemedApp';
import ThemeInitializer from '@/components/common/ThemeInitializer';
const queryClient = new QueryClient();

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
  console.log(notification);
  console.log(randomPosts);

  return (
    <>
      <Provider store={store}>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
          <>
            <SocketManager
              setNotification={setNotification}
              setRandomPosts={setRandomPosts}
            />
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
              {notification && <div>{notification}</div>}
              <ThemedApp>
                <ThemeInitializer />
                <AlarmContainer />
                {/* <AlarmBar alarm={notification} /> */}

                <Layout>
                  <Component {...pageProps} randomPosts={randomPosts} />
                </Layout>
                <MobileBottomNav />
              </ThemedApp>
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
