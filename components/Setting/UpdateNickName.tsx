import React, { FormEvent, useEffect, useState } from 'react';
import profile from '../../public/profile.jpg';
import styled from 'styled-components';
import Image from 'next/image';
import useInput from '@/hooks/useInput';
import { NextPage } from 'next';
import Input from '@/components/Setting/Input';
import Button from '@/components/common/Button';

type settingProps = {
  userData: string;
};

const UpdateNickName: NextPage<settingProps> = ({ userData }) => {
  const [nickName, onClickNickName, setNickName] = useInput<string>(userData);
  const [error, setError] = useState<string>('');
  //   const mutation = useMutation((formData) => 기능(formData), {
  //     onSuccess: () => {
  //         QueryClient.invalidateQueries('');
  //     },
  // });

  const validateNickname = (nickname: string) => {
    const nicknamePattern = /^.{2,15}$/;
    return nicknamePattern.test(nickname);
  };

  const onSubmitNickNameHandler = (e: FormEvent) => {
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
      alert('nickName');
      // addUserMutation.mutate(nickName);
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
