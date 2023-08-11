import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { RightArrow } from '@/components/common/SVG';

const NavbarTab = styled(Link)`
  width: 100%;
  padding: 20px 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.5);
  path {
    fill: rgba(0, 0, 0, 0.5);
  }
  &:hover {
    color: rgba(0, 0, 0, 0.7);
    path {
      fill: rgba(0, 0, 0, 0.7);
    }
  }
  &:active {
    color: #000;
    path {
      fill: #000;
    }
  }
`;

type tabBarProps = {
  children: ReactNode;
  router: string;
};

const TabBarLink: React.FC<tabBarProps> = ({ children, router }) => {
  return (
    <NavbarTab href={router}>
      {children}
      <RightArrow />
    </NavbarTab>
  );
};

export default TabBarLink;
