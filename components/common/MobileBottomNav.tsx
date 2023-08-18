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
import Modal from './Modal';

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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalMessge, setModalMessge] = useState<any>({
    actionText: '',
    modalMessge: '',
    onClickEvent: '',
  });
  const { user }: { user: UserState['user'] } = useSelector(
    (state: RootState) => state.user
  );
  const router = useRouter();
  const routerHandler = (route: string, text: string) => {
    if (user.email === null && (text === 'upload' || text === 'my')) {
      setModalMessge({
        actionText: '확인',
        modalMessge: '로그인이 필요한 서비스입니다. 로그인 하시겠습니까?',
        onClickEvent: () => router.push('/auth/SignIn'),
      });
      setIsOpen(!isOpen);
    } else {
      router.push(route);
    }
  };
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
  }, [pathIndex, user.email]);

  return (
    <MobileBottomNavLayout>
      <BottomNavList>
        {BOTTOM_NAV.map((nav, idx) => {
          const { icon: Icon, text } = nav;
          return (
            <BottomNavItem key={idx}>
              <IconBox
                onClick={() => routerHandler(nav.route, text)}
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
            onClick={() => routerHandler(`/User/${user.email}`, 'my')}
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
      <ActiveBar $active={active}></ActiveBar>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        actionText={modalMessge.actionText}
        onClickEvent={modalMessge.onClickEvent}
      >
        로그인 후 이용할 수 있는 서비스 입니다.
        <br /> 로그인 하시겠습니까?
      </Modal>
    </MobileBottomNavLayout>
  );
};

export default MobileBottomNav;
