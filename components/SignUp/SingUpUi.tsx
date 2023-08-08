import React, { useState } from 'react';
// import WriteInput from './WriteInput';
// import CheckBox from './CheckBox';
import SocialLogin from './SocialLogin';
import {
  SignUpSection,
  MainHeadText,
  SubHeadText,
  TextParagraphSns,
  SignUpBtn,
  StyledInputBox,
  StyledInput,
  TextParagraph,
  Checkbox,
  SignUpCheckBox,
  SignUpCheckBoxLayout,
  StyledLabel,
  StyledLabelAll,
  Line,
} from '@/styles/signUp';
import { useMutation } from 'react-query';
import { addUser } from '@/api/user';
import { useRouter } from 'next/router';

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
      console.log('회원가입 성공');
      router.push('/auth/SignIn');
    },
    onError: (error) => {
      console.error('회원가입 실패:', error);
    },
  });

  //인풋창들 함수
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
  // const emailCheckSubmit = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   if (validateEmail(signUpState.email)) {
  //     alert('중복확인 되었습니다.');
  //   } else {
  //     alert('이메일이 유효하지 않습니다. 다시 입력해 주세요.');
  //   }
  // };
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
      errors.email = '이메일 주소를 입력해주세요.';
    } else if (!validateEmail(signUpState.email)) {
      errors.email = '이메일 형식이 올바르지 않습니다.';
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
      <TextParagraphSns>sns계정으로 간편 로그인/회원가입</TextParagraphSns>

      <SocialLogin />

      <form name="register" onSubmit={submitUser}>
        <StyledInputBox>
          <TextParagraph>이메일</TextParagraph>
          <StyledInput
            type="email"
            name="email"
            value={signUpState.email}
            placeholder="example@gmail.com"
            onChange={handleInputChange}
          />
          {error.email && <p style={{ color: 'red' }}>{error.email}</p>}
          <SignUpBtn
            onClick={(event: any) => {
              event.preventDefault();
              alert('준비중입니다.');
            }}
          >
            이메일 인증하기
          </SignUpBtn>
        </StyledInputBox>

        <StyledInputBox>
          <TextParagraph>비밀번호</TextParagraph>
          {error.password ? null : (
            <p>영문, 숫자를 포함한 8자이상의 비밀번호를 입력해주세요</p>
          )}
          <StyledInput
            type="password"
            name="password"
            value={signUpState.password}
            placeholder="비밀번호를 입력해 주세요"
            onChange={handleInputChange}
          />
          {error.password && <p style={{ color: 'red' }}>{error.password}</p>}
          <TextParagraph>비밀번호 확인</TextParagraph>
          <StyledInput
            type="password"
            name="passwordConfirm"
            value={signUpState.passwordConfirm}
            placeholder="비밀번호 확인"
            onChange={handleInputChange}
          />
          {error.passwordConfirm && (
            <p style={{ color: 'red' }}>{error.passwordConfirm}</p>
          )}
        </StyledInputBox>

        <StyledInputBox>
          <TextParagraph>닉네임</TextParagraph>
          {error.nickname ? null : (
            <p>다른 유저와 겹치지 않도록 입력해 주세요(2~15자)</p>
          )}
          <StyledInput
            type="text"
            name="nickname"
            value={signUpState.nickname}
            placeholder="닉네임을 입력해 주세요"
            onChange={handleInputChange}
          />
          {error.nickname && <p style={{ color: 'red' }}>{error.nickname}</p>}
        </StyledInputBox>

        <TextParagraph>약관동의</TextParagraph>
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
            <StyledLabel>이용약관 (필수)</StyledLabel>
          </SignUpCheckBox>

          <SignUpCheckBox>
            <Checkbox
              type="checkbox"
              name="checkPersonalInfo"
              checked={checkboxes.checkPersonalInfo}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="check-personalInfo"></label>
            <StyledLabel>개인정보 수집/이용 동의 (필수)</StyledLabel>
          </SignUpCheckBox>

          <SignUpCheckBox>
            <Checkbox
              type="checkbox"
              name="checkNewsletter"
              checked={checkboxes.checkNewsletter}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="check-newsletter"></label>
            <StyledLabel>개인정보 마케팅 활용 동의 (선택)</StyledLabel>
          </SignUpCheckBox>
        </SignUpCheckBoxLayout>

        <SignUpBtn type="submit" disabled={!validateForm()}>
          회원가입하기
        </SignUpBtn>
      </form>
    </SignUpSection>
  );
};

export default SignUpUi;
