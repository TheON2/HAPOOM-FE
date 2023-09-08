
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import PopularContentsCarousel from '@/components/Home/PopularContentsCarousel';
import { MainPageDataProps } from '@/types/home';
import { useRouter } from 'next/router';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import userReducer from '@/redux/reducers/userSlice';

const data: MainPageDataProps[] = [
  {
    image: '/image1.jpg',
    postId: 1,
    nickname: '닉네임',
    private: false,
    tag: '태그',
    updatedAt: '20230708',
  },
  {
    image: '/image1.jpg',
    postId: 1,
    nickname: '닉네임',
    private: false,
    tag: '태그',
    updatedAt: '20230708',
  },
  {
    image: '/image1.jpg',
    postId: 1,
    nickname: '닉네임',
    private: false,
    tag: '태그',
    updatedAt: '20230708',
  },
];
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
const queryClient = new QueryClient();

describe('오늘의 좋아요 캐러셀 컴포넌트', () => {
  let store: EnhancedStore;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        user: userReducer,
      },
    });
    jest.clearAllMocks();
  });
  test('오늘의 좋아요 슬라이드 목업 데이터 3개 확인', () => {
    const { getByText, getAllByAltText } = render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <PopularContentsCarousel data={data} />
        </QueryClientProvider>
      </Provider>
    );

    expect(getByText('#오늘의 좋아요')).toBeInTheDocument();
    expect(getAllByAltText('popular content image')).toHaveLength(3);
  });
});

