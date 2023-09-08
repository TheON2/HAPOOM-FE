
import React from 'react';
import { render } from '@testing-library/react';
import HashtagContents from '@/components/Home/HashtagContents';
import { useRouter } from 'next/router';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import userReducer from '@/redux/reducers/userSlice';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

const mockProps = {
  serverPropData: [
    { image: '/image1.jpg', postId: 1 },
    { image: '/image2.jpg', postId: 2 },
  ],
  tagData: [
    { Images: [{ url: '/image3.jpg' }], postId: 3 },
    { Images: [{ url: '/image4.jpg' }], postId: 4 },
  ],
  undefindeTag: [
    { image: '/image5.jpg', postId: 5 },
    { image: '/image6.jpg', postId: 6 },
  ],
  hashTag: 'exampleHashtag',
  tagCategory: 'unique',
};

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const queryClient = new QueryClient();

describe('해시태그 컨텐츠 컴포넌트', () => {
  let store: EnhancedStore;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        user: userReducer,
      },
    });
    jest.clearAllMocks();
  });

  test('해시태그 컨텐츠 데이터 렌더링 확인', () => {
    const { getByText, getAllByAltText } = render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <HashtagContents {...mockProps} />
        </QueryClientProvider>
      </Provider>
    );

    expect(getByText('#exampleHashtag')).toBeInTheDocument();

    const imageComponents = getAllByAltText('date');
    expect(imageComponents).toHaveLength(2);
  });
});
