import {
  MainHeadText,
  PwdSignUpSettinPageLink,
  SignInBtn,
  SignInContainer,
  SignInSection,
  StyledInput,
  StyledInputBox,
  TextParagraph,
  TextParagraphSns,
} from '@/styles/signIn';
import React, { useState } from 'react';
import SocialLogin from './SocialLogIn';
// import Link from 'next/link';

interface SignIn {
  email: string;
  password: string;
}

const SignInUi = () => {
  const [signInState, setSignInState] = useState<SignIn>({
    email: '',
    password: '',
  });
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
  };
  const validatePassword = (password: string): boolean => {
    const passwordPattern = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;
    return passwordPattern.test(password);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignInState((prevSignInState) => ({
      ...prevSignInState,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    console.log('로그인 처리 로직 작성');
  };
  return (
    <SignInSection>
      <SignInContainer>
        <MainHeadText>HAPOOM</MainHeadText>

        <StyledInputBox>
          <TextParagraph>이메일</TextParagraph>
          <StyledInput
            type="email"
            name="email"
            placeholder="example@gmail.com"
            onChange={handleInputChange}
          />
        </StyledInputBox>

        <StyledInputBox>
          <TextParagraph>비밀번호</TextParagraph>
          <StyledInput
            type="password"
            name="password"
            placeholder="비밀번호를 입력해 주세요"
            onChange={handleInputChange}
          />
        </StyledInputBox>

        <SignInBtn
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            handleLogin();
            alert('준비 중');
          }}
        >
          로그인
        </SignInBtn>
        <PwdSignUpSettinPageLink>
          <p>비밀번호 재설정</p>
          <p>회원가입</p>
        </PwdSignUpSettinPageLink>
        <TextParagraphSns>sns계정으로 간편로그인/회원가입</TextParagraphSns>

        <SocialLogin />
      </SignInContainer>
    </SignInSection>
  );
};

export default SignInUi;
