import React, { useRef } from 'react';
import styled from 'styled-components';
import { StartPageCloud } from './SVG';
import { identity } from 'lodash';

const HeadText = styled.h1`
  color: #2790f6;
  font-size: 40px;
  font-weight: 900;
  text-align: center;
  margin-top: 12px;
  font-family: 'pretendard';
`;
const GrayText = styled.p`
  color: #989898;
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  line-height: 142.5%;
  margin-top: 100px;
`;
const StartPageSection = styled.section`
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
  position: relative;
  z-index: 99999;
  animation: identifier 1s ease-in-out forwards;
  animation-delay: 2s;
  @keyframes identifier {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const MoveStartpage = () => {
  const noneStartPage = useRef<any>();
  React.useEffect(() => {
    const timer = setTimeout(() => {
      noneStartPage.current.style.display = 'none';
    }, 3500);

    return () => clearTimeout(timer);
  }, []);
  return (
    <StartPageSection ref={noneStartPage}>
      <StartPageCloud />
      <HeadText>HAPOOM</HeadText>
      <GrayText>틈틈이 하늘 보는 습관, 하품</GrayText>
    </StartPageSection>
  );
};

export default MoveStartpage;
