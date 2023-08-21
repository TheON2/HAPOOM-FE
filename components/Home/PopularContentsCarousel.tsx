import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { SectionTitle } from '@/styles/home';
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

  const {
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useSwipe(leftAction, rightAction);
  return (
    <HomeMainSection>
      <div className="center">
        <SectionTitle>#오늘의 좋아요</SectionTitle>
        <PopularContentsContainer
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
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
