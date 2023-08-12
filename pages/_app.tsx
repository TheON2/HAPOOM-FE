import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { createWrapper } from 'next-redux-wrapper';
import store from '../redux/config/configStore';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import AuthChecker from '@/components/common/AuthChecker';
import Layout from '@/components/common/layout/Layout';
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

const wrapper = createWrapper(() => store);

export default wrapper.withRedux(MyApp);
