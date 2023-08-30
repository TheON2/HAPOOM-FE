import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import store from '../redux/config/configStore';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useState } from 'react';
import Layout from '@/components/common/layout/Layout';
import MobileBottomNav from '@/components/common/MobileBottomNav';
import { useRouter } from 'next/router';
import Script from 'next/script';
import AlarmContainer, { AlarmBar } from '@/components/common/AlarmBar';
import { Provider } from 'react-redux';
import SocketManager from '@/components/common/Socket';
import { appWithTranslation } from 'next-i18next';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
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
              <AlarmContainer />
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

export default appWithTranslation(MyApp);
