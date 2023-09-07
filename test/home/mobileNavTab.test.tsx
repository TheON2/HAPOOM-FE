import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MobileBottomNav from '@/components/common/layout/MobileBottomNav';
import { useRouter } from 'next/router';

// useSelector 함수를 목업(Mock)하여 테스트에 필요한 상태를 제공합니다.
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    pathname: '/feed',
    push: jest.fn(),
  }),
}));

describe('MobileBottomNav 컴포넌트', () => {
  const mockUser = {
    email: 'test@example.com',
    preset: 5,
    userImage: 'image.jpg',
  };
  const useSelectorMock = jest.spyOn(require('react-redux'), 'useSelector');
  useSelectorMock.mockReturnValue({ user: mockUser });

  test('feed 네비게이션 tab 클릭시 route 호출 확인', () => {
    const { getByText } = render(<MobileBottomNav />);
    fireEvent.click(getByText('feed'));
    setTimeout(() => {
      expect(window.location.pathname).toEqual('/feed');
    }, 0);
  });

  test('정적 라우팅:window location pathname이 /feed일 때, active 클래스 유무 확인', () => {
    history.pushState({}, 'feed page', '/feed');
    const { getByTestId } = render(<MobileBottomNav />);
    expect(getByTestId('nav-feed')).toHaveClass('active');
    expect(getByTestId('nav-home')).not.toHaveClass('active');
    expect(getByTestId('nav-search')).not.toHaveClass('active');
    expect(getByTestId('nav-upload')).not.toHaveClass('active');
    expect(getByTestId('nav-user')).not.toHaveClass('active');
  });

  test('동적 라우팅:window location pathname이 /User/test@example.com일 때, active 클래스 유무 확인', () => {
    history.pushState({}, 'user page', `/User/test@example.com`);
    const { getByTestId } = render(<MobileBottomNav />);
    expect(getByTestId('nav-feed')).not.toHaveClass('active');
    expect(getByTestId('nav-home')).not.toHaveClass('active');
    expect(getByTestId('nav-search')).not.toHaveClass('active');
    expect(getByTestId('nav-upload')).not.toHaveClass('active');
    expect(getByTestId('nav-user')).toHaveClass('active');
  });
  // 필요에 따라 더 많은 테스트 케이스를 추가할 수 있습니다.
});
