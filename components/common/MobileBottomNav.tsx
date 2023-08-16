import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import {
  MobileBottomNavLayout,
  BottomNavList,
  BottomNavItem,
  IconBox,
} from '@/styles/navbar';
import IconButton from '@/components/common/IconButton';
import { Home, Search, Upload, MyProfile } from '@/components/common/SVG';
import { useRouter } from 'next/router';
import { setCookie, parseCookies } from 'nookies';
import { useSelector } from 'react-redux';
import { UserState } from '@/redux/reducers/userSlice';
import { RootState } from '@/redux/config/configStore';
import ProfileImage from './ProfileImage';

type mobileBottomNavProps = {
  onClickEvent: () => void;
};

const BOTTOM_NAV = [
  { icon: Home, text: 'home', route: '/' },
  { icon: Search, text: 'search', route: '/search' },
  { icon: Upload, text: 'upload', route: '/post/Write' },
];

type onClickProps = {
  active: number;
};

const ActiveBar = styled.span<onClickProps>`
  width: calc((100% - 48px) / 4);
  height: 5px;
  border-radius: 4px 4px 0 0;
  position: absolute;
  background-color: #0084ff;
  top: 0;
  left: 24px;
  transform: ${(props) => `translate( ${props.active * 100}%,  -100%)`};
  transition: all 0.3s ease-in-out;
`;

const MobileBottomNav = () => {
  const [active, setActive] = useState<number>(0);
  const { user }: { user: UserState['user'] } = useSelector(
    (state: RootState) => state.user
  );
  const router = useRouter();
  const cookies = parseCookies(null); // 클라이언트 측에서 실행되는 경우 null 사용
  const tabIndexCookie = cookies.tabIndex; // 'myCookie'의 값을 가져옴

  useEffect(() => {
    const tabIndex = Number(tabIndexCookie);
    setActive(tabIndex);
  }, []);

  const onClickNavIconHandler = (idx: number, route: string) => {
    const tabIndex = idx.toString();
    setCookie(null, 'tabIndex', tabIndex, { path: '/' });
    router.push(route);
    setActive(idx);
  };

  return (
    <MobileBottomNavLayout>
      <BottomNavList>
        {BOTTOM_NAV.map((nav, idx) => {
          const { icon: Icon, text } = nav;
          return (
            <BottomNavItem key={idx}>
              <IconBox
                onClick={() => onClickNavIconHandler(idx, nav.route)}
                className={active === idx ? 'active' : ''}
              >
                <Icon />
                <p>{text}</p>
              </IconBox>
            </BottomNavItem>
          );
        })}
        <BottomNavItem>
          <IconBox
            onClick={() => onClickNavIconHandler(3, '/User/User')}
            className={active === 3 ? 'active' : ''}
          >
            <div className="image-box">
              <ProfileImage
                preset={user?.preset || 5}
                userImage={user?.userImage || ''}
                loading="eager"
              />
            </div>
            <p>my</p>
          </IconBox>
        </BottomNavItem>
      </BottomNavList>
      <ActiveBar active={active}></ActiveBar>
    </MobileBottomNavLayout>
  );
};

export default MobileBottomNav;
