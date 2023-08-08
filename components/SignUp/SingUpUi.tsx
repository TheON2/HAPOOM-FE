import React, { useState } from 'react';
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
} from '@/styles/signUp';
import { useMutation } from 'react-query';
import { addUser } from '@/api/user';
import { useRouter } from 'next/router';
import { StyledEmailInput, StyledPasswordInput } from '@/styles/signIn';

export interface Signup {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
}
export interface CheckBoxInterface {
  checkAll: boolean;
  checkTerms: boolean;
  checkPersonalInfo: boolean;
  checkNewsletter: boolean;
}
type TextInputType = 'email' | 'password' | 'passwordConfirm' | 'nickname';

const SignUpUi = () => {
  const router = useRouter();
  const [signUpState, setSignUpState] = useState<Signup>({
    email: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
  });
  const [error, setError] = useState<Signup>({
    email: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
  });
  const [checkboxes, setCheckboxes] = useState<CheckBoxInterface>({
    checkAll: false,
    checkTerms: false,
    checkPersonalInfo: false,
    checkNewsletter: false,
  });

  const addUserMutation = useMutation(addUser, {
    onSuccess: () => {
      router.push('/auth/SignIn');
    },
    onError: (error) => {
      console.error('회원가입 실패:', error);
    },
  });

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

  const validateNickname = (nickname: string) => {
    const nicknamePattern = /^.{2,15}$/;
    return nicknamePattern.test(nickname);
  };
  const validateForm = () => {
    return checkboxes.checkAll;
  };
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    if (name === 'checkAll') {
      setCheckboxes({
        checkAll: checked,
        checkTerms: checked,
        checkPersonalInfo: checked,
        checkNewsletter: checked,
      });
    } else {
      setCheckboxes({
        ...checkboxes,
        [name]: checked,
        checkAll:
          checkboxes.checkTerms && checkboxes.checkPersonalInfo && checked,
      });
    }
  };

  const submitUser = (event: any) => {
    event.preventDefault();

    let errors: any = {};

    if (!signUpState.email) {
      errors.email = '이메일을 입력해주세요.';
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
      errors.password = '비밀번호가 일치하지 않습니다.';
      errors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
    }

    if (!signUpState.nickname) {
      errors.nickname = '닉네임을 입력해주세요.';
    } else if (!validateNickname(signUpState.nickname)) {
      errors.nickname = '2~15자를 입력해주세요.';
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    } else {
      setError({ email: '', password: '', passwordConfirm: '', nickname: '' });
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
      <MainHeadText>HAPOOM</MainHeadText>
      <SubHeadText>회원가입</SubHeadText>

      <form name="register" onSubmit={submitUser}>
        <StyledInputBox>
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
            style={{ margin: '12px 0 20px 0' }}
            onClick={(event: any) => {
              event.preventDefault();
              alert('준비중입니다.');
            }}
          >
            이메일 인증하기
          </SignUpBtn>
        </StyledInputBox>

        <StyledInputBox>
          <StyledEmailInput
            type="password"
            name="password"
            value={signUpState.password}
            placeholder="비밀번호를 입력해 주세요"
            onChange={handleInputChange}
          />
          <StyledPasswordInput
            type="password"
            name="passwordConfirm"
            value={signUpState.passwordConfirm}
            placeholder="비밀번호 확인"
            onChange={handleInputChange}
          />
          {error.password && (
            <TextErrorParagraph>{error.password}</TextErrorParagraph>
          )}
        </StyledInputBox>

        <StyledInputBox>
          <StyledInput
            type="text"
            name="nickname"
            value={signUpState.nickname}
            placeholder="닉네임을 입력해 주세요"
            onChange={handleInputChange}
          />
          {error.nickname && (
            <TextErrorParagraph>{error.nickname}</TextErrorParagraph>
          )}
        </StyledInputBox>

        <SignUpCheckBoxLayout>
          <SignUpCheckBox>
            <Checkbox
              type="checkbox"
              name="checkAll"
              checked={checkboxes.checkAll}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="check-all"></label>
            <StyledLabelAll>전체동의</StyledLabelAll>
            <StyledLabel>선택항목에 대한 동의 포함</StyledLabel>
          </SignUpCheckBox>
          <Line></Line>

          <SignUpCheckBox>
            <Checkbox
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

        <SignUpBtn
          style={{ margin: '8px 0 20px 0' }}
          type="submit"
          disabled={!validateForm()}
        >
          회원가입하기
        </SignUpBtn>
      </form>
    </SignUpSection>
  );
};

export default SignUpUi;
