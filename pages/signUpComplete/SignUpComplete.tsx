import React from 'react';
import Image from 'next/image';
import { styled } from 'styled-components';
import { useRouter } from 'next/router';

const SubText = styled.p`
  color: #000;
  text-align: center;
  font-family: Inter;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.8px;
`;
const SubTextGray = styled(SubText)`
  color: #bebaba;
  font-size: 14px;
  letter-spacing: -0.7px;
  margin-top: 5px;
`;
const MoveHomeBtn = styled.button`
  color: #fff;
  text-align: center;
  font-family: Inter;
  font-size: 16px;
  font-weight: 700;
  width: 270px;
  height: 40px;
  background: #0084ff;
  border: 1px solid #0084ff;
  border-radius: 3px;
  cursor: pointer;
  margin-top: 46px;
`;
const SignUpCompleteSection = styled.section`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 24px;
`;
const SignUpCompleteContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const HeadText = styled.h1`
  color: #0084ff;
  text-align: center;
  font-size: 48px;
  font-weight: 900;
  margin-bottom: 20px;
`;
const SignUpComplete = () => {
  const router = useRouter();
  const MoveSignInHandeler = () => {
    router.push('/auth/SignIn');
  };
  return (
    <SignUpCompleteContainer>
      <SignUpCompleteSection>
        <HeadText>HAPOOM</HeadText>
        <div>
          <Image
            src="/movecloud.gif"
            alt="movecloud"
            width={160}
            height={160}
            unoptimized={true}
            style={{ marginBottom: '35px' }}
          />
        </div>
        <SubText>회원가입 완료!</SubText>
        <SubTextGray>이제 하늘을 공유하러 떠나볼까요?</SubTextGray>
        <MoveHomeBtn onClick={MoveSignInHandeler}>로그인 하러가기</MoveHomeBtn>
      </SignUpCompleteSection>
    </SignUpCompleteContainer>
  );
};

export default SignUpComplete;
