import React, { useState } from 'react';
import Input from '@/components/Setting/Input';
import styled from 'styled-components';
import useInput from '@/hooks/useInput';
import Button from '@/components/common/Button';
import { StyledInputBox, StyledInput } from '@/styles/signUp';
import { useMutation } from 'react-query';
import { updateUserSetting } from '@/api/user';

export interface Signup {
  password: string;
  passwordConfirm: string;
}
export interface CheckBoxInterface {
  checkAll: boolean;
  checkTerms: boolean;
  checkPersonalInfo: boolean;
  checkNewsletter: boolean;
}

type TextInputType = 'email' | 'password' | 'passwordConfirm' | 'nickname';

const InputBox = styled.div`
  width: 100%;
  margin-bottom: 32px;
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

  const mutate = useMutation((formData: FormData) =>
    updateUserSetting(formData)
  );

  const submitUser = async (event: any) => {
    event.preventDefault();

    let errors: any = {};

    if (!signUpState.password) {
      errors.password = '비밀번호를 입력해주세요.';
    } else if (!validatePassword(signUpState.password)) {
      errors.password =
        '비밀번호는 영문, 숫자를 포함하여 8자 이상이어야합니다.';
    }

    if (signUpState.password !== signUpState.passwordConfirm) {
      errors.password = '비밀번호가 일치하지 않습니다.';
      // errors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    } else {
      setError({ password: '', passwordConfirm: '' });
    }

    if (Object.keys(errors).length === 0) {
      const formData = new FormData();
      formData.append('theme', signUpState.password);
      await mutate.mutateAsync(formData);
    }
  };

  return (
    <>
      <form action="" onSubmit={submitUser}>
        <InputBox>
          <StyledInput
            type="password"
            name="password"
            value={signUpState.password}
            placeholder="비밀번호를 입력해 주세요"
            onChange={handleInputChange}
          />
          <StyledInput
            type="password"
            name="passwordConfirm"
            value={signUpState.passwordConfirm}
            placeholder="비밀번호 확인"
            onChange={handleInputChange}
          />
          <p style={{ color: 'red' }}>{error.password}</p>
          <p style={{ color: 'red' }}>{error.passwordConfirm}</p>
        </InputBox>
        <Button type="submit">비밀번호 수정</Button>
      </form>
    </>
  );
};

export default UpdatePassword;
