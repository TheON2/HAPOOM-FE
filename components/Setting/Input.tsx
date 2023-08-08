import React from 'react';
import styled from 'styled-components';

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InputStyle = styled.input`
  width: 80%;
  padding: 8px 16px;
`;

type ProfileInputProps = {
  updateText: string;
  value: string;
  name: string;
  placeholder: string;
  label?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
  updateText,
  label,
  ...restProps
}: Partial<ProfileInputProps>) => {
  return (
    <InputBox>
      {label ? <label htmlFor=""></label> : null}
      <InputStyle {...restProps} type="text" />
      <span>*{updateText}을 수정해주세요.</span>
    </InputBox>
  );
};

export default Input;
