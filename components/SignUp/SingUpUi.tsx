import {
  Checkbox,
  SignEmailBox,
  SignUpCheckBox,
  SignUpCheckBoxLayout,
  SignUpEmailBtn,
  SignUpEmailInput,
  SignUpNickNameBox,
  SignUpNickNameInput,
  SignUpPasswordBox,
  SignUpSection,
  SignUpSocialSignUpBox,
  SingUpPasswordInput,
  SingUpPasswordValidInput,
  StyledLabel,
  MainHeadText,
  SubHeadText,
} from '@/styles/signup';
import React, { useState } from 'react';

interface signup {
  email: string;
  password: string;
  passwordValid: string;
  nickname: string;
}
const SignUpUi = () => {
  const [signUpState, setSignUpState] = useState<signup>({
    email: '',
    password: '',
    passwordValid: '',
    nickname: '',
  });

  return (
    <SignUpSection>
      <MainHeadText>HAPOOM</MainHeadText>
      <SubHeadText>회원가입</SubHeadText>

      <SignUpSocialSignUpBox>
        <p>sns계정으로 간편 로그인/회원가입</p>
        <div>구글</div>
        <div>카카오</div>
        <div>인스타</div>
      </SignUpSocialSignUpBox>

      <form name="register">
        <SignEmailBox>
          <p>이메일</p>
          <SignUpEmailInput />
          <SignUpEmailBtn>이메일 인증하기</SignUpEmailBtn>
        </SignEmailBox>

        <SignUpPasswordBox>
          <p>비밀번호</p>
          <p>영문, 숫자를 포함한 8자이상의 비밀번호를 입력해주세요</p>
          <SingUpPasswordInput />
          <p>비밀번호 확인</p>
          <SingUpPasswordValidInput />
        </SignUpPasswordBox>

        <SignUpNickNameBox>
          <p>닉네임</p>
          <p>다른 유저와 겹치지 않도록 입력해주세요(2~15자)</p>
          <SignUpNickNameInput />
        </SignUpNickNameBox>

        <SignUpCheckBoxLayout>
          <p>약관동의</p>
          <SignUpCheckBox>
            <Checkbox />
            <label htmlFor="check-all"></label>
            <StyledLabel>전체동의</StyledLabel>

            <Checkbox />
            <label htmlFor="check-terms"></label>
            <StyledLabel>이용약관 (필수)</StyledLabel>

            <Checkbox />
            <label htmlFor="check-personalInfo"></label>
            <StyledLabel>개인정보 수집/이용 동의 (필수)</StyledLabel>

            <Checkbox />
            <label htmlFor="check-newsletter"></label>
            <StyledLabel>개인정보 마케팅 활용 동의 (선택)</StyledLabel>
          </SignUpCheckBox>
        </SignUpCheckBoxLayout>
      </form>
    </SignUpSection>
  );
};

export default SignUpUi;
