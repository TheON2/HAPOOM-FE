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
      <SocialBoxImg
        width={84}
        height={84}
        onClick={onSocialLogIn}
        src={googleLogo}
        alt="구글로고"
        quality={80}
      />
      <SocialBoxImg
        width={84}
        height={84}
        onClick={onSocialLogIn}
        src={kakaoLogo}
        alt="카카오로고"
        quality={80}
      />
      <SocialBoxImg
        width={84}
        height={84}
        onClick={onSocialLogIn}
        src={instaLogo}
        alt="인스타로고"
        quality={80}
      />
    </SignUpSocialSignUpBox>
  );
};

export default SocialLogin;
