import Image from 'next/image';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  MainBannerLayout,
  SliderItem,
  SliderList,
  SlideDotBox,
} from '@/styles/home';
import { debounce } from 'lodash';
//TODO: 메인배너 빈번한 크기 조정으로 인한 성능 이슈
import styled from 'styled-components';
const DEFAULT_INTERVAL = 5 * 1000;
const FAST_INTERVAL = 100;

type Props = {
  data: any;
};

const BackgroundGradient = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    180deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(0, 212, 255, 0) 100%
  );
  opacity: 0.3;
`;

const MainBannerSlider: React.FC<Props> = ({ data }) => {
  const copiedArr: [any] = data;
  const SLIDE_NUM = copiedArr.length;
  const beforeSlide = copiedArr[SLIDE_NUM - 1];
  const afterSlide = copiedArr[0];
  const [slideIndex, setSlideIndex] = useState<number>(1);
  const [slideItemWidth, setSlideItemWidth] = useState<number>();
  const [currentInterval, setCurrentInterval] =
    useState<number>(DEFAULT_INTERVAL);
  const sliedListRef = useRef<HTMLUListElement>(null);
  const sliedContainerRef = useRef<HTMLElement>(null);
  // console.log(slideIndex);
  const sliedArr = useMemo(
    () => [beforeSlide, ...copiedArr, afterSlide],
    [beforeSlide, copiedArr, afterSlide]
  );

  // let sliedArr = [beforeSlide, ...copiedArr, afterSlide];
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
  }, [slideIndex, sliedArr.length]);

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
  }, [slideIndex, sliedArr.length]);

  const handleResize = useCallback(() => {
    if (sliedContainerRef.current) {
      const width = sliedContainerRef.current.clientWidth;
      setSlideItemWidth(width);
    }
    console.log('debounced');
  }, [sliedContainerRef.current]);

  //리사이징 이벤트
  useEffect(() => {
    // handleResize();
    const debouncedResize = debounce(handleResize, 500);
    window.addEventListener('resize', debouncedResize);

    return () => window.removeEventListener('resize', debouncedResize);
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
          return (
            <SliderItem key={index} width={slideItemWidth && slideItemWidth}>
              <Image
                src={slide.src}
                alt="v13 image"
                fill
                loading="eager"
                sizes="(max-width: 1440px) 1440px"
                placeholder="blur"
                blurDataURL={slide.src}
              />
              <BackgroundGradient></BackgroundGradient>
              <p>{slide.alt}</p>
            </SliderItem>
          );
        })}
      </SliderList>
      <SlideDotBox>
        {copiedArr.map((slide, index) => {
          return (
            <span
              onClick={() => onClickSlideDotHandle(index + 1)}
              className={slideIndex === index + 1 ? `active` : ``}
              key={index}
            ></span>
          );
        })}
      </SlideDotBox>
    </MainBannerLayout>
  );
};

export default MainBannerSlider;
