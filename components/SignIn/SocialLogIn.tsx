import React from 'react';
import googleLogo from '../../public/googleLogo.png';
import kakaoLogo from '../../public/kakaoLogo.png';
import instaLogo from '../../public/pngegg.png';
import { SignUpSocialSignUpBox, SocialBoxImg } from '@/styles/signIn';

const SocialLogin = () => {
  const onSocialLogIn = () => {
    alert('준비중입니다.');
  };
  return (
    <SignUpSocialSignUpBox>
      <SocialBoxImg onClick={onSocialLogIn} src={googleLogo} alt="구글로고" />
      <SocialBoxImg onClick={onSocialLogIn} src={kakaoLogo} alt="카카오로고" />
      <SocialBoxImg onClick={onSocialLogIn} src={instaLogo} alt="인스타로고" />
    </SignUpSocialSignUpBox>
  );
};

export default SocialLogin;
