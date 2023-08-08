import Main from '@/components/Home/Main';
import Header from '@/components/common/Header';
import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import UserInfoUpdate from '@/components/Setting/UserInfoUpdate';
import UserProfileImageUpdate from '@/components/Setting/UserProfileImageUpdate';
import UpdatePassword from '@/components/Setting/UpdatePassword';
import Image from 'next/image';
import AccordianMenu from '@/components/common/AccordianMenu';

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
            <div>드롭</div>
          </AccordianContent>
        </AccordianMenu>
        <AccordianMenu tabText="프로필 수정">
          <AccordianContent>
            <UserProfileImageUpdate />
          </AccordianContent>
        </AccordianMenu>
        <AccordianMenu tabText="테마 수정">
          <AccordianContent>
            <div>드롭</div>
          </AccordianContent>
        </AccordianMenu>
        <AccordianMenu tabText="비밀번호 수정">
          <AccordianContent>
            <div>드롭</div>
          </AccordianContent>
        </AccordianMenu>
      </SettingLayout>
    </Main>
  );
};

export default Setting;
