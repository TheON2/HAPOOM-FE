import React, { useState } from 'react';
import {
  StyledInputBox,
  StyledInput,
  SignUpBtn,
  TextParagraph,
} from '@/styles/signUp';

interface Signup {
  email: string;
  password: string;
  passwordValid: string;
  nickname: string;
}
const WriteInput = () => {
  const [signUpState, setSignUpState] = useState<Signup>({
    email: '',
    password: '',
    passwordValid: '',
    nickname: '',
  });

  return (
    <>
      <StyledInputBox>
        <TextParagraph>이메일</TextParagraph>
        <StyledInput
          type="email"
          name="email"
          placeholder="example@gmail.com"
        />
        <SignUpBtn>이메일 인증하기</SignUpBtn>
      </StyledInputBox>

      <StyledInputBox>
        <TextParagraph>비밀번호</TextParagraph>
        <p>영문, 숫자를 포함한 8자이상의 비밀번호를 입력해주세요</p>
        <StyledInput
          type="password"
          name="password"
          placeholder="비밀번호를 입력해 주세요"
        />
        <TextParagraph>비밀번호 확인</TextParagraph>
        <StyledInput
          type="password"
          name="passwordValid"
          placeholder="비밀번호 확인"
        />
      </StyledInputBox>

      <StyledInputBox>
        <TextParagraph>닉네임</TextParagraph>
        <p>다른 유저와 겹치지 않도록 입력해 주세요(2~15자)</p>
        <StyledInput
          type="text"
          name="nickname"
          placeholder="닉네임을 입력해 주세요"
        />
      </StyledInputBox>
    </>
  );
};

export default WriteInput;
