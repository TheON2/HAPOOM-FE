import React, { ChangeEvent, useCallback, useState } from 'react';
import {
  SignUpSection,
  MainHeadText,
  SubHeadText,
  SignUpBtn,
  StyledInputBox,
  StyledInput,
  Checkbox,
  SignUpCheckBox,
  SignUpCheckBoxLayout,
  StyledLabel,
  StyledLabelAll,
  Line,
  TextErrorParagraph,
  StyledLabelEssential,
  TextParagraphSns,
  SnsLine,
  TextParagraphInfo,
  TextParagrapValidate,
} from '@/styles/signUp';
import { useMutation } from 'react-query';
import { addUser } from '@/api/user';
import { NextRouter, useRouter } from 'next/router';
import MobileBottomNav from '../common/MobileBottomNav';
import SocialLogin from '../SignIn/SocialLogIn';
import { SecretEye } from '../common/SVG';

const validateEmail = (email: string) => {
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return emailRegex.test(email);
};

const validatePassword = (password: string) => {
  const passwordPattern = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;
  return passwordPattern.test(password);
};

const validateNickname = (nickname: string) => {
  const nicknamePattern = /^.{2,15}$/;
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
type TextInputType = 'email' | 'password' | 'passwordConfirm' | 'nickname';

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
  const [passwordInputType, setPasswordInputType] = useState<
    'password' | 'text'
  >('password');
  const [passwordConfirmInputType, setPasswordConfirmInputType] = useState<
    'password' | 'text'
  >('password');

  const addUserMutation = useMutation(addUser, {
    onSuccess: () => {
      router.push('/signUpComplete/SignUpComplete');
    },
    onError: (error) => {
      console.error('회원가입 실패:', error);
    },
  });

  const togglePasswordVisibility = useCallback(() => {
    setPasswordInputType(
      passwordInputType === 'password' ? 'text' : 'password'
    );
  }, [passwordInputType]);

  const togglePasswordConfirmVisibility = useCallback(() => {
    setPasswordConfirmInputType(
      passwordConfirmInputType === 'password' ? 'text' : 'password'
    );
  }, [passwordConfirmInputType]);

  const moveSignInPageHandeler = useCallback(() => {
    router.push('/auth/SignIn');
  }, [router]);
  const moveHomePageHandeler = useCallback(() => {
    router.push('/');
  }, [router]);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement & { name: TextInputType }>) => {
      const { name, value } = e.target;
      setSignUpState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    []
  );

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
          newState.checkNewsletter = checked;
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

    if (!signUpState.password) {
      errors.password = '비밀번호를 입력해주세요.';
    } else if (!validatePassword(signUpState.password)) {
      errors.password =
        '비밀번호는 영문, 숫자를 포함하여 8자 이상이어야합니다.';
    }

    if (signUpState.password !== signUpState.passwordConfirm) {
      errors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
    }

    if (!signUpState.nickname) {
      errors.nickname = '닉네임을 입력해주세요.';
    } else if (!validateNickname(signUpState.nickname)) {
      errors.nickname = '2~15자를 입력해주세요.';
    }
    if (
      !checkboxes.checkTerms ||
      !checkboxes.checkPersonalInfo ||
      !checkboxes.checkNewsletter
    ) {
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

  return (
    <SignUpSection>
      <MainHeadText onClick={moveHomePageHandeler}>HAPOOM</MainHeadText>
      <SubHeadText color="#000" $marginBottom="12px">
        회원가입
      </SubHeadText>
      <SocialLogin />
      <TextParagraphSns>SNS계정으로 간편 로그인/회원가입</TextParagraphSns>
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
            <TextErrorParagraph style={{ marginBottom: '-12px' }}>
              {error.email}
            </TextErrorParagraph>
          )}
          <SignUpBtn
            style={{
              margin: '12px 0 20px 0',
              backgroundColor: signUpState.email ? '#0078FF' : '#B3B3B3',
              borderColor: signUpState.email ? '#0078FF' : '#B3B3B3',
            }}
            onClick={() => alert('준비 중 입니다.')}
            disabled={!signUpState.email}
          >
            이메일 인증하기
          </SignUpBtn>
        </StyledInputBox>

        <StyledInputBox>
          <TextParagraphInfo $marginBottom="7px">비밀번호</TextParagraphInfo>
          <TextParagrapValidate>
            영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.
          </TextParagrapValidate>
          <StyledInput
            type={passwordInputType}
            name="password"
            value={signUpState.password}
            placeholder="비밀번호"
            onChange={handleInputChange}
          />
          <SecretEye
            onClick={togglePasswordVisibility}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
            }}
          />
          {error.password && (
            <TextErrorParagraph>{error.password}</TextErrorParagraph>
          )}
          <TextParagraphInfo>비밀번호 확인</TextParagraphInfo>
          <StyledInput
            type={passwordConfirmInputType}
            name="passwordConfirm"
            value={signUpState.passwordConfirm}
            placeholder="비밀번호 확인"
            onChange={handleInputChange}
          />
          <SecretEye
            onClick={togglePasswordConfirmVisibility}
            style={{
              position: 'absolute',
              right: '10px',
              top: '88%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
            }}
          />
          {error.passwordConfirm && (
            <TextErrorParagraph>{error.passwordConfirm}</TextErrorParagraph>
          )}
        </StyledInputBox>

        <StyledInputBox>
          <TextParagraphInfo>닉네임</TextParagraphInfo>
          <TextParagrapValidate>
            다른 유저와 겹치지 않도록 입력해주세요.(2~15자)
          </TextParagrapValidate>
          <StyledInput
            type="text"
            name="nickname"
            value={signUpState.nickname}
            placeholder="닉네임은 2자에서 15자입니다."
            onChange={handleInputChange}
          />
          {error.nickname && (
            <TextErrorParagraph>{error.nickname}</TextErrorParagraph>
          )}
        </StyledInputBox>

        <SignUpCheckBoxLayout>
          <SignUpCheckBox>
            <Checkbox
              id="checkAll"
              type="checkbox"
              name="checkAll"
              checked={checkboxes.checkAll}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="checkAll"></label>
            <StyledLabelAll>전체동의</StyledLabelAll>
            <StyledLabel>선택항목에 대한 동의 포함</StyledLabel>
          </SignUpCheckBox>
          <Line></Line>

          <SignUpCheckBox>
            <Checkbox
              id="check-terms"
              type="checkbox"
              name="checkTerms"
              checked={checkboxes.checkTerms}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="check-terms"></label>
            <StyledLabelEssential>이용약관 (필수)</StyledLabelEssential>
          </SignUpCheckBox>

          <SignUpCheckBox>
            <Checkbox
              id="check-personalInfo"
              type="checkbox"
              name="checkPersonalInfo"
              checked={checkboxes.checkPersonalInfo}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="check-personalInfo"></label>
            <StyledLabelEssential>
              개인정보 수집/이용 동의 (필수)
            </StyledLabelEssential>
          </SignUpCheckBox>

          <SignUpCheckBox>
            <Checkbox
              id="check-newsletter"
              type="checkbox"
              name="checkNewsletter"
              checked={checkboxes.checkNewsletter}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="check-newsletter"></label>
            <StyledLabelEssential>
              개인정보 마케팅 활용 동의 (필수)
            </StyledLabelEssential>
          </SignUpCheckBox>
        </SignUpCheckBoxLayout>
        {checkboxErrorMessage && (
          <TextErrorParagraph style={{ marginTop: '10px' }}>
            {checkboxErrorMessage}
          </TextErrorParagraph>
        )}

        <SignUpBtn
          style={{
            margin: '12px 0 20px 0',
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

export default SignUpUi;
