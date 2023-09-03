import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import google from '../../public/google.png';
import kakao from '../../public/kakao.png';
import naver from '../../public/naver.png';
import { SignUpSocialSignUpBox } from '@/styles/signIn';
import axios from 'axios';
import instance from '@/axios/api';

const SocialLogin = () => {
  const temporaryClick = () => {
    alert('준비중입니다. 불편을 끼쳐드려 죄송합니다.');
  };

  const handleLogin = (loginUrl: string) => {
    if (typeof window !== 'undefined') {
      window.location.href = loginUrl; // 사용자를 해당 로그인 URL로 리다이렉트
    }
  };

  return (
    <SignUpSocialSignUpBox>
      <div
        onClick={() =>
          handleLogin(`${process.env.NEXT_PUBLIC_LOCAL_SERVER}/api/auth/google`)
        }
      >
        <Image
          width={64}
          height={64}
          src={google}
          alt="구글로그인"
          quality={80}
          style={{ borderRadius: '50%', cursor: 'pointer' }}
        />
      </div>
      <div
        onClick={() =>
          handleLogin(`${process.env.NEXT_PUBLIC_LOCAL_SERVER}/api/auth/kakao`)
        }
      >
        <Image
          width={64}
          height={64}
          src={kakao}
          alt="카카오로그인"
          quality={80}
          style={{ borderRadius: '50%', cursor: 'pointer' }}
        />
      </div>
      <div
        onClick={() =>
          handleLogin(`${process.env.NEXT_PUBLIC_LOCAL_SERVER}/api/auth/naver`)
        }
      >
        <Image
          width={64}
          height={64}
          src={naver}
          alt="네이버로그인"
          quality={80}
          style={{ borderRadius: '50%', cursor: 'pointer' }}
        />
      </div>
    </SignUpSocialSignUpBox>
  );
};

export default React.memo(SocialLogin);
