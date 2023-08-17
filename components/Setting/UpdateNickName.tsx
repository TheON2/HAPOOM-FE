import React, { FormEvent, useState } from 'react';
import useInput from '@/hooks/useInput';
import { NextPage } from 'next';
import Input from '@/components/Setting/Input';
import Button from '@/components/common/Button';
import { useMutation, useQueryClient } from 'react-query';
import { updateUserSetting } from '@/api/user';
import { TextErrorParagraph } from '@/styles/signUp';

type settingProps = {
  nickname?: string;
};

const UpdateNickName: NextPage<settingProps> = ({ nickname }) => {
  // console.log('리렌더링');
  const [nickName, onClickNickName, setNickName] = useInput<string | undefined>(
    nickname
  );
  const [error, setError] = useState<string>('');

  const queryClient = useQueryClient();

  const mutate = useMutation(
    (formData: FormData) => updateUserSetting(formData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('userSetting');
      },
    }
  );

  const validateNickname = (nickname: string) => {
    const nicknamePattern = /^.{2,15}$/;
    return nicknamePattern.test(nickname);
  };

  const onSubmitNickNameHandler = async (e: FormEvent) => {
    e.preventDefault();

    let errors: string = '';

    if (!nickName) {
      errors = '닉네임을 입력해주세요.';
    } else if (!validateNickname(nickName)) {
      errors = '2~15자를 입력해주세요.';
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

  return (
    <form onSubmit={onSubmitNickNameHandler}>
      <Input
        value={nickName}
        placeholder="닉네임 2자에서 15자 입력해주세요"
        onChange={onClickNickName}
      />
      {error && <TextErrorParagraph>{error}</TextErrorParagraph>}
      <Button type="submit" $marginTop={'-12px'}>
        닉네임변경하기
      </Button>
    </form>
  );
};

export default UpdateNickName;
