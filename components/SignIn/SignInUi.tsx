import {
  MainHeadText,
  SignInContainer,
  SignInSection,
  TextErrorParagraph,
} from '@/styles/signIn';
import React, { FormEvent, useState } from 'react';
import SocialLogin from './SocialLogIn';
import SignInInput from './SignInInput';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useMutation } from 'react-query';
import { NextRouter } from 'next/router';
import { LOGIN_USER } from '@/redux/reducers/userSlice';
import { userLogin } from '@/api/user';
import { AxiosError } from 'axios';
import SignInControls from './SignInControls';

export interface SignIn {
  email: string;
  password: string;
}
interface ErrorMessage {
  message?: string;
}
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return emailRegex.test(email);
};
const validatePassword = (password: string): boolean => {
  const passwordPattern = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;
  return passwordPattern.test(password);
};

const SignInUi = () => {
  const dispatch = useDispatch();
  const router: NextRouter = useRouter();
  const [signInState, setSignInState] = useState<SignIn>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<ErrorMessage>({
    message: '',
  });
  const [serverError, setServerError] = useState<string>('');
  const signInMutation = useMutation(userLogin, {
    onSuccess: (data) => {
      dispatch(LOGIN_USER(data));
      router.push('/');
    },
    onError: (error: AxiosError) => {
      const message = error?.response?.data as string;
      if (message) {
        setServerError(message);
      } else {
        alert(
          '로그인에 실패하였습니다. 아이디 혹은 비밀번호를 다시 한번 확인해주세요'
        );
        // console.error('로그인 실패:', error);
      }
    },
  });

  const moveHomeBtn = React.useCallback(() => {
    router.push('/');
  }, [router]);

  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setSignInState((prevSignInState) => ({
        ...prevSignInState,
        [name]: value,
      }));
    },
    []
  );

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    let errors: ErrorMessage = {};

    if (!validateEmail(signInState.email)) {
      if (!validatePassword(signInState.password)) {
        errors.message = '아이디와 비밀번호를 다시 확인해주세요';
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
      <SignInContainer onSubmit={handleLogin}>
        <MainHeadText onClick={moveHomeBtn}>HAPOOM</MainHeadText>

        <SignInInput
          signInState={signInState}
          handleInputChange={handleInputChange}
        />
        {error.message && (
          <TextErrorParagraph>{error.message}</TextErrorParagraph>
        )}
        {serverError && <TextErrorParagraph>{serverError}</TextErrorParagraph>}

        <SignInControls signInState={signInState} />

        {/* <SocialLogin /> */}
      </SignInContainer>
    </SignInSection>
  );
};

export default React.memo(SignInUi);
