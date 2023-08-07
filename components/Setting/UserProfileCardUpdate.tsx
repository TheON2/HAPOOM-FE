import React, { useEffect, useState } from 'react';
import {
  FollowBox,
  ProfileContentsBox,
  SettingPageLink,
  UserImage,
  UserProfileCardBox,
} from '@/styles/user';
import profile from '../../public/profile.jpg';
import styled from 'styled-components';
const ProfileInputBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ProfileInputStyle = styled.input`
  width: 100%;
  height: 40px;
`;

type ProfileInputProps = {
  updateText: string;
  value: string;
};

const UserProfileCardLayout = styled.div`
  display: flex;
  margin-top: -1px;
  padding: 1.5rem 2rem;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  border: 1px solid #051619;
  cursor: pointer;
  position: relative;
`;

const FormButtonBox = styled.div`
  display: flex;
`;

const FormLayout = styled.form`
  display: flex;
  gap: 12px;
`;

const ProfileInput = ({
  updateText,
  ...restProps
}: Partial<ProfileInputProps>) => {
  return (
    <ProfileInputBox>
      <label htmlFor="">{updateText} 수정</label>
      <ProfileInputStyle {...restProps} type="text" />
      <p>*{updateText}을 수정해주세요.</p>
    </ProfileInputBox>
  );
};

type SettingsState = {
  nicknameSet: boolean;
};

type TextValueState = {
  nickname: string;
};

const UserProfileCardUpdate = () => {
  const [settingsState, setSettingsState] = useState<SettingsState>({
    nicknameSet: false,
  });
  const [textValue, settextValue] = useState<TextValueState>({
    nickname: '',
  });

  const maxInterests = 3;
  const handleChange = (event: any) => {
    const { name, value, checked } = event.target;

    settextValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const toggleSetting = <K extends keyof SettingsState>(settingName: K) => {
    setSettingsState((prevState) => ({
      ...prevState,
      [settingName]: !prevState[settingName],
    }));
  };

  useEffect(() => {
    console.log(textValue);
  }, [textValue]);

  return (
    <>
      <h2>유저 정보</h2>
      <UserProfileCardLayout style={{ cursor: 'pointer' }}>
        {/* <label className="setting-row-label">닉네임</label> */}
        <div className="setting-row-value">
          {!settingsState.nicknameSet ? (
            <>
              <p>닉네임</p>
              <span
                className="setting-row-change"
                onClick={() => toggleSetting('nicknameSet')}
              >
                <i className="icon-arrow"></i>
              </span>
            </>
          ) : (
            <div>
              <FormLayout>
                <legend>닉네임</legend>
                <fieldset>
                  <div>
                    <input
                      type="text"
                      name="nickname"
                      className="textfield-input"
                      placeholder="닉네임"
                      value={textValue.nickname}
                      onChange={handleChange}
                    />
                  </div>
                  <FormButtonBox>
                    <button className="setting-row-foot-confirm primary-button">
                      변경하기
                    </button>
                    <button
                      type="button"
                      className="setting-row-foot-cancel teriary-button"
                      onClick={() => toggleSetting('nicknameSet')}
                    >
                      취소
                    </button>
                  </FormButtonBox>
                </fieldset>
              </FormLayout>
            </div>
          )}
        </div>
      </UserProfileCardLayout>
    </>
  );
};

export default UserProfileCardUpdate;
