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
  $active: number;
};

const ActiveBar = styled.span<onClickProps>`
  width: calc((100% - 48px) / 4);
  height: 5px;
  border-radius: 0 0 4px 4px;
  position: absolute;
  /* background-color: #0084ff; */
  top: 0;
  left: 24px;
  transform: ${(props) => `translate( ${props.$active * 100}%,  0)`};
  transition: all 0.3s ease-in-out;
  &::after {
    content: '';
    display: block;
    width: 40px;
    height: 5px;
    margin: auto;
    border-radius: 0 0 4px 4px;
    background-color: #0084ff;
  }
`;
const IconLink = styled(Link)`
  display: block;
  /* width: 24px; */
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 10px;
  border: none;
  background: none;
  color: #777;
  font-weight: 700;
  line-height: 1.2;
  path {
    stroke: #777;
  }
  svg {
    width: 24px;
    height: 24px;
  }
  .image-box {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 2px solid #777;
    overflow: hidden;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &.active {
    color: #0084ff;
    path {
      stroke: #0084ff;
    }
    .image-box {
      border: 2px solid #0084ff;
    }
  }
`;

const MobileBottomNav = () => {
  const [active, setActive] = useState<number>(0);
  const [pathIndex, setPathIndex] = useState<string>('');
  const { user }: { user: UserState['user'] } = useSelector(
    (state: RootState) => state.user
  );
  const router = useRouter();
  const cookies = parseCookies(null); // 클라이언트 측에서 실행되는 경우 null 사용
  const tabIndexCookie = cookies.tabIndex; // 'myCookie'의 값을 가져옴
  const { id } = router.query;

  useEffect(() => {
    const currentPathname = window.location.pathname;
    setPathIndex(currentPathname);
    // console.log(currentPathname);
  }, [router.pathname]);

  useEffect(() => {
    switch (pathIndex) {
      case '/':
        setActive(0);
        break;
      case '/search':
        setActive(1);
        break;
      case '/post/Write':
        setActive(2);
        break;
      case `/User/${user.email}`:
        setActive(3);
        break;
      default:
        setActive(0);
        break;
    }
  }, [pathIndex, active]);

  const onClickNavIconHandler = (idx: number, route: string) => {
    // const tabIndex = idx.toString();
    // setCookie(null, 'tabIndex', tabIndex, { path: '/' });
    router.push(route);
    // setActive(idx);
  };

  // console.log(router.pathname);
  // console.log(id);
  // console.log(`/User/${user.email}`);

  return (
    <MobileBottomNavLayout>
      <BottomNavList>
        {BOTTOM_NAV.map((nav, idx) => {
          const { icon: Icon, text } = nav;
          return (
            <BottomNavItem key={idx}>
              <IconLink
                href={nav.route}
                className={active === idx ? 'active' : ''}
              >
                <Icon />
                <p>{text}</p>
              </IconLink>
            </BottomNavItem>
          );
        })}
        <BottomNavItem>
          <IconLink
            href={`/User/${user.email}`}
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
          </IconLink>
        </BottomNavItem>
      </BottomNavList>
      <ActiveBar $active={active}></ActiveBar>
    </MobileBottomNavLayout>
  );
};

export default MobileBottomNav;
