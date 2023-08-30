import React, { useState } from 'react';
import AccordianMenu from '@/components/common/AccordianMenu';
import { useMutation, useQueryClient } from 'react-query';
import { updateUserSetting } from '@/api/user';
import { ThemesBox } from '@/styles/setting';
import { useDispatch } from 'react-redux';
import { setThemeAll } from '@/redux/reducers/themeSlice';

type settingProps = {
  theme?: number;
};

const Themes = ({ theme }: settingProps) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const mutate = useMutation(
    (formData: FormData) => updateUserSetting(formData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('userSetting');
      },
    }
  );

  // const onClickThemesHandler = async (themes: number) => {
  //   alert('준비되지 않은 기능입니다. 조금만 기다려주세요!');
  //   const formData = new FormData();
  //   formData.append('theme', themes.toString());
  //   await mutate.mutateAsync(formData);
  // };
  const handleLightModeClick = () => {
    localStorage.setItem('theme', 'light');
    dispatch(setThemeAll('light'));
  };

  const handleDarkModeClick = () => {
    localStorage.setItem('theme', 'dark');
    dispatch(setThemeAll('dark'));
  };

  return (
    <AccordianMenu tabText="테마 수정">
      <ThemesBox>
        <button
          style={{ border: 'var(--setting-border)' }}
          onClick={handleLightModeClick}
        >
          맑은 하늘
        </button>
        <button
          style={{ border: 'var(--setting-border)' }}
          onClick={handleDarkModeClick}
        >
          별무리 하늘
        </button>
      </ThemesBox>
    </AccordianMenu>
  );
};

export default Themes;
