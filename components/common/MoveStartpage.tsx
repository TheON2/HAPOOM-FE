import React from 'react';
import { styled } from 'styled-components';
import { StartPageCloud } from './SVG';

const HeadText = styled.h1`
  color: #2d74ff;
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  margin-top: 12px;
`;
const GrayText = styled.p`
  color: #989898;
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  line-height: 142.5%;
  margin-top: 100px;
`;
const StartPageSection = styled.p`
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MoveStartpage = () => {
  return (
    <StartPageSection>
      <StartPageCloud />
      <HeadText>HAPOOM</HeadText>
      <GrayText>틈틈이 하늘 보는 습관, 하품</GrayText>
    </StartPageSection>
  );
};

export default MoveStartpage;
