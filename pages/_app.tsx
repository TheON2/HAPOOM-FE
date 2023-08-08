import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { createWrapper } from 'next-redux-wrapper';
import store from '../redux/config/configStore';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import AuthChecker from '@/components/common/AuthChecker';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

const wrapper = createWrapper(() => store);

export default wrapper.withRedux(MyApp);
