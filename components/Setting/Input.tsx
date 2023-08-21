import { InputBox, InputStyle } from '@/styles/setting';
import React from 'react';
import styled from 'styled-components';

type ProfileInputProps = {
  updateText?: string;
  value?: string;
  name?: string;
  placeholder?: string;
  label?: string;
  type?: 'password' | 'text';
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<ProfileInputProps> = ({
  updateText,
  label,
  ...restProps
}) => {
  return (
    <InputBox>
      {label ? <label htmlFor=""></label> : null}
      <InputStyle {...restProps} type="text" />
      {updateText && <span>*{updateText}을 수정해주세요.</span>}
    </InputBox>
  );
};

export default React.memo(Input);
