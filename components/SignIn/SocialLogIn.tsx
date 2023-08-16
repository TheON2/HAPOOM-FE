import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import googleLogo from '../../public/googleLogo.png';
import kakaoLogo from '../../public/kakaoLogo.png';
import instaLogo from '../../public/pngegg.png';
import { SignUpSocialSignUpBox } from '@/styles/signIn';

const SocialLogin = () => {
  return (
    <SignUpSocialSignUpBox>
      <Link href={`${process.env.NEXT_PUBLIC_LOCAL_SERVER}/api/auth/google`}>
        <Image
          width={64}
          height={60}
          src={googleLogo}
          alt="구글로고"
          quality={80}
          style={{ borderRadius: '100%', cursor: 'pointer' }}
        />
      </Link>
      <Link href={`${process.env.NEXT_PUBLIC_LOCAL_SERVER}/api/auth/kakao`}>
        <Image
          width={64}
          height={60}
          src={kakaoLogo}
          alt="카카오로고"
          quality={80}
          style={{ borderRadius: '100%', cursor: 'pointer' }}
        />
      </Link>
      <Link href={`${process.env.NEXT_PUBLIC_LOCAL_SERVER}/api/auth/naver`}>
        <Image
          width={64}
          height={60}
          src={instaLogo}
          alt="인스타로고"
          quality={80}
          style={{ borderRadius: '100%', cursor: 'pointer' }}
        />
      </Link>
    </SignUpSocialSignUpBox>
  );
};

export default SocialLogin;
