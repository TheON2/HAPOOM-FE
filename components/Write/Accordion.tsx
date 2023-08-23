import React, { useState } from 'react';
import styled from 'styled-components';
import Image, { StaticImageData } from 'next/image';

const AccordionWrapper = styled.div`
  margin: 20px 0; // 아코디언 간의 세로 간격 조정
`;

const AccordionButton = styled.button`
  background-color: #333;
  padding: 12px 0 8px;
  cursor: pointer;
  width: 100%;
  //text-align: left;
  border-radius: 5px;
  border: none;
  outline: none;
  transition: 0.4s;
  //display: flex;
  align-items: center; // Image를 중앙에 배치
  background-color: #ccc;

  &:hover,
  &.active {
    &.youtube {
      background-color: #ed1f23;
    }
    &.music {
      background-color: #2797ff;
    }
    &.record {
      background-color: #52acff;
    }
  }
  img {
    width: 30%;
    object-fit: contain;
  }
`;

type PanelProps = {
  open: boolean;
};

const Panel = styled.div<PanelProps>`
  padding: 0 0 12px;
  height: ${(props) => (props.open ? '260px' : '0')};
  overflow-y: scroll;
  position: relative;
  /* background-color: #f9f9f9; */
  transition: height 0.4s;
`;

type AccordionProps = {
  image?: StaticImageData;
  bgClass: string;
  selected: boolean;
  onClick: () => void;
  children?: React.ReactNode;
};

const Accordion: React.FC<AccordionProps> = ({
  image,
  bgClass,
  children,
  selected,
  onClick,
}) => {
  return (
    <AccordionWrapper>
      <AccordionButton
        onClick={onClick}
        type="button"
        className={selected ? `active ${bgClass}` : `${bgClass}`}
      >
        {image && <Image src={image} width={400} height={150} alt="icon" />}
      </AccordionButton>
      <Panel open={selected}>{children}</Panel>
    </AccordionWrapper>
  );
};
export default Accordion;
