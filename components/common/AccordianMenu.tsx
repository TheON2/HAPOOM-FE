import React, { ReactNode, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { Line } from '@/styles/signUp';

type accordianProps = {
  isOpen?: boolean;
};

const AccordianLayout = styled.div`
  width: 100%;
  margin-bottom: 32px;
`;

export const AccordianTab = styled.button<accordianProps>`
  width: 100%;
  padding: 20px 0 16px;
  color: ${(props) => (props.isOpen ? '#000' : '#8995A7')};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: none;
  border: none;
  font-weight: 700;
`;

const Icon = () => {
  return (
    <Image src={'/🦆 icon _cloud_.svg'} alt={'icon'} width={20} height={20} />
  );
};

type DroptabProps = {
  tabText: string;
  children: ReactNode;
  hideLine?: boolean;
};

const AccordianMenu = ({ tabText, children }: DroptabProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClickDropTabHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <AccordianLayout>
        <AccordianTab onClick={onClickDropTabHandler} isOpen={isOpen}>
          {tabText} <Icon />
        </AccordianTab>
        {isOpen ? children : null}
      </AccordianLayout>
      {isOpen ? (
        <Line
          width={'327px'}
          borderColor={'#A9A9A9'}
          style={{ display: 'none' }}
        ></Line>
      ) : (
        <Line
          width={'327px'}
          borderColor={'#A9A9A9'}
          style={{ marginTop: '-20px' }}
        ></Line>
      )}
    </>
  );
};

export default AccordianMenu;
