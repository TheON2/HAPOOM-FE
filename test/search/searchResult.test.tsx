// SearchResult.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchResult from '@/components/Search/SearchResult';

describe('검색 결과 컴포넌트', () => {
  test('400 에러 반환 받았을 때, 검색 결과 없습니다 렌더링 확인', () => {
    render(
      <SearchResult option="users" data={{ response: { status: 400 } }} />
    );
    expect(screen.getByText('검색 결과가 없습니다')).toBeInTheDocument();
  });

  test('서버로 부터 400 이외 에러 반환 받았을 때, 예상치 못한 오류 발생 안내 확인', () => {
    render(<SearchResult option="users" data="otherError" />);
    expect(
      screen.getByText(
        /예상치 못한 오류가 발생하였습니다\. 다시 검색을 시도해주세요/i
      )
    ).toBeInTheDocument();
  });

  test('검색 카테고리 닉네임 검색시 유저 정보가 나오는지 확인', () => {
    const mockData = [
      {
        userImage: 'testImage.jpg',
        nickname: 'Test User',
        email: 'test@example.com',
        preset: [],
        userId: '1',
      },
    ];

    render(<SearchResult option="users" data={mockData} />);

    mockData.forEach((user) => {
      expect(screen.getByText(user.nickname)).toBeInTheDocument();
    });
  });
});
