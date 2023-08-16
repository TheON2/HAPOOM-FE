import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

type mainBannerProps = {
  isClick: boolean;
};

const MainBannerContainer = styled.div<mainBannerProps>`
  width: 100%;
  height: ${(props) => (props.isClick ? '250px' : 'calc(100vh - 52px)')};
  transition: all 0.8s ease-in-out;
  position: relative;
  p {
    width: 90%;
    word-wrap: break-word;
    position: absolute;
    bottom: 120px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 20px;
    font-weight: 700;
    line-height: 28px;
    color: #fff;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.8s ease-in-out;
    opacity: ${(props) => (props.isClick ? '0' : '1')};
  }
  @media screen and (min-width: 768px) {
    height: ${(props) => (props.isClick ? '400px' : '100vh')};
    p {
      bottom: 225px;
      max-width: 768px;
      font-size: 28px;
      line-height: 36px;
    }
  }
`;

const MainBanner = ({ data, isClick }: any) => {
  // console.log(isClick);
  return (
    <MainBannerContainer isClick={isClick}>
      <p>
        집에 가고 싶다.
        <br /> 집 떠나면 개고생이다.
      </p>
      <Image
        src={data[0].src}
        alt="v13 image"
        width={786}
        height={800}
        loading="eager"
        quality={100}
      />
    </MainBannerContainer>
  );
};

export default MainBanner;
