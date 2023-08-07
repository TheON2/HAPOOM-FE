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
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useMutation } from 'react-query';
import { NextRouter } from 'next/router';
import { FormEvent } from 'react';
import { userLoginTest } from '@/api/test/test_user';
import { LOGIN_USER } from '@/redux/reducers/userSlice';
import { userLogin } from '@/api/user';

interface SignIn {
  email: string;
  password: string;
}

const SignInUi = () => {
  const dispatch: any = useDispatch();
  const router: NextRouter = useRouter();
  const [signInState, setSignInState] = useState<SignIn>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<SignIn>({
    email: '',
    password: '',
  });

  const signInMutation = useMutation(userLogin, {
    onSuccess: (data) => {
      dispatch(LOGIN_USER(data));
      console.log('로그인 성공');
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

    if (!signInState.email) {
      errors.email = '이메일 주소를 입력해주세요.';
    } else if (!validateEmail(signInState.email)) {
      errors.email = '이메일 형식이 아닙니다';
    }

    if (!signInState.password) {
      errors.password = '비밀번호를 입력해주세요.';
    } else if (!validatePassword(signInState.password)) {
      errors.password = '비밀번호를 확인해주세요';
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    } else {
      setError({ email: '', password: '' });
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
          <TextParagraph>이메일</TextParagraph>
          <StyledInput
            type="email"
            name="email"
            placeholder="이메일을 입력해 주세요"
            onChange={handleInputChange}
          />
          {error.email && <p style={{ color: 'red' }}>{error.email}</p>}
        </StyledInputBox>

        <StyledInputBox>
          <TextParagraph>비밀번호</TextParagraph>
          <StyledInput
            type="password"
            name="password"
            placeholder="비밀번호를 입력해 주세요"
            onChange={handleInputChange}
          />
          {error.password && <p style={{ color: 'red' }}>{error.password}</p>}
        </StyledInputBox>

        <SignInBtn onClick={handleLogin}>로그인</SignInBtn>
        <PwdSignUpSettinPageLink>
          <p onClick={() => alert('준비중입니다.')}>비밀번호 재설정</p>
          <p onClick={moveSignUpBtn}>회원가입</p>
        </PwdSignUpSettinPageLink>
        <TextParagraphSns>sns계정으로 간편로그인/회원가입</TextParagraphSns>

        <SocialLogin />
      </SignInContainer>
    </SignInSection>
  );
};

export default SignInUi;
