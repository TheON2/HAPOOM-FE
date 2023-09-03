import {
  StyledEmailInput,
  StyledInputBox,
  StyledPasswordInput,
} from '@/styles/signIn';
import React from 'react';
import { SignIn } from './SignInUi';

interface SignInInputsProps {
  signInState: SignIn;
  handleInputChange: React.ChangeEventHandler<HTMLInputElement>;
}
const SignInInput: React.FC<SignInInputsProps> = ({
  signInState,
  handleInputChange,
}) => {
  return (
    <>
      <StyledInputBox>
        <StyledEmailInput
          type="email"
          name="email"
          placeholder="이메일을 입력해 주세요"
          onChange={handleInputChange}
        />
      </StyledInputBox>
      <StyledInputBox>
        <StyledPasswordInput
          type="password"
          name="password"
          placeholder="비밀번호를 입력해 주세요"
          onChange={handleInputChange}
        />
      </StyledInputBox>
    </>
  );
};
export default React.memo(SignInInput);
