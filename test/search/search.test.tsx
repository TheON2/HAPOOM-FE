import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import userReducer from '@/redux/reducers/userSlice';
import Search from '@/pages/search/index';
import axios, { AxiosRequestConfig, CreateAxiosDefaults } from 'axios';
import { QueryClient, useQuery, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

// jest.mock('axios', () => {
//   return {
//     create: () => ({
//       get: jest.fn(() => Promise.resolve({ data: {} })),
//       interceptors: {
//         request: { use: jest.fn() },
//         response: { use: jest.fn() },
//       },
//     }),
//   };
// });

// Now we can get the mocked version of get:
// const axiosInstance = axios.create();
// const mockAxiosGet = axiosInstance.get;

describe('검색 페이지', () => {
  let store: EnhancedStore;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        user: userReducer,
      },
    });
    jest.clearAllMocks();
  });

  test('검색 페이지가 정상적으로 렌더링 되었는지 확인', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Search />
        </QueryClientProvider>
      </Provider>
    );

    expect(
      getByPlaceholderText('검색 내용을 입력해주세요')
    ).toBeInTheDocument();
  });

  test('검색 입력 테스트', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Search />
        </QueryClientProvider>
      </Provider>
    );

    const searchInput = getByPlaceholderText(
      '검색 내용을 입력해주세요'
    ) as HTMLInputElement;

    fireEvent.change(searchInput, { target: { value: 'test' } });
    expect(searchInput.value).toBe('test');
  });
});
