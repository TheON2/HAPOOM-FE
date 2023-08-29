import React from 'react';
import {
  StyledInputBox,
  StyledInput,
  TextErrorParagraph,
  TextParagraphInfo,
  TextParagrapValidate,
} from '@/styles/signUp';

interface Props {
  signUpState: {
    nickname: string;
  };
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement & { name: string }>
  ) => void;
  error: {
    nickname: string;
  };
}

const SignUpNickname: React.FC<Props> = ({
  signUpState,
  handleInputChange,
  error,
}) => {
  return (
    <StyledInputBox>
      <TextParagraphInfo $marginTop={'24px'} $marginBottom={'7px'}>
        닉네임
      </TextParagraphInfo>
      <TextParagrapValidate>
        다른 유저와 겹치지 않도록 입력해주세요.(2~15자)
      </TextParagrapValidate>
      <StyledInput
        type="text"
        name="nickname"
        value={signUpState.nickname}
        placeholder="닉네임은 2자에서 15자입니다."
        onChange={handleInputChange}
      />
      {error.nickname && (
        <TextErrorParagraph>{error.nickname}</TextErrorParagraph>
      )}
    </StyledInputBox>
  );
};

export default React.memo(SignUpNickname);
