import React, { FormEvent, useEffect, useState } from 'react';
import profile from '../../public/profile.jpg';
import styled from 'styled-components';
import Image from 'next/image';
import useInput from '@/hooks/useInput';
import { NextPage } from 'next';
import Input from '@/components/Setting/Input';
import Button from '@/components/common/Button';
import {
  useQuery,
  useMutation,
  QueryClient,
  useQueryClient,
} from 'react-query';
import { updateUserSetting } from '@/api/user';

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
      console.log(nickName);
    }
  };

  return (
    <form onSubmit={onSubmitNickNameHandler}>
      <Input
        type="password"
        name="passwordConfirm"
        value={nickName}
        placeholder="비밀번호 확인"
        onChange={onClickNickName}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Button type="submit">별명 수정</Button>
    </form>
  );
};

export default UpdateNickName;
