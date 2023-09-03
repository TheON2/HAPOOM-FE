import React, { useState } from 'react';
import AccordianMenu from '@/components/common/AccordianMenu';
import { useMutation, useQueryClient } from 'react-query';
import { updateUserSetting } from '@/apis/user';
import { ThemesBox } from '@/styles/setting';
import { useDispatch } from 'react-redux';
import { setThemeAll } from '@/redux/reducers/themeSlice';
import { styled } from 'styled-components';
import { DarkModeButton, LightModeButton } from '@/styles/theme';

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
        <LightModeButton
          style={{ border: 'var(--setting-border)' }}
          onClick={handleLightModeClick}
        >
          맑은 하늘
        </LightModeButton>
        <DarkModeButton
          style={{ border: 'var(--setting-border)' }}
          onClick={handleDarkModeClick}
        >
          별무리 하늘
        </DarkModeButton>
      </ThemesBox>
    </AccordianMenu>
  );
};

export default Themes;
