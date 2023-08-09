import React from 'react';
import styled from 'styled-components';
import AccordianMenu from '@/components/common/AccordianMenu';
import { useMutation } from 'react-query';
import { updateUserSetting } from '@/api/user';

const ThemesBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  button {
    padding: 10px 0 8px;
    border-radius: 24px;
    font-size: 12px;
    border: none;
    &:nth-child(1) {
      background-color: #fff;
      border: 1px solid #5f7ba6;
    }
    &:nth-child(2) {
      background-color: #132b4f;
      color: #fff;
    }
    &:nth-child(3) {
      background-color: #000;
      color: #fff;
    }
  }
`;

type settingProps = {
  theme?: number;
};

const Themes = ({ theme }: settingProps) => {
  const mutate = useMutation((formData: FormData) =>
    updateUserSetting(formData)
  );

  const onClickThemesHandler = async (themes: string) => {
    const formData = new FormData();
    formData.append('theme', themes);
    await mutate.mutateAsync(formData);
  };

  return (
    <AccordianMenu tabText="Theme">
      <ThemesBox>
        <button onClick={() => onClickThemesHandler('original')}>
          Original Mode
        </button>
        <button onClick={() => onClickThemesHandler('midnigth')}>
          Midnight Mode
        </button>
      </ThemesBox>
    </AccordianMenu>
  );
};

export default Themes;
