import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import google from '../../public/google.png';
import kakao from '../../public/kakao.png';
import naver from '../../public/naver.png';
import { SignUpSocialSignUpBox } from '@/styles/signIn';

const SocialLogin = () => {
  return (
    <SignUpSocialSignUpBox>
      <Link href={`${process.env.NEXT_PUBLIC_LOCAL_SERVER}/api/auth/google`}>
        <Image
          width={64}
          height={60}
          src={google}
          alt="구글로그인"
          quality={80}
          style={{ borderRadius: '100%', cursor: 'pointer' }}
        />
      </Link>
      <Link href={`${process.env.NEXT_PUBLIC_LOCAL_SERVER}/api/auth/kakao`}>
        <Image
          width={64}
          height={60}
          src={kakao}
          alt="카카오로그인"
          quality={80}
          style={{ borderRadius: '100%', cursor: 'pointer' }}
        />
      </Link>
      <Link href={`${process.env.NEXT_PUBLIC_LOCAL_SERVER}/api/auth/naver`}>
        <Image
          width={64}
          height={60}
          src={naver}
          alt="네이버로그인"
          quality={80}
          style={{ borderRadius: '100%', cursor: 'pointer' }}
        />
      </Link>
    </SignUpSocialSignUpBox>
  );
};

export default SocialLogin;
