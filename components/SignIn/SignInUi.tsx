import {
  MainHeadText,
  PwdSignUpSettingPageLink,
  Separator,
  SignInBtn,
  SignInContainer,
  SignInSection,
  StyledEmailInput,
  StyledInputBox,
  StyledPasswordInput,
  TextErrorParagraph,
  TextParagraph,
  TextPwSetParagraph,
  TextSignUpLinkParagraph,
} from '@/styles/signIn';
import React, { FormEvent, useState } from 'react';
import SocialLogin from './SocialLogIn';

import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useMutation } from 'react-query';
import { NextRouter } from 'next/router';
import { LOGIN_USER } from '@/redux/reducers/userSlice';
import { userLogin } from '@/api/user';

interface SignIn {
  email: string;
  password: string;
}
interface ErrorMessage {
  message: string;
}

const SignInUi = () => {
  const dispatch: any = useDispatch();
  const router: NextRouter = useRouter();
  const [signInState, setSignInState] = useState<SignIn>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<ErrorMessage>({
    message: '',
  });

  const signInMutation = useMutation(userLogin, {
    onSuccess: (data) => {
      dispatch(LOGIN_USER(data));
      router.push('/');
    },
    onError: (error: any) => {
      if (error.response && error.response.data) {
        setError((prev) => ({ ...prev, password: error.response.data }));
      }
    },
  });

  const moveSignUpBtn = () => {
    router.push('/auth/SignUp');
  };
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


  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    let errors: any = {};

    if (!validateEmail(signInState.email)) {
      if (!validatePassword(signInState.password)) {
        errors.message = '아이디와 비밀번호를 다시 확인해주세요 ';
      }
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    } else {
      setError({ message: '' });
    }
    const sendData = {
      email: signInState.email,
      password: signInState.password,
    };
    signInMutation.mutate(sendData);

  };

  return (
    <SignInSection>
      <SignInContainer>
        <MainHeadText>HAPOOM</MainHeadText>
        <StyledInputBox>
          <StyledEmailInput
            type="email"
            name="email"
            placeholder="이메일을 입력해 주세요"
            onChange={handleInputChange}
          />
        </StyledInputBox>

        <StyledInputBox>
          <StyledPasswordInput
            type="password"
            name="password"
            placeholder="비밀번호를 입력해 주세요"
            onChange={handleInputChange}
          />
        </StyledInputBox>

        {error.message && (
          <TextErrorParagraph>{error.message}</TextErrorParagraph>
        )}
        <SignInBtn onClick={handleLogin}>로그인</SignInBtn>
        <PwdSignUpSettingPageLink>
          <TextPwSetParagraph onClick={() => alert('준비중입니다.')}>
            비밀번호 재설정
          </TextPwSetParagraph>
          <Separator />
          <TextSignUpLinkParagraph onClick={moveSignUpBtn}>
            회원가입
          </TextSignUpLinkParagraph>
        </PwdSignUpSettingPageLink>

        <SocialLogin />
      </SignInContainer>
    </SignInSection>
  );
};

export default SignInUi;
