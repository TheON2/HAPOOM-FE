import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import google from '../../public/google.png';
import kakao from '../../public/kakao.png';
import naver from '../../public/naver.png';
import { SignUpSocialSignUpBox } from '@/styles/signIn';
import { signIn, useSession } from 'next-auth/react';
import { useMutation } from 'react-query';
import { addSocialUser } from '@/api/user';
import { useRouter } from 'next/router';

const SocialLogin = () => {
  const { data: session } = useSession();
  const [prevSession, setPrevSession] = useState(session); // 초기값을 현재 세션으로 설정
  const router = useRouter();

  const handleSignIn = (provider: string, e: any) => {
    e.preventDefault();
    localStorage.setItem('loginMethod', provider);
    signIn(provider);
  };

  const addUserMutation = useMutation(addSocialUser, {
    onSuccess: (data) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', JSON.stringify(data)); // 데이터를 로컬스토리지에 저장
        router.push('/');
      }
    },
  });

  if (typeof window !== 'undefined') {
    const method = localStorage.getItem('loginMethod');
    if (
      session &&
      session.user &&
      method &&
      !sessionEquals(session, prevSession)
    ) {
      const sendData = {
        email: session.user.email,
        password: 'social',
        nickname: session.user.name,
        method,
      };
      addUserMutation.mutate(sendData);
      setPrevSession(session); // prevSession을 업데이트
    }
  }

  return (
    <SignUpSocialSignUpBox>
      <SocialButton provider="google" image={google} onClick={handleSignIn} />
      <SocialButton provider="kakao" image={kakao} onClick={handleSignIn} />
      <SocialButton provider="naver" image={naver} onClick={handleSignIn} />
    </SignUpSocialSignUpBox>
  );
};

const SocialButton = ({ provider, image, onClick }: any) => (
  <Link href="#">
    <Image
      width={64}
      height={64}
      src={image}
      alt={`${provider}로그인`}
      quality={80}
      style={{ borderRadius: '50%', cursor: 'pointer' }}
      onClick={(e) => onClick(provider, e)}
    />
  </Link>
);

function sessionEquals(sessionA: any, sessionB: any) {
  return sessionA?.user?.email === sessionB?.user?.email;
}

export default React.memo(SocialLogin);
