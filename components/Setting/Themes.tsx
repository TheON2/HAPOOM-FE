import React from 'react';
import styled from 'styled-components';
import AccordianMenu from '@/components/common/AccordianMenu';
import { useMutation, useQueryClient } from 'react-query';
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
  const queryClient = useQueryClient();

  const mutate = useMutation(
    (formData: FormData) => updateUserSetting(formData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('userSetting');
      },
    }
  );

  const onClickThemesHandler = async (themes: number) => {
    console.log(themes);
    const formData = new FormData();
    formData.append('theme', themes.toString()); // themes를 문자열로 변환
    await mutate.mutateAsync(formData);
  };

  return (
    <AccordianMenu tabText="Theme">
      <ThemesBox>
        <button onClick={() => onClickThemesHandler(1)}>Original Mode</button>
        <button onClick={() => onClickThemesHandler(2)}>Midnight Mode</button>
      </ThemesBox>
    </AccordianMenu>
  );
};

export default Themes;
