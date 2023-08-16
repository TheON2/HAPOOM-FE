import React, { useEffect, useState } from 'react';
import {
  MainHeadText,
  SubHeadText,
  StyledInputBox,
  StyledInput,
  TextErrorParagraph,
  TextParagraphSns,
  SnsLine,
  TextParagraphInfo,
  TextParagrapValidate,
  FindPwdSection,
  FindPwdBtn,
} from '@/styles/findpassword';
import { useMutation } from 'react-query';
import { addUser } from '@/api/user';
import { useRouter } from 'next/router';
import SocialLogin from '../SignIn/SocialLogIn';

export interface Signup {
  email: string;
  password: string;
  passwordConfirm: string;
}
export interface SendData {
  email: string;
  password: string;
}
export interface Error {
  email: string;
  password: string;
  passwordConfirm: string;
}

type TextInputType = 'email' | 'password' | 'passwordConfirm' | 'nickname';

const FindPassword = () => {
  const router = useRouter();
  const [signUpState, setSignUpState] = useState<Signup>({
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [error, setError] = useState<Error>({
    email: '',
    password: '',
    passwordConfirm: '',
  });

  // const addUserMutation = useMutation(addUser, {
  //     onSuccess: () => {
  //       router.push('/signUpComplete/SignUpComplete');
  //     },
  //     onError: (error) => {
  //       console.error('비밀번호 찾기 실패:', error);
  //     },
  //   });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement & { name: TextInputType }>
  ) => {
    const { name, value } = e.target;

    setSignUpState((prevSignUpState) => ({
      ...prevSignUpState,
      [name]: value,
    }));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordPattern = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;
    return passwordPattern.test(password);
  };

  const submitUser = (event: any) => {
    event.preventDefault();

    let errors: any = {};

    if (!signUpState.email) {
      errors.email = '이메일 형식이 올바르지 않습니다.';
    } else if (!validateEmail(signUpState.email)) {
      errors.email = '이메일을 확인해주세요.';
    }

    if (!signUpState.password) {
      errors.password = '비밀번호를 입력해주세요.';
    } else if (!validatePassword(signUpState.password)) {
      errors.password =
        '비밀번호는 영문, 숫자를 포함하여 8자 이상이어야합니다.';
    }

    if (signUpState.password !== signUpState.passwordConfirm) {
      errors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    } else {
      setError({
        email: '',
        password: '',
        passwordConfirm: '',
      });
    }
    if (Object.keys(errors).length === 0) {
      const sendData: SendData = {
        email: signUpState.email,
        password: signUpState.password,
      };
      // addUserMutation.mutate(sendData);
    }
  };

  return (
    <FindPwdSection>
      <MainHeadText>HAPOOM</MainHeadText>
      <SubHeadText color="#000" marginBottom="12px">
        비밀번호 찾기
      </SubHeadText>
      <SocialLogin />
      <TextParagraphSns>SNS계정으로 간편 로그인/회원가입</TextParagraphSns>
      <SnsLine></SnsLine>

      <form name="register" onSubmit={submitUser}>
        <StyledInputBox>
          <TextParagraphInfo marginBottom="12px">이메일</TextParagraphInfo>
          <StyledInput
            type="email"
            name="email"
            value={signUpState.email}
            placeholder="example@gmail.com"
            onChange={handleInputChange}
          />
          {error.email && (
            <TextErrorParagraph style={{ marginBottom: '-12px' }}>
              {error.email}
            </TextErrorParagraph>
          )}
          <FindPwdBtn
            style={{
              margin: '12px 0 20px 0',
              backgroundColor: signUpState.email ? '#0078FF' : '#B3B3B3',
              borderColor: signUpState.email ? '#0078FF' : '#B3B3B3',
            }}
            onClick={() => alert('준비 중 입니다.')}
            disabled={!signUpState.email}
          >
            이메일 인증하기
          </FindPwdBtn>
        </StyledInputBox>

        <StyledInputBox>
          <TextParagraphInfo marginBottom="7px">비밀번호</TextParagraphInfo>
          <TextParagrapValidate>
            영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.
          </TextParagrapValidate>
          <StyledInput
            type="password"
            name="password"
            value={signUpState.password}
            placeholder="비밀번호"
            onChange={handleInputChange}
          />
          {error.password && (
            <TextErrorParagraph>{error.password}</TextErrorParagraph>
          )}
          <TextParagraphInfo>비밀번호 확인</TextParagraphInfo>
          <StyledInput
            type="password"
            name="passwordConfirm"
            value={signUpState.passwordConfirm}
            placeholder="비밀번호 확인"
            onChange={handleInputChange}
          />
          {error.passwordConfirm && (
            <TextErrorParagraph>{error.passwordConfirm}</TextErrorParagraph>
          )}
        </StyledInputBox>

        <FindPwdBtn
          style={{
            margin: '12px 0 20px 0',
            backgroundColor:
              signUpState.email &&
              signUpState.password &&
              signUpState.passwordConfirm
                ? '#0078FF'
                : '#B3B3B3',
            borderColor:
              signUpState.email &&
              signUpState.password &&
              signUpState.passwordConfirm
                ? '#0078FF'
                : '#B3B3B3',
          }}
          disabled={
            !signUpState.email &&
            !signUpState.password &&
            !signUpState.passwordConfirm
          }
          type="submit"
        >
          로그인 하러가기
        </FindPwdBtn>
      </form>
    </FindPwdSection>
  );
};

export default FindPassword;
