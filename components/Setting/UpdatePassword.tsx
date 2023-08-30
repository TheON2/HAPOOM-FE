import React, { useState } from 'react';
import styled from 'styled-components';
import { StyledInput, TextErrorParagraph } from '@/styles/signUp';
import { useMutation, useQueryClient } from 'react-query';
import { updateUserSetting } from '@/api/user';
import { TextParagraph } from '@/styles/signIn';
import { SettingButton, TextParagraphPwdCheck } from '@/styles/setting';
import Modal from '../common/Modal';
import { modalState } from '@/types/comment';

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
  const [modalMessge, setModalMessge] = useState<modalState>({
    actionText: '',
    modalMessge: '',
    onClickEvent: null,
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
        queryClient.invalidateQueries('userSetting');
      },
    }
  );

  const submitUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    window.location.reload();
  };
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setModalMessge({
      actionText: '확인',
      modalMessge: '비밀번호를 수정하시겠습니까?',
      onClickEvent: () => submitUser(e),
    });
    setIsModalOpen(true);
  };
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        actionText={modalMessge.actionText}
        onClickEvent={modalMessge.onClickEvent}
      >
        {modalMessge.modalMessge}
      </Modal>
      <form action="" onSubmit={onSubmitHandler}>
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
        <SettingButton type="submit" $marginTop={'10px'}>
          비밀번호 수정
        </SettingButton>
      </form>
    </>
  );
};

export default React.memo(UpdatePassword);
