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
