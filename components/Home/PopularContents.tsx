import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ImageContent from '@/components/Home/ImageContent';
import { SliderImage } from '@/public/data';
import {
  SectionTitle,
  PopularContentsLayout,
  ProularContentContainer,
  PopularContentsList,
  PopularContentItem,
  SlideButtonBox,
} from '@/styles/home';
import { debounce } from 'lodash';

type Props = {
  data: Post[];
};
interface Post {
  id: number;
  content: string;
  musicTitle: string;
  musicUrl: string;
  tag: string;
  placeName: string;
  latitude: number;
  longitude: number;
  private: boolean;
  createdAt: string;
  updatedAt: string;
  userId: number;
  image: {
    url: string;
  };
}

const PopularContents: React.FC<Props> = ({ data }) => {
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const sliedRef = useRef<HTMLUListElement | null>(null);
  const slideRef = useRef<HTMLDivElement | null>(null);
  const [slideWidth, setSlideWidth] = useState<number>();
  const [slideListWidth, setSlideListWidth] = useState<number>();
  const [showContentsNum, setShowContentsNum] = useState<number>(4);

  const onClickSlideButtonHandler = (num: number) => {
    if (slideIndex + num < 0) {
      setSlideIndex(0);
    } else if (slideIndex + num >= data.length - showContentsNum) {
      setSlideIndex(data.length - showContentsNum);
    } else {
      setSlideIndex(slideIndex + num);
    }
  };
  const handleResize = () => {
    showContentNumHandler();
    if (slideRef.current) {
      const width = slideRef.current.clientWidth / showContentsNum;
      const ListWidth = width * 10;
      setSlideListWidth(ListWidth);
      setSlideWidth(width);
    }
  };
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [showContentsNum]);

  const showContentNumHandler = () => {
    if (window.innerWidth <= 768) {
      setShowContentsNum(2);
    } else if (window.innerWidth <= 1260) {
      setShowContentsNum(3);
    } else {
      setShowContentsNum(4);
    }
  };

  return (
    <PopularContentsLayout>
      <SectionTitle>#인기있는 사진</SectionTitle>
      <ProularContentContainer $slideitemwidth={slideWidth && slideWidth}>
        <div style={{ width: `100%` }} ref={slideRef}></div>
        <PopularContentsList
          $slideindex={slideIndex}
          $slideitemwidth={slideWidth && slideWidth}
          $slideListWidth={slideListWidth && slideListWidth}
          ref={sliedRef}
        >
          {data.map((content, index) => {
            return (
              <PopularContentItem
                key={index}
                $slideItemWidth={slideWidth && slideWidth}
              >
                <ImageContent src={content.image.url} alt={'img'} />
              </PopularContentItem>
            );
          })}
        </PopularContentsList>
      </ProularContentContainer>
      <SlideButtonBox>
        {slideIndex !== 0 ? (
          <button onClick={() => onClickSlideButtonHandler(-1)}>앞으로</button>
        ) : (
          <span></span>
        )}
        {slideIndex !== data.length - showContentsNum ? (
          <button onClick={() => onClickSlideButtonHandler(+1)}>뒤로</button>
        ) : (
          <span></span>
        )}
      </SlideButtonBox>
    </PopularContentsLayout>
  );
};

export default PopularContents;
