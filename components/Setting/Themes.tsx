import React from 'react';
import AccordianMenu from '@/components/common/AccordianMenu';
import { useMutation, useQueryClient } from 'react-query';
import { updateUserSetting } from '@/api/user';
import { ThemesBox } from '@/styles/setting';

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
    alert('준비되지 않은 기능입니다. 조금만 기다려주세요!');
    const formData = new FormData();
    formData.append('theme', themes.toString());
    await mutate.mutateAsync(formData);
  };

  return (
    <AccordianMenu tabText="테마 수정">
      <ThemesBox>
        <button onClick={() => onClickThemesHandler(1)}>Original Mode</button>
        <button onClick={() => onClickThemesHandler(2)}>Midnight Mode</button>
      </ThemesBox>
    </AccordianMenu>
  );
};

export default Themes;
