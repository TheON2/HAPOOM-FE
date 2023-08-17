import React, { useState } from 'react';
import styled from 'styled-components';
import Image, { StaticImageData } from 'next/image';

const AccordionWrapper = styled.div`
  margin: 20px 0; // 아코디언 간의 세로 간격 조정
`;

const AccordionButton = styled.button`
  background-color: #f1f1f1;
  cursor: pointer;
  width: 100%;
  text-align: left;
  border: none;
  outline: none;
  transition: 0.4s;
  display: flex;
  align-items: center; // Image를 중앙에 배치
  &:hover,
  &.active {
    background-color: #ccc;
  }
`;

type PanelProps = {
  open: boolean;
};

const Panel = styled.div<PanelProps>`
  padding: 0 18px;
  height: ${(props) => (props.open ? '450px' : '0')};
  overflow: hidden;
  background-color: #f9f9f9;
  transition: height 0.4s;
`;

type AccordionProps = {
  image?: StaticImageData;
  selected: boolean;
  onClick: () => void;
  children?: React.ReactNode;
};

const Accordion: React.FC<AccordionProps> = ({
  image,
  children,
  selected,
  onClick,
}) => {
  return (
    <AccordionWrapper>
      <AccordionButton
        onClick={onClick}
        type="button"
        className={selected ? 'active' : ''}
      >
        {image && <Image src={image} width={400} height={150} alt="icon" />}
      </AccordionButton>
      <Panel open={selected}>{children}</Panel>
    </AccordionWrapper>
  );
};
export default Accordion;
