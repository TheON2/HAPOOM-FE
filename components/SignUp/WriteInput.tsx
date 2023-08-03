import React from 'react';
import {
  StyledInputBox,
  StyledInput,
  SignUpBtn,
  TextParagraph,
} from '@/styles/signUp';
import { Signup } from './SingUpUi';

interface WriteInputProps {
  signUpState: Signup;
  setSignUpState: React.Dispatch<React.SetStateAction<Signup>>;
}

const WriteInput: React.FC<WriteInputProps> = ({
  signUpState,
  setSignUpState,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpState((prevSignUpState) => ({
      ...prevSignUpState,
      [name]: value,
    }));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordPattern = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;
    return passwordPattern.test(password);
  };

  const validatePasswordMatch = (password: string, passwordValid: string) => {
    return password === passwordValid;
  };

  const validateNickname = (nickname: string) => {
    const nicknamePattern = /^.{2,15}$/;
    return nicknamePattern.test(nickname);
  };

  const emailCheckSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (validateEmail(signUpState.email)) {
      alert('중복확인 되었습니다.');
    } else {
      alert('이메일이 유효하지 않습니다. 다시 입력해 주세요.');
    }
  };

  return (
    <>
      <StyledInputBox>
        <TextParagraph>이메일</TextParagraph>
        <StyledInput
          type="email"
          name="email"
          placeholder="example@gmail.com"
          onChange={handleInputChange}
        />
        <SignUpBtn onClick={emailCheckSubmit}>이메일 인증하기</SignUpBtn>
      </StyledInputBox>

      <StyledInputBox>
        <TextParagraph>비밀번호</TextParagraph>
        <p>영문, 숫자를 포함한 8자이상의 비밀번호를 입력해주세요</p>
        <StyledInput
          type="password"
          name="password"
          placeholder="비밀번호를 입력해 주세요"
          onChange={handleInputChange}
        />
        <TextParagraph>비밀번호 확인</TextParagraph>
        <StyledInput
          type="password"
          name="passwordValid"
          placeholder="비밀번호 확인"
          onChange={handleInputChange}
        />
      </StyledInputBox>

      <StyledInputBox>
        <TextParagraph>닉네임</TextParagraph>
        <p>다른 유저와 겹치지 않도록 입력해 주세요(2~15자)</p>
        <StyledInput
          type="text"
          name="nickname"
          placeholder="닉네임을 입력해 주세요"
          onChange={handleInputChange}
        />
      </StyledInputBox>
    </>
  );
};

export default WriteInput;
