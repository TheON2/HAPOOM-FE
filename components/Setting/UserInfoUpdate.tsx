import React, { FormEvent, useEffect, useState } from 'react';
import {
  FollowBox,
  ProfileContentsBox,
  SettingPageLink,
  UserImage,
  UserProfileCardBox,
} from '@/styles/user';
import profile from '../../public/profile.jpg';
import styled from 'styled-components';
import Image from 'next/image';
import useInput from '@/hooks/useInput';
import { NextPage } from 'next';
import Input from '@/components/Setting/Input';

const UserInfoUpdateLayout = styled.div`
  margin-top: -1px;
  padding: 1.5rem 2rem;
  width: 100%;
  border: 1px solid #051619;
  position: relative;
`;

const InfoHead = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const FormButtonBox = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  button {
    width: 100px;
    height: 20px;
  }
`;

const InfoContentBox = styled.div`
  height: 70px;
`;

type settingProps = {
  info: string;
  infoData: string;
};

const UserInfoUpdate: NextPage<settingProps> = ({ info, infoData }) => {
  const [textValue, handleTextChange, setTextValue] =
    useInput<string>(infoData);
  const [settingsState, setSettingsState] = useState<boolean>(false);

  const toggleSetting = () => {
    setSettingsState(!settingsState);
  };

  //   const mutation = useMutation((formData) => 기능(formData), {
  //     onSuccess: () => {
  //         QueryClient.invalidateQueries('');
  //     },
  // });

  const onSubmitUserInfo = (e: FormEvent) => {
    e.preventDefault();
    console.log(textValue);
    setSettingsState(!settingsState);

    // await mutation.mutateAsync(formData);
  };

  return (
    <>
      <UserInfoUpdateLayout>
        <InfoHead>
          <p>{info}</p>
          <FormButtonBox>
            {!settingsState ? (
              <button onClick={toggleSetting}>
                <i className="icon-arrow">
                  <Image
                    src={'/🦆 icon _cloud_.svg'}
                    alt="preset"
                    width={20}
                    height={20}
                  />
                </i>
              </button>
            ) : (
              <>
                <button type="submit">변경하기</button>
                <button onClick={toggleSetting}>취소</button>
              </>
            )}
          </FormButtonBox>
        </InfoHead>
        <InfoContentBox>
          {!settingsState ? (
            <p>{infoData}</p>
          ) : (
            <form onSubmit={onSubmitUserInfo}>
              <Input
                value={textValue}
                name="nickname"
                onChange={handleTextChange}
                updateText={info}
                // placeholder="닉네임"
              />
            </form>
          )}
        </InfoContentBox>
      </UserInfoUpdateLayout>
    </>
  );
};

export default UserInfoUpdate;
