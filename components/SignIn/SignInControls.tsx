import {
  PwdSignUpSettingPageLink,
  Separator,
  SignInBtn,
  TextSnsParagraph,
  TextPwSetParagraph,
  TextSignUpLinkParagraph,
} from '@/styles/signIn';
import React from 'react';
import { useRouter } from 'next/router';
import { NextRouter } from 'next/router';
import { SignIn } from './SignInUi';

interface SignInControlsProps {
  signInState: SignIn;
}

const SignInControls: React.FC<SignInControlsProps> = ({ signInState }) => {
  const router: NextRouter = useRouter();

  const moveSignUpBtn = React.useCallback(() => {
    router.push('/auth/SignUp');
  }, [router]);
  const moveFindPwdBtn = React.useCallback(() => {
    router.push('/findPassword/FindPwd');
  }, [router]);

  return (
    <>
      <SignInBtn
        style={{
          margin: '12px 0 20px 0',
          backgroundColor:
            signInState.email && signInState.password ? '#0078FF' : '#B3B3B3',
          borderColor:
            signInState.email && signInState.password ? '#0078FF' : '#B3B3B3',
        }}
        disabled={!signInState.email && !signInState.password}
      >
        로그인
      </SignInBtn>
      <PwdSignUpSettingPageLink>
        <TextPwSetParagraph onClick={moveFindPwdBtn}>
          비밀번호 찾기
        </TextPwSetParagraph>
        <Separator />
        <TextSignUpLinkParagraph onClick={moveSignUpBtn}>
          회원가입
        </TextSignUpLinkParagraph>
      </PwdSignUpSettingPageLink>
      <TextSnsParagraph>SNS계정으로 간편 로그인/회원가입</TextSnsParagraph>
    </>
  );
};

export default React.memo(SignInControls);
