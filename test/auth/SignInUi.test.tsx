//SignInUi.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
    };
  },
}));

import { QueryClient, QueryClientProvider } from 'react-query';
import store from '@/redux/config/configStore';
import SignInUi from '@/components/SignIn/SignInUi';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

describe('SignInUi', () => {
  it('renders SignInUi component', () => {
    const queryClient = new QueryClient();

    const { getByTestId, getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <SignInUi />
        </QueryClientProvider>
      </Provider>
    );

    expect(getByTestId('signin-ui')).toBeInTheDocument();

    // 필요한 요소들이 있는지 확인
    expect(getByText('HAPOOM')).toBeInTheDocument();

    // 예시: email과 password input field가 있는지 확인
    expect(getByPlaceholderText('이메일을 입력해 주세요')).toBeInTheDocument();
    expect(
      getByPlaceholderText('비밀번호를 입력해 주세요')
    ).toBeInTheDocument();
  });
});
