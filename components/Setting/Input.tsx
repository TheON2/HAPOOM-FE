import React from 'react';
import styled from 'styled-components';

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  span {
    font-size: 10px;
    font-weight: 700;
    color: #868686;
    padding: 8px 0 6px;
  }
`;

const InputStyle = styled.input`
  width: 100%;
  font-size: 12px;
  padding: 12px 28px 10px;
  border-radius: 3px;
  border: 1px solid #0084ff;
  color: #999999;
`;

type ProfileInputProps = {
  updateText: string;
  value: string;
  name: string;
  placeholder: string;
  label?: string;
  type?: 'password' | 'text';
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
      {updateText && <span>*{updateText}을 수정해주세요.</span>}
    </InputBox>
  );
};

export default Input;
