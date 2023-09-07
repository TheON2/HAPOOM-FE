import React, { useCallback, useState } from 'react';
import {
  SignUpSection,
  MainHeadText,
  SubHeadText,
  SignUpBtn,
  StyledInputBox,
  StyledInput,
  TextErrorParagraph,
  TextParagraphSns,
  SnsLine,
  TextParagraphInfo,
} from '@/styles/signUp';
import { useMutation } from 'react-query';
import { addUser } from '@/api/user';
import { NextRouter, useRouter } from 'next/router';
import MobileBottomNav from '../common/layout/MobileBottomNav';
import SocialLogin from '../SignIn/SocialLogIn';
import SignUpPwd from './SignUpPwd';
import SignUpNickname from './SignUpNickname';
import SignUpCheck from './SignUpCheck';
import SignUpcontrol from './SignUpControl';
import axios from 'axios';

const validateEmail = (email: string) => {
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return emailRegex.test(email);
};

const validatePassword = (password: string) => {
  const passwordPattern = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;
  return passwordPattern.test(password);
};

const validateNickname = (nickname: string) => {
  const nicknamePattern = /^.{2,8}$/;
  return nicknamePattern.test(nickname);
};

export interface Signup {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
}
export interface Error {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  checkbox: string;
}
export interface CheckBoxInterface {
  checkAll: boolean;
  checkTerms: boolean;
  checkPersonalInfo: boolean;
  checkNewsletter: boolean;
}

