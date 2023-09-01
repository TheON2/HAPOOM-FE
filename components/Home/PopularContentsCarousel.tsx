import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { ButtonBox, CarouselHeader, SectionTitle } from '@/styles/home';
import ImageContent from './ImageContent';
import useSwipe from '@/hooks/useSwipe';
import {
  CarouselProps,
  ImageContentProps,
  populerCarouselProps,
} from '@/types/home';
import {
  HomeMainSection,
  PopularContentsContainer,
  CarouselStyle,
  CardContainer,
} from '@/styles/home';
import { ArrowLong } from '../common/SVG';

const Carousel: React.FC<CarouselProps> = ({ children, $active }) => {
  return (
    <CarouselStyle>
      {React.Children.map(children, (child, idx) => (
        <CardContainer key={idx} $active={$active} $i={idx}>
          {child}
        </CardContainer>
      ))}
    </CarouselStyle>
  );
};

const PopularContentsCarousel: React.FC<populerCarouselProps> = ({ data }) => {
  const [active, setActive] = useState<number>(0);
  const leftAction = () => {
    setActive((prevActive) =>
      prevActive >= data.length - 1 ? data.length - 1 : prevActive + 1
    );
  };

  const rightAction = () => {
    setActive((prevActive) => (prevActive <= 0 ? 0 : prevActive - 1));
  };
  const onClickArrowHandler = (direction: number) => {
    if (direction === -1 && active <= 0) {
      return;
    }
    if (direction === 1 && active >= data.length - 1) {
      return;
    }
    setActive((prevActive) => prevActive + direction);
  };
  const {
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleWheel,
  } = useSwipe(leftAction, rightAction);
  return (
    <HomeMainSection>
      <div className="center">
        <CarouselHeader>
          <SectionTitle>#오늘의 좋아요</SectionTitle>
          <ButtonBox>
            <button className="left" onClick={() => onClickArrowHandler(-1)}>
              <ArrowLong />
            </button>
            <button onClick={() => onClickArrowHandler(+1)}>
              <ArrowLong />
            </button>
          </ButtonBox>
        </CarouselHeader>
        <PopularContentsContainer
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
        >
          <Carousel $active={active}>
            {data.map((item: ImageContentProps, idx: number) => (
              <ImageContent
                key={idx}
                src={item.image}
                alt={'popular content image'}
                postId={item.postId}
              />
            ))}
          </Carousel>
        </PopularContentsContainer>
      </div>
    </HomeMainSection>
  );
};

export default PopularContentsCarousel;
