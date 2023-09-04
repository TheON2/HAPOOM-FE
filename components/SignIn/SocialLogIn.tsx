import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import google from '../../public/google.png';
import kakao from '../../public/kakao.png';
import naver from '../../public/naver.png';
import { SignUpSocialSignUpBox } from '@/styles/signIn';

const SocialLogin = () => {
  const temporaryClick = () => {
    alert('준비중입니다. 불편을 끼쳐드려 죄송합니다.');
  };

  const handleLogin = (loginUrl: string) => {
    if (typeof window === 'undefined') {
      return;
    }

    if (window.document.hasStorageAccess) {
      window.document.hasStorageAccess().then((hasAccess) => {
        if (!hasAccess) {
          window.document.requestStorageAccess().then(() => {
            window.location.href = loginUrl;
          });
        } else {
          window.location.href = loginUrl;
        }
      });
    } else {
      window.location.href = loginUrl;
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
          src={naver}
          alt="네이버로그인"
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
          src={google}
          alt="구글로그인"
          quality={80}
          style={{ borderRadius: '50%', cursor: 'pointer' }}
        />
      </div>
    </SignUpSocialSignUpBox>
  );
};

export default React.memo(SocialLogin);
