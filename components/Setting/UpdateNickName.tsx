import React, { FormEvent, useState } from 'react';
import useInput from '@/hooks/useInput';
import Input from '@/components/Setting/Input';
import { useMutation, useQueryClient } from 'react-query';
import { updateUserSetting } from '@/apis/user';
import { TextErrorParagraph } from '@/styles/signUp';
import { SettingButton } from '@/styles/setting';
import { modalState } from '@/types/comment';
import Modal from '../common/Modal';

type UpdateNickNameProps = {
  nickname?: string;
};

const UpdateNickName: React.FC<UpdateNickNameProps> = ({ nickname = '' }) => {
  const [nickName, onClickNickName] = useInput<string | undefined>(nickname);
  const [ServerNicknameError, setServerNicknameError] = useState<string>('');
  const [error, setError] = useState<any>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessge, setModalMessge] = useState<modalState>({
    actionText: '',
    modalMessge: '',
    onClickEvent: null,
  });
  const queryClient = useQueryClient();

  const mutate = useMutation(
    (formData: FormData) => updateUserSetting(formData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('userSetting');
      },
      onError: (error: any) => {
        const message = error?.response?.data.errorMessage;
        if (message) {
          setServerNicknameError(message);
          return;
        }
      },
    }
  );

  const validateNickname = (nickname: string): boolean => {
    const nicknamePattern = /^.{2,8}$/;
    return nicknamePattern.test(nickname);
  };

  const onSubmitNickNameHandler = async (e: FormEvent) => {
    e.preventDefault();

    let errors: string = '';

    if (!nickName) {
      errors = '닉네임을 입력해주세요.';
    } else if (!validateNickname(nickName)) {
      errors = '2~8자를 입력해주세요.';
    }

    if (errors !== '') {
      setError(errors);
      return;
    } else {
      setError('');
    }

    if (errors === '') {
      const formData = new FormData();
      formData.append('nickname', nickName ?? '');
      await mutate.mutateAsync(formData);
    }
  };
  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setModalMessge({
      actionText: '확인',
      modalMessge: '닉네임을 수정하시겠습니까?',
      onClickEvent: () => onSubmitNickNameHandler(e),
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
      <form onSubmit={onSubmitHandler}>
        <Input
          value={nickName}
          placeholder="닉네임 2자에서 15자 입력해주세요"
          onChange={onClickNickName}
        />

        {error && (
          <TextErrorParagraph $marginTop={'-12px'} $marginBottom={'20px'}>
            {error}
          </TextErrorParagraph>
        )}
        {ServerNicknameError && (
          <TextErrorParagraph $marginTop={'-12px'} $marginBottom={'20px'}>
            {ServerNicknameError}
          </TextErrorParagraph>
        )}
        <SettingButton type="submit" $marginTop={'-12px'}>
          닉네임 변경하기
        </SettingButton>
      </form>
    </>
  );
};

export default UpdateNickName;
