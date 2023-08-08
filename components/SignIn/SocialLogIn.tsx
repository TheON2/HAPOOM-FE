import React from 'react';
import googleLogo from '../../public/googleLogo.png';
import kakaoLogo from '../../public/kakaoLogo.png';
import instaLogo from '../../public/pngegg.png';
import { SignUpSocialSignUpBox } from '@/styles/signIn';
import Image from 'next/image';

const SocialLogin = () => {
  const onSocialLogIn = () => {
    alert('준비중입니다.');
  };
  return (
    <SignUpSocialSignUpBox>
      <Image
        width={64}
        height={64}
        onClick={onSocialLogIn}
        src={googleLogo}
        alt="구글로고"
        quality={80}
        style={{ borderRadius: '100%', cursor: 'pointer' }}
      />
      <Image
        width={64}
        height={64}
        onClick={onSocialLogIn}
        src={kakaoLogo}
        alt="카카오로고"
        quality={80}
        style={{ borderRadius: '100%', cursor: 'pointer' }}
      />
      <Image
        width={64}
        height={64}
        onClick={onSocialLogIn}
        src={instaLogo}
        alt="인스타로고"
        quality={80}
        style={{ borderRadius: '100%', cursor: 'pointer' }}
      />
    </SignUpSocialSignUpBox>
  );
};

export default SocialLogin;
