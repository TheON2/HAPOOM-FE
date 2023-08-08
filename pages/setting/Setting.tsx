import Main from '@/components/Home/Main';
import Header from '@/components/common/Header';
import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import UserInfoUpdate from '@/components/Setting/UserInfoUpdate';
import UserProfileImageUpdate from '@/components/Setting/UserProfileImageUpdate';
import UpdatePassword from '@/components/Setting/UpdatePassword';
import {
  FollowBox,
  ProfileContentsBox,
  SettingPageLink,
  UserProfileCardBox,
} from '@/styles/user';
import Image from 'next/image';

const SettingLayout = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1360px;
  /* margin: 2rem auto 8rem; */
  padding: 0 24px;
`;

const AccordianLayout = styled.div`
  /* display: flex; */
  width: 100%;
`;

const userInfo = {
  nickname: '멋쟁이 도영',
  introduceText: '나는 오늘도 하늘을 찍는다',
  password: 'password',
};

type accordianProps = {
  isOpen: boolean;
};

const AccordianTab = styled.div<accordianProps>`
  width: 100%;
  /* height: 52px;  */
  padding: 20px 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: ${(props) =>
    props.isOpen ? '1px solid rgba(255, 255, 255, 0);' : '1px solid #333'};
  font-weight: 700;
`;

const AccordianContent = styled.div`
  width: 100%;
  padding-bottom: 36px;
`;

const Icon = () => {
  return (
    <Image src={'/🦆 icon _cloud_.svg'} alt={'icon'} width={20} height={20} />
  );
};

type DroptabProps = {
  tabText: string;
  children: ReactNode;
};

const AccordianMenu = ({ tabText, children }: DroptabProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClickDropTabHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <AccordianLayout>
      <AccordianTab onClick={onClickDropTabHandler} isOpen={isOpen}>
        {tabText} <Icon />
      </AccordianTab>
      {isOpen ? children : null}
    </AccordianLayout>
  );
};

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
