import React from 'react';
import Input from '@/components/Setting/Input';
import styled from 'styled-components';
import useInput from '@/hooks/useInput';
const UpdatePasswordLayout = styled.div`
  width: 100%;
`;

const UpdatePassword = () => {
  const [password, handlePasswordChange, setPasswordValue] =
    useInput<string>('');
  const [confirm, handleConfirmChange, setConfirmValue] = useInput<string>('');

  const submitUser = (event: any) => {
    event.preventDefault();
    console.log(password);
    console.log(confirm);
  };

  return (
    <UpdatePasswordLayout>
      <h2>비밀번호 수정</h2>
      <form action="" onSubmit={submitUser}>
        <Input
          value={password}
          name="password"
          onChange={handlePasswordChange}
          updateText={'비밀번호'}
        />
        <Input
          value={confirm}
          name="confirm"
          onChange={handleConfirmChange}
          updateText={'비밀번호 확인'}
        />
        <button type="submit">비밀번호 수정</button>
      </form>
    </UpdatePasswordLayout>
  );
};

export default UpdatePassword;
