import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import { StyledInput, TextErrorParagraph } from '@/styles/signUp';
import { useMutation, useQueryClient } from 'react-query';
import { updateUserSetting } from '@/api/user';
import { TextParagraph } from '@/styles/signIn';
import { TextParagraphPwdCheck } from '@/styles/setting';

export interface Signup {
  password: string;
  passwordConfirm: string;
}

type TextInputType = 'email' | 'password' | 'passwordConfirm' | 'nickname';

const InputBox = styled.div`
  width: 100%;
  /* margin-bottom: 32px; */
`;

const UpdatePassword = () => {
  const [signUpState, setSignUpState] = useState<Signup>({
    password: '',
    passwordConfirm: '',
  });

  const [error, setError] = useState<Signup>({
    password: '',
    passwordConfirm: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement & { name: TextInputType }>
  ) => {
    const { name, value } = e.target;

    setSignUpState((prevSignUpState) => ({
      ...prevSignUpState,
      [name]: value,
    }));
  };

  const validatePassword = (password: string) => {
    const passwordPattern = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;
    return passwordPattern.test(password);
  };

  const queryClient = useQueryClient();

  const mutate = useMutation(
    (formData: FormData) => updateUserSetting(formData),
    {
      onSuccess: () => {
        alert('비밀번호 수정이 완료되었습니다.');
        queryClient.invalidateQueries('userSetting');
      },
    }
  );

  const submitUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let errors: Signup = {
      password: '',
      passwordConfirm: '',
    };

    if (!signUpState.password) {
      errors.password = '비밀번호를 입력해주세요.';
    } else if (!validatePassword(signUpState.password)) {
      errors.password =
        '비밀번호는 영문, 숫자를 포함하여 8자 이상이어야합니다.';
    }

    if (signUpState.password !== signUpState.passwordConfirm) {
      errors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
    } else {
      setError({ password: '', passwordConfirm: '' });
    }

    const formData = new FormData();
    formData.append('password', signUpState.password);
    await mutate.mutateAsync(formData);
  };

  return (
    <>
      <form action="" onSubmit={submitUser}>
        <InputBox>
          <TextParagraph>비밀번호</TextParagraph>
          <TextParagraphPwdCheck>
            영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.
          </TextParagraphPwdCheck>
          <StyledInput
            type="password"
            name="password"
            value={signUpState.password}
            placeholder="비밀번호를 입력해 주세요"
            onChange={handleInputChange}
          />
          {error.password && (
            <TextErrorParagraph>{error.password}</TextErrorParagraph>
          )}
          <TextParagraph style={{ margin: '10px 0 7px 0' }}>
            비밀번호 확인
          </TextParagraph>
          <StyledInput
            type="password"
            name="passwordConfirm"
            value={signUpState.passwordConfirm}
            placeholder="비밀번호 확인"
            onChange={handleInputChange}
          />
          {error.passwordConfirm && (
            <TextErrorParagraph>{error.passwordConfirm}</TextErrorParagraph>
          )}
        </InputBox>
        <Button type="submit" $marginTop={'10px'}>
          비밀번호 수정
        </Button>
      </form>
    </>
  );
};

export default React.memo(UpdatePassword);
