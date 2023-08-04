import {
  SignUpSection,
  MainHeadText,
  SubHeadText,
  TextParagraphSns,
  SignUpBtn,
} from '@/styles/signUp';

import React, { useState } from 'react';
import WriteInput from './WriteInput';
import CheckBox from './CheckBox';
import SocialLogin from './SocialLogin';

export interface Signup {
  email: string;
  password: string;
  passwordValid: string;
  nickname: string;
}
export interface CheckBoxInterface {
  checkAll: boolean;
  checkTerms: boolean;
  checkPersonalInfo: boolean;
  checkNewsletter: boolean;
}

const SignUpUi = () => {
  const [signUpState, setSignUpState] = useState<Signup>({
    email: '',
    password: '',
    passwordValid: '',
    nickname: '',
  });
  const [checkboxes, setCheckboxes] = useState<CheckBoxInterface>({
    checkAll: false,
    checkTerms: false,
    checkPersonalInfo: false,
    checkNewsletter: false,
  });

  return (
    <SignUpSection>
      <MainHeadText>HAPOOM</MainHeadText>
      <SubHeadText>회원가입</SubHeadText>
      <TextParagraphSns>sns계정으로 간편 로그인/회원가입</TextParagraphSns>

      <SocialLogin />

      <form
        style={{ width: '100%' }}
        name="register"
        onSubmit={(e: any) => e.preventDefault()}
      >
        <WriteInput signUpState={signUpState} setSignUpState={setSignUpState} />

        <CheckBox checkboxes={checkboxes} setCheckboxes={setCheckboxes} />

        <SignUpBtn
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            alert('준비중입니다.');
          }}
        >
          회원가입하기
        </SignUpBtn>
      </form>
    </SignUpSection>
  );
};

export default SignUpUi;
