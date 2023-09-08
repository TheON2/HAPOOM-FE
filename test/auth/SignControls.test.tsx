//SignInControls.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignInControls from '@/components/SignIn/SignInControls';

// Next.js의 useRouter 훅을 모킹합니다.
const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: mockPush,
    };
  },
}));

describe('SignInControls', () => {
  it('renders login button and sign up link', () => {
    const { getByText } = render(
      <SignInControls signInState={{ email: '', password: '' }} />
    );

    // 로그인 버튼과 회원가입 링크가 있는지 확인
    expect(getByText('로그인')).toBeInTheDocument();
    expect(getByText('회원가입')).toBeInTheDocument();
  });

  it('calls router.push when sign up link is clicked', () => {
    const { getByText } = render(
      <SignInControls signInState={{ email: '', password: '' }} />
    );

    // 클릭 이벤트 발생
    fireEvent.click(getByText('회원가입'));

    // 라우터의 push 함수가 호출되었는지 확인
    expect(mockPush).toHaveBeenCalledWith('/auth/SignUp');
  });
});
