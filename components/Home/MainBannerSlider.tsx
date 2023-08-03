import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { SliderImage } from '@/public/data';
const DEFAULT_INTERVAL = 5 * 1000;
const FAST_INTERVAL = 500;

//TODO: 메인배너 빈번한 크기 조정으로 인한 성능 이슈
const MainBannerLayout = styled.section`
  width: 100%;
  height: 70vh;
  overflow: hidden;
`;

type SliderListProps = {
  $slideindex: number;
  width?: number;
  $sliedsum: number;
};
const SliderList = styled.ul<SliderListProps>`
  width: ${(props) =>
    props.width ? `${props.width * props.$sliedsum}px` : `100%`};
  /* width: auto; */
  /* position: relative; */
  height: 70vh;
  display: flex;
  transform: ${(props) =>
    props.width
      ? `translateX(${props.$slideindex * props.width * -1}px)`
      : 'translateX(0px)'};
  transition: all 0.3s ease-in-out;
  list-style: none;
  /* will-change: transform; */
`;

type SliderItemProps = {
  width?: number;
};

const SliderItem = styled.li<SliderItemProps>`
  width: ${(props) => (props.width ? `${props.width}px` : `100%`)};
  height: 70vh;
  position: relative;
  padding: 50px 160px;
  border: 1px solid #000;
  img {
    object-fit: cover;
  }
  p {
    position: absolute;
    top: 10vh;
    font-size: 3rem;
  }
`;

type Props = {
  data: SliderImage[];
};

const MainBannerSlider: React.FC<Props> = ({ data }) => {
  // console.log(data);
  const copiedArr = [...data];
  const SLIDE_NUM = copiedArr.length;
  const beforeSlide = copiedArr[SLIDE_NUM - 1];
  const afterSlide = copiedArr[0];
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [slideItemWidth, setSlideItemWidth] = useState<number>();
  const [currentInterval, setCurrentInterval] = useState(DEFAULT_INTERVAL);
  const sliedListRef = useRef<HTMLUListElement | null>(null);
  const sliedContainerRef = useRef<HTMLElement | null>(null);

  let sliedArr = [beforeSlide, ...copiedArr, afterSlide];
  //무한 로드 슬라이드
  useEffect(() => {
    const interval = setInterval(
      () => setSlideIndex((prev) => prev + 1),
      currentInterval
    );
    return () => clearInterval(interval);
  }, [currentInterval]);

  useEffect(() => {
    if (slideIndex === sliedArr.length - 1) {
      setCurrentInterval(FAST_INTERVAL); // 복제된 슬라이드에서 일반 슬라이드로 넘어갈 때 인터벌을 더 길게 설정
    } else {
      setCurrentInterval(DEFAULT_INTERVAL);
    }
  }, [slideIndex]);

  useEffect(() => {
    if (slideIndex === sliedArr.length) {
      if (sliedListRef.current) {
        sliedListRef.current.style.transition = 'none';
      }
      setSlideIndex(1);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (sliedListRef.current) {
            sliedListRef.current.style.transition = 'all 0.3s ease-in-out';
          }
        });
      });
    }
  }, [slideIndex]);

  //리사이징 이벤트
  useEffect(() => {
    const handleResize = () => {
      if (sliedContainerRef.current) {
        const width = sliedContainerRef.current.clientWidth;
        setSlideItemWidth(width);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <MainBannerLayout ref={sliedContainerRef}>
      <SliderList
        ref={sliedListRef}
        $slideindex={slideIndex}
        $sliedsum={sliedArr.length}
        width={slideItemWidth && slideItemWidth}
      >
        {sliedArr.map((slide, index) => {
          // console.log(slide);
          return (
            <SliderItem key={index} width={slideItemWidth && slideItemWidth}>
              <Image
                src={slide.src}
                alt="v13 image"
                fill
                loading="eager"
                sizes="(max-width: 1440px) 100vw"
                // priority="high"
                placeholder="blur"
                blurDataURL={slide.src}
              />
              <p>{slide.alt}</p>
            </SliderItem>
          );
        })}
      </SliderList>
    </MainBannerLayout>
  );
};

export default MainBannerSlider;
