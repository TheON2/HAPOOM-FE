import Image from 'next/image';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MainBannerLayout, SlideDotBox, SliderItem, SliderList } from '@/styles/home';
import { BannerSliderProps } from '@/types/home';
import { debounce } from 'lodash';
import useSwipe from '@/hooks/useSwipe';
import ZoomImage from '../Detail/ZoomImage';

const DEFAULT_INTERVAL = 10 * 1000;
const FAST_INTERVAL = 500;

type Props = {
  data: BannerSliderProps[];
  zoomImageHandler: (imageUrl: string) => void;
};

const InfiniteCarousel: React.FC<Props> = ({ data, zoomImageHandler }) => {
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
  const [slideUrl, setSlideUrl] = useState<string>();
  const onClickSaveImageUrlHandler = (url: string) => {
    setSlideUrl(url);
  };
  const leftAction = () => {
    setSlideIndex((prevActive) =>
      prevActive >= sliedArr.length - 1 ? sliedArr.length - 1 : prevActive + 1
    );
  };

  const rightAction = () => {
    setSlideIndex((prevActive) => (prevActive <= 0 ? 0 : prevActive - 1));
  };
  const onClickEventAction = () => {
    if (slideUrl) {
      zoomImageHandler(slideUrl);
    }
  };
  const {
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleWheel,
  } = useSwipe(leftAction, rightAction, onClickEventAction);
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
    <>
      <MainBannerLayout
        ref={sliedContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
      >
        <SliderList
          ref={sliedListRef}
          $slideindex={slideIndex}
          $sliedsum={sliedArr.length}
          width={slideItemWidth && slideItemWidth}
        >
          {sliedArr.map((slide, index) => {
            return (
              <SliderItem
                key={index}
                width={slideItemWidth && slideItemWidth}
                onClick={() => onClickSaveImageUrlHandler(slide?.url)}
              >
                <Image
                  src={slide?.url}
                  alt="detail images"
                  width={768}
                  height={800}
                  loading="eager"
                  priority={true}
                  draggable="false"
                />
              </SliderItem>
            );
          })}
        </SliderList>
      </MainBannerLayout>
      {/* <SlideArrowBox>
        <span>
          <SlideArrow />
        </span>
        <span className="right">
          <SlideArrow />
        </span>
      </SlideArrowBox> */}
      <SlideDotBox>
        {/* <SlideSum>
          <Images />+{copiedArr.length}
        </SlideSum> */}
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
    </>
  );
};

const DetailImageViewBox = ({ data }: any) => {
  // const [isOpen, setIsOpen] = useState<boolean>(false);
  const [zoomedImageUrl, setZoomedImageUrl] = useState<string | null>(null);
  const zoomImageHandler = (imageUrl: string) => {
    setZoomedImageUrl(imageUrl);
  };
  const closeZoomImage = () => {
    setZoomedImageUrl(null);
  };
  return (
    <>
      {data.length === 1 ? (
        <MainBannerLayout onClick={() => zoomImageHandler(data[0]?.url)}>
          <Image
            src={data[0]?.url}
            alt="detail image"
            width={768}
            height={800}
            loading="eager"
            priority={true}
            className="sigle-image"
          />
        </MainBannerLayout>
      ) : (
        <InfiniteCarousel data={data} zoomImageHandler={zoomImageHandler} />
      )}
      {zoomedImageUrl && (
        <ZoomImage imageUrl={zoomedImageUrl} closeZoomImage={closeZoomImage} />
      )}
    </>
  );
};
export default DetailImageViewBox;
