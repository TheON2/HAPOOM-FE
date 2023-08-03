import {
  SignUpSection,
  SignUpSocialSignUpBox,
  MainHeadText,
  SubHeadText,
  SocialBoxImg,
  TextParagraphSns,
} from '@/styles/signUp';
import googleLogo from '../../public/googleLogo.png';
import kakaoLogo from '../../public/kakaoLogo.png';
import instaLogo from '../../public/pngegg.png';
import React from 'react';
import WriteInput from './WriteInput';
import CheckBox from './CheckBox';

const SignUpUi = () => {
  return (
    <SignUpSection>
      <MainHeadText>HAPOOM</MainHeadText>
      <SubHeadText>회원가입</SubHeadText>
      <TextParagraphSns>sns계정으로 간편 로그인/회원가입</TextParagraphSns>

      <SignUpSocialSignUpBox>
        <SocialBoxImg src={googleLogo} alt="구글로고" />
        <SocialBoxImg src={kakaoLogo} alt="카카오로고" />
        <SocialBoxImg src={instaLogo} alt="인스타로고" />
      </SignUpSocialSignUpBox>

      <form name="register">
        <WriteInput />
        <CheckBox />
      </form>
    </SignUpSection>
  );
};

export default SignUpUi;
