//SignInInput.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignInInput from '@/components/SignIn/SignInInput';

describe('SignInInput', () => {
  it('renders email and password inputs', () => {
    const mockHandleInputChange = jest.fn();

    const { getByPlaceholderText } = render(
      <SignInInput
        signInState={{ email: '', password: '' }}
        handleInputChange={mockHandleInputChange}
      />
    );

    // placeholder 값을 사용하여 각 input 요소가 있는지 확인
    expect(getByPlaceholderText('이메일을 입력해 주세요')).toBeInTheDocument();
    expect(
      getByPlaceholderText('비밀번호를 입력해 주세요')
    ).toBeInTheDocument();
  });

  it('calls handleInputChange prop when input value changes', () => {
    const mockHandleInputChange = jest.fn();

    const { getByPlaceholderText } = render(
      <SignInInput
        signInState={{ email: '', password: '' }}
        handleInputChange={mockHandleInputChange}
      />
    );

    // 이메일 input의 값을 변경하고 확인
    fireEvent.change(getByPlaceholderText('이메일을 입력해 주세요'), {
      target: { value: 'test@example.com' },
    });

    // 비밀번호 input의 값을 변경하고 확인
    fireEvent.change(getByPlaceholderText('비밀번호를 입력해 주세요'), {
      target: { value: 'password' },
    });

    // 각각의 값 변경 이벤트에 대하여 handleInputChange 함수가 호출되었는지 확인
    expect(mockHandleInputChange).toHaveBeenCalledTimes(2);
  });
});
