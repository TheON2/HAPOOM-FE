import Main from '@/components/Home/Main';
import Header from '@/components/common/Header';
import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import UpdateNickName from '@/components/Setting/UpdateNickName';
import UserProfileImageUpdate from '@/components/Setting/UpdateUserProfile';
import UpdatePassword from '@/components/Setting/UpdatePassword';
import Image from 'next/image';
import AccordianMenu from '@/components/common/AccordianMenu';
// import Themes from '@/components/Setting/Themes';
const SettingLayout = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1360px;
  padding: 0 24px;
`;

const userInfo = {
  nickname: '멋쟁이 도영',
  introduceText: '나는 오늘도 하늘을 찍는다',
  password: 'password',
};

const AccordianContent = styled.div`
  width: 100%;
  padding-bottom: 36px;
`;

const Setting = () => {
  return (
    <Main>
      <Header />
      <SettingLayout>
        <AccordianMenu tabText="별명 수정">
          <AccordianContent>
            <UpdateNickName userData={userInfo.nickname} />
          </AccordianContent>
        </AccordianMenu>
        <AccordianMenu tabText="프로필 수정">
          <AccordianContent>
            <UserProfileImageUpdate />
          </AccordianContent>
        </AccordianMenu>
        {/* <AccordianContent>
          <Themes />
        </AccordianContent> */}
        <AccordianMenu tabText="비밀번호 수정">
          <AccordianContent>
            <UpdatePassword />
          </AccordianContent>
        </AccordianMenu>
      </SettingLayout>
    </Main>
  );
};

export default Setting;
