import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { MainBannerLayout, SliderItem, SliderList, SlideDotBox } from '@/styles/home';
import { SliderImage } from '@/public/data';
import styled from 'styled-components';
//TODO: 메인배너 빈번한 크기 조정으로 인한 성능 이슈
const DEFAULT_INTERVAL = 5 * 1000;
const FAST_INTERVAL = 100;

type Props = {
  data: any;
};

const MainBannerSlider: React.FC<Props> = ({ data }) => {
  const copiedArr = [...data];
  const SLIDE_NUM = copiedArr.length;
  const beforeSlide = copiedArr[SLIDE_NUM - 1];
  const afterSlide = copiedArr[0];
  const [slideIndex, setSlideIndex] = useState<number>(1);
  const [slideItemWidth, setSlideItemWidth] = useState<number>();
  const [currentInterval, setCurrentInterval] = useState(DEFAULT_INTERVAL);
  const sliedListRef = useRef<HTMLUListElement | null>(null);
  const sliedContainerRef = useRef<HTMLElement | null>(null);
  // console.log(slideIndex);
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

  const onClickSlideDotHandle = (idx: number) => {
    setSlideIndex(idx);
  };

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
                placeholder="blur"
                blurDataURL={slide.src}
              />
              <p>{slide.alt}</p>
            </SliderItem>
          );
        })}
      </SliderList>
      <SlideDotBox>
      {copiedArr.map((slide, index) => {
          return (
            <span
            onClick={() => onClickSlideDotHandle(index +1)}
            className={slideIndex === index +1 ? `active` : ``}
            key={index}
          ></span>
          );
        })}
      </SlideDotBox>
    </MainBannerLayout>
  );
};

export default MainBannerSlider;
