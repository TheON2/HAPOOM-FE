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
import React, { FormEvent, useState } from 'react';
import SocialLogin from './SocialLogIn';
import { useMutation } from 'react-query';
import { userLogin } from '@/api/user';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { LOGIN_USER } from '@/redux/reducers/userSlice';
// import Link from 'next/link';

interface SignIn {
  email: string;
  password: string;
}

const SignInUi = () => {
  const dispatch = useDispatch();
  const router = useRouter();
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

  const loginMutation = useMutation(userLogin, {
    onSuccess: (data) => {
      dispatch(LOGIN_USER(data));
      alert('로그인 성공');
      router.push('/');
    },
    onError: (error) => {
      alert(error);
    },
  });

  const handleLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    loginMutation.mutate(signInState);
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

        <SignInBtn onClick={handleLogin}>로그인</SignInBtn>
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
