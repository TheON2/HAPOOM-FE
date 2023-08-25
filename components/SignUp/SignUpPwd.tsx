import React, { useCallback, useState } from 'react';
import {
  StyledInputBox,
  StyledInput,
  TextErrorParagraph,
  TextParagraphInfo,
  TextParagrapValidate,
} from '@/styles/signUp';
import { SecretEye } from '../common/SVG';

interface Props {
  signUpState: {
    password: string;
    passwordConfirm: string;
  };
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement & { name: string }>
  ) => void;
  error: {
    password: string;
    passwordConfirm: string;
  };
}

const SignUpPwd: React.FC<Props> = ({
  signUpState,
  handleInputChange,
  error,
}) => {
  const [passwordInputType, setPasswordInputType] = useState<
    'password' | 'text'
  >('password');
  const [passwordConfirmInputType, setPasswordConfirmInputType] = useState<
    'password' | 'text'
  >('password');

  const togglePasswordVisibility = useCallback(() => {
    setPasswordInputType(
      passwordInputType === 'password' ? 'text' : 'password'
    );
  }, [passwordInputType]);

  const togglePasswordConfirmVisibility = useCallback(() => {
    setPasswordConfirmInputType(
      passwordConfirmInputType === 'password' ? 'text' : 'password'
    );
  }, [passwordConfirmInputType]);
  return (
    <StyledInputBox>
      <TextParagraphInfo $marginBottom="7px">비밀번호</TextParagraphInfo>
      <TextParagrapValidate>
        영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.
      </TextParagrapValidate>
      <StyledInput
        type={passwordInputType}
        name="password"
        value={signUpState.password}
        placeholder="비밀번호"
        onChange={handleInputChange}
      />
      <SecretEye
        onClick={togglePasswordVisibility}
        style={{
          position: 'absolute',
          right: '10px',
          top: error.password ? '36%' : '43%',
          transform: 'translateY(-50%)',
          cursor: 'pointer',
        }}
      />
      <TextParagraphInfo $marginTop={'8px'} $marginBottom={'8px'}>
        비밀번호 확인
      </TextParagraphInfo>
      <StyledInput
        type={passwordConfirmInputType}
        name="passwordConfirm"
        value={signUpState.passwordConfirm}
        placeholder="비밀번호 확인"
        onChange={handleInputChange}
      />
      <SecretEye
        onClick={togglePasswordConfirmVisibility}
        style={{
          position: 'absolute',
          right: '10px',
          top: error.password ? '74%' : '87%',
          transform: 'translateY(-50%)',
          cursor: 'pointer',
        }}
      />
      {error.password && (
        <TextErrorParagraph>{error.password}</TextErrorParagraph>
      )}
    </StyledInputBox>
  );
};

export default React.memo(SignUpPwd);
