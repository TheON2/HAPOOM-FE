import React from 'react';
import { SignUpBtn } from '@/styles/signUp';

interface Props {
  signUpState: {
    email: string;
    password: string;
    passwordConfirm: string;
    nickname: string;
  };
}

const SignUpcontrol: React.FC<Props> = ({ signUpState }) => {
  return (
    <SignUpBtn
      style={{
        margin: '8px 0 20px 0',
        backgroundColor:
          signUpState.email &&
          signUpState.password &&
          signUpState.passwordConfirm &&
          signUpState.nickname
            ? '#0078FF'
            : '#B3B3B3',
        borderColor:
          signUpState.email &&
          signUpState.password &&
          signUpState.passwordConfirm &&
          signUpState.nickname
            ? '#0078FF'
            : '#B3B3B3',
      }}
      disabled={
        !signUpState.email &&
        !signUpState.password &&
        !signUpState.passwordConfirm &&
        !signUpState.nickname
      }
      type="submit"
    >
      회원가입하기
    </SignUpBtn>
  );
};

export default React.memo(SignUpcontrol);
