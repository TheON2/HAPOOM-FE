import {
  MainHeadText,
  SignInContainer,
  SignInSection,
  SignUpBtn,
  StyledInput,
  StyledInputBox,
} from '@/styles/signIn';
import React, { useState } from 'react';
// import SocialLogin from './SocialLogIn';

interface SignIn {
  email: string;
  password: string;
}
const SignInUi = () => {
  const [signInState, setSignInState] = useState<SignIn>({
    email: '',
    password: '',
  });
  const validateEmail = (email: string) => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
  };
  const validatePassword = (password: string) => {
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

  return (
    <SignInSection>
      <SignInContainer>
        <MainHeadText>HAPOOM</MainHeadText>

        <StyledInputBox>
          {/* <TextParagraph>이메일</TextParagraph> */}
          <StyledInput
            type="email"
            name="email"
            placeholder="example@gmail.com"
            onChange={handleInputChange}
          />
        </StyledInputBox>

        <StyledInputBox>
          {/* <TextParagraph>비밀번호</TextParagraph> */}
          <p>영문, 숫자를 포함한 8자이상의 비밀번호를 입력해주세요</p>
          <StyledInput
            type="password"
            name="password"
            placeholder="비밀번호를 입력해 주세요"
            onChange={handleInputChange}
          />
        </StyledInputBox>

        <SignUpBtn
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            alert('준비중입니다.');
          }}
        >
          로그인
        </SignUpBtn>
        {/* <SocialLogin /> */}
      </SignInContainer>
    </SignInSection>
  );
};

export default SignInUi;
