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
import { BannerSliderProps } from '@/types/home';
import { debounce } from 'lodash';

const DEFAULT_INTERVAL = 5 * 1000;
const FAST_INTERVAL = 100;

type Props = {
  data: BannerSliderProps[];
};

const InfiniteCarousel: React.FC<Props> = ({ data }) => {
  const copiedArr: BannerSliderProps[] = data;
  const SLIDE_NUM = copiedArr.length;
  const beforeSlide = copiedArr[SLIDE_NUM - 1];
  const afterSlide = copiedArr[0];
  const [slideIndex, setSlideIndex] = useState<number>(1);
  const [slideItemWidth, setSlideItemWidth] = useState<number>();
  const [currentInterval, setCurrentInterval] =
    useState<number>(DEFAULT_INTERVAL);
  const sliedListRef = useRef<HTMLUListElement>(null);
  const sliedContainerRef = useRef<HTMLDivElement>(null);
  const sliedArr = useMemo(
    () => [beforeSlide, ...copiedArr, afterSlide],
    [beforeSlide, copiedArr, afterSlide]
  );

  // 무한 로드 슬라이드
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
    // console.log('debounced');
  }, []);
  //리사이징 이벤트
  useEffect(() => {
    handleResize();
    const debouncedResize = debounce(handleResize, 500);
    window.addEventListener('resize', debouncedResize);

    return () => window.removeEventListener('resize', debouncedResize);
  }, [handleResize]);

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
                src={slide?.url}
                alt="v13 image"
                width={768}
                height={800}
                loading="eager"
                priority={true}
              />
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

export default InfiniteCarousel;
