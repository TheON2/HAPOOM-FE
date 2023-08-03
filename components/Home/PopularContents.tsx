import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ImageContent from '@/components/Home/ImageContent';
import { SliderImage } from '@/public/data';

const SectionTitle = styled.h2`
  max-width: 1200px;
  margin: 0 auto 30px;
`;

const PopularContentsLayout = styled.section`
  width: 100%;
  /* height: 50vh; */
  padding: 50px 100px;
  background-color: #efefef;
  position: relative;
`;

type SliderContainerProps = {
  $slideitemwidth?: number;
};

const ProularContentContainer = styled.div<SliderContainerProps>`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  overflow: hidden;
  /* @media screen and (max-width: 1260px) {
    width: ${(props) =>
    props.$slideitemwidth ? `${(props.$slideitemwidth + 12) * 3}px` : '100vw'};
  }
  @media screen and (max-width: 768px) {
    width: ${(props) =>
    props.$slideitemwidth ? `${(props.$slideitemwidth + 12) * 2}px` : '100vw'};
  } */
`;

type SliderListProps = {
  $slideindex: number;
  $slideListWidth?: number;
  $slideitemwidth?: number;
};

const PopularContentsList = styled.ul<SliderListProps>`
  width: ${(props) =>
    props.$slideListWidth ? `${props.$slideListWidth}px` : `3000px`};
  /* height: 300px; */
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  list-style: none;
  gap: 16px;

  transform: ${(props) =>
    props.$slideitemwidth
      ? `translateX(${props.$slideindex * (props.$slideitemwidth + 4) * -1}px)`
      : 'translateX(0px)'};
  transition: all 0.3s ease-in-out;
  /* @media screen and (max-width: 1200px) {
    width: 2580px;
  } */
`;

type SliderProps = {
  $slideItemWidth?: number;
};

const PopularContentItem = styled.li<SliderProps>`
  width: ${(props) =>
    props.$slideItemWidth ? `${props.$slideItemWidth - 12}px` : `25px`};
  /* margin-right: 16px; */
`;

const SlideButtonBox = styled.div`
  width: 100%;
  padding: 0 50px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 50%;
  left: 0;
`;

type Props = {
  data: SliderImage[];
};

const PopularContents: React.FC<Props> = ({ data }) => {
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const sliedRef = useRef<HTMLUListElement | null>(null);
  const slideRef = useRef<HTMLDivElement | null>(null);
  const [slideWidth, setSlideWidth] = useState<number>();
  const [slideListWidth, setSlideListWidth] = useState<number>();
  const [showContentsNum, setShowContentsNum] = useState<number>(4);
  // const SHOW_CONTENTS_NUM = 4;
  // console.log(slideIndex);
  // console.log(data.length);
  // console.log(data.length);

  const onClickSlideButtonHandler = (num: number) => {
    if (slideIndex + num < 0) {
      setSlideIndex(0);
    } else if (slideIndex + num >= data.length - showContentsNum) {
      setSlideIndex(data.length - showContentsNum);
    } else {
      setSlideIndex(slideIndex + num);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      showContentNumHandler();
      if (slideRef.current) {
        const width = slideRef.current.clientWidth / showContentsNum;
        const ListWidth = width * 10;
        setSlideListWidth(ListWidth);
        setSlideWidth(width);
      }
    };
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

  // console.log(window.innerWidth);
  // useEffect(() => {
  //   if (window.innerWidth <= 768) {
  //     setShowContentsNum(2);
  //   } else if (window.innerWidth <= 1260) {
  //     setShowContentsNum(3);
  //   }
  // }, []);

  // console.log(showContentsNum);
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
                <ImageContent src={content.src} alt={content.alt} />
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
