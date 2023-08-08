import React, { ReactNode, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

type accordianProps = {
  isOpen: boolean;
};

const AccordianLayout = styled.div`
  width: 100%;
`;

const AccordianTab = styled.div<accordianProps>`
  width: 100%;
  padding: 20px 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: ${(props) =>
    props.isOpen ? '1px solid rgba(255, 255, 255, 0);' : '1px solid #333'};
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

export default AccordianMenu;