const SignUpUi = () => {
  const router: NextRouter = useRouter();
  const [signUpState, setSignUpState] = useState<Signup>({
    email: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
  });
  const [error, setError] = useState<Error>({
    email: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
    checkbox: '',
  });
  const [checkboxes, setCheckboxes] = useState<CheckBoxInterface>({
    checkAll: false,
    checkTerms: false,
    checkPersonalInfo: false,
    checkNewsletter: false,
  });
  const [checkboxErrorMessage, setCheckboxErrorMessage] = useState('');
  const [serverError, setServerError] = useState<string>('');
  const [serverNicknameError, setServerNicknameError] = useState<string>('');
  const getForgotPwd = async (email: string) => {
    const response = await axios.get(`http://localhost:3001/api/auth/${email}`);
    return response.data;
  };
  // const forgotPwdMutaion = useMutation(getForgotPwd, {
  //   onSuccess: () => {
  //     // console.log('성공');
  //   },
  //   onError: (error) => {
  //     // console.log('실패', error);
  //   },
  // });
  const addUserMutation = useMutation(addUser, {
    onSuccess: () => {
      router.push('/signUpComplete/SignUpComplete');
    },
    onError: (error: any) => {
      const message = error?.response?.data.errorMessage;
      if (message) {
        setServerError(message);
      } else {
        alert(
          '회원가입에 실패하였습니다. 아이디 혹은 비밀번호를 다시 한번 확인해주세요'
        );
      }
      if (
        error?.response?.data.errorMessage === '이미 존재하는 닉네임입니다.'
      ) {
        setServerNicknameError(error?.response?.data.errorMessage);
      }
    },
  });

  const moveSignInPageHandeler = useCallback(() => {
    router.push('/auth/SignIn');
  }, [router]);

  const moveHomePageHandeler = useCallback(() => {
    router.push('/');
  }, [router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement & { name: string }>
  ) => {
    setSignUpState({
      ...signUpState,
      [e.target.name]: e.target.value,
    });
    setError({ ...error, [e.target.name]: '' });
  };

  const handleCheckboxChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement & { name: keyof CheckBoxInterface }>
    ) => {
      const { name, checked } = e.target;

      setCheckboxes((prevState) => {
        const newState = {
          ...prevState,
          [name]: checked,
        };

        if (name === 'checkAll') {
          newState.checkTerms = checked;
          newState.checkPersonalInfo = checked;
          newState.checkNewsletter = false;
        } else {
          newState.checkAll =
            newState.checkTerms &&
            newState.checkPersonalInfo &&
            newState.checkNewsletter;
        }

        if (
          newState.checkTerms ||
          newState.checkPersonalInfo ||
          newState.checkNewsletter
        ) {
          setCheckboxErrorMessage('');
        } else {
          setCheckboxErrorMessage('필수 동의사항에 체크해주세요.');
        }

        return newState;
      });
    },
    []
  );

  const submitUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let errors: any = {};

    if (!signUpState.email) {
      errors.email = '이메일 형식이 올바르지 않습니다.';
    } else if (!validateEmail(signUpState.email)) {
      errors.email = '이메일을 확인해주세요.';
    }

    if (
      !signUpState.password &&
      signUpState.password !== signUpState.passwordConfirm
    ) {
      errors.password = '비밀번호를 확인해주세요';
    } else if (!validatePassword(signUpState.password)) {
      errors.password = '비밀번호를 확인해주세요';
    }

    if (!signUpState.nickname) {
      errors.nickname = '닉네임을 입력해주세요.';
    } else if (!validateNickname(signUpState.nickname)) {
      errors.nickname = '2~8자를 입력해주세요.';
    }
    if (!checkboxes.checkTerms || !checkboxes.checkPersonalInfo) {
      setCheckboxErrorMessage('필수 동의사항에 체크해주세요.');
      return;
    }
    setCheckboxErrorMessage('');

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    } else {
      setError({
        email: '',
        password: '',
        passwordConfirm: '',
        nickname: '',
        checkbox: '',
      });
    }
    if (Object.keys(errors).length === 0) {
      const sendData = {
        email: signUpState.email,
        password: signUpState.password,
        nickname: signUpState.nickname,
      };
      addUserMutation.mutate(sendData);
    }
  };

  // const handleEmailValidateSubmit = (
  //   event: React.MouseEvent<HTMLButtonElement>
  // ) => {
  //   event.preventDefault();
  //   forgotPwdMutaion.mutate(signUpState.email);
  // };

  return (
    <SignUpSection>
      <MainHeadText onClick={moveHomePageHandeler}>HAPOOM</MainHeadText>
      <SubHeadText color="#000" $marginBottom="12px">
        회원가입
      </SubHeadText>
      {/* <SocialLogin /> */}
      {/* <TextParagraphSns>SNS계정으로 간편 로그인/회원가입</TextParagraphSns> */}
      <SnsLine></SnsLine>

      <form name="register" onSubmit={submitUser}>
        <StyledInputBox>
          <TextParagraphInfo $marginBottom="12px">이메일</TextParagraphInfo>
          <StyledInput
            type="email"
            name="email"
            value={signUpState.email}
            placeholder="example@gmail.com"
            onChange={handleInputChange}
          />
          {error.email && (
            <TextErrorParagraph>{error.email}</TextErrorParagraph>
          )}
          {serverError && (
            <TextErrorParagraph>{serverError}</TextErrorParagraph>
          )}
          {/* <SignUpBtn
            style={{
              margin: '8px 0 20px 0',
              backgroundColor: signUpState.email ? '#0078FF' : '#B3B3B3',
              borderColor: signUpState.email ? '#0078FF' : '#B3B3B3',
            }}
            onClick={handleEmailValidateSubmit}
            disabled={!signUpState.email}
          >
            이메일 인증하기
          </SignUpBtn> */}
        </StyledInputBox>

        <SignUpPwd
          signUpState={signUpState}
          handleInputChange={handleInputChange}
          error={{
            password: error.password,
            passwordConfirm: error.passwordConfirm,
          }}
        />
        <SignUpNickname
          signUpState={signUpState}
          handleInputChange={handleInputChange}
          error={{
            nickname: error.nickname,
          }}
        />
        {serverNicknameError && (
          <TextErrorParagraph>{serverNicknameError}</TextErrorParagraph>
        )}
        <SignUpCheck
          checkboxErrorMessage={checkboxErrorMessage}
          checkboxes={checkboxes}
          handleCheckboxChange={handleCheckboxChange}
        />
        <SignUpcontrol signUpState={signUpState} />
      </form>

      <SubHeadText
        color="#0084FF"
        style={{ cursor: 'pointer' }}
        onClick={moveSignInPageHandeler}
      >
        이미 아이디가 있으신가요? 로그인
      </SubHeadText>
      <MobileBottomNav />
    </SignUpSection>
  );
};

export default React.memo(SignUpUi);
