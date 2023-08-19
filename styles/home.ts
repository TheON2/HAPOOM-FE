import styled from 'styled-components';

// main banner style
export const MainBannerLayout = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

type SliderListProps = {
  $slideindex: number;
  width?: number;
  $sliedsum: number;
};

export const SliderList = styled.ul<SliderListProps>`
  width: ${(props) =>
    props.width ? `${props.width * props.$sliedsum}px` : `500vw`};
  height: 100%;
  display: flex;
  transform: ${(props) =>
    props.width
      ? `translateX(${props.$slideindex * props.width * -1}px)`
      : `translateX(${props.$slideindex * 100 * -1}vw)`};
  transition: all 0.3s ease-in-out;
  list-style: none;
`;

type SliderItemProps = {
  width?: number;
};

export const SliderItem = styled.li<SliderItemProps>`
  width: ${(props) => (props.width ? `${props.width}px` : `100vw`)};
  height: 100%;
  position: relative;
  /* padding: 50px 100px; */
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  p {
    position: absolute;
    width: 50%;
    word-wrap: break-word;
    bottom: 24px;
    left: 24px;
    font-size: 20px;
    line-height: 30px;
    color: #fff;
  }
`;

export const SlideDotBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 24px;
  gap: 4px;
  position: absolute;
  bottom: 12px;
  span {
    display: block;
    width: 8px;
    height: 8px;
    background-color: #fff;
    border-radius: 4px;
    cursor: pointer;
    &.active {
      background-color: #0084ff;
    }
  }
`;

//------hashtag contents styles--------

export const HashtagContentsLayout = styled.section`
  width: 100%;
  /* padding: 50px 100px; */
  @media screen and (max-width: 786px) {
    /* padding: 20px 24px; */
  }
`;

export const HashtagContentsContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  place-items: center;
  justify-content: center;
  align-items: center;
  grid-gap: 4px;
  @media screen and (max-width: 1260px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 1fr);
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(6, 1fr);
  }
`;

//popular contents section style
export const SectionTitle = styled.h2`
  max-width: 768px;
  padding: 26px 36px 24px;
  color: #0084ff;
  position: relative;
  &::after {
    content: '';
    display: block;
    width: 5px;
    height: 20px;
    position: absolute;
    top: 50%;
    left: 24px;
    transform: translateY(-50%);
    background-color: #0084ff;
  }
  @media screen and (min-width: 786px) {
    padding: 26px 16px 24px;
    &::after {
      left: 0;
    }
  }
  /* margin: 0 auto 30px; */
`;

export const PopularContentsLayout = styled.section`
  width: 100%;
  /* padding: 50px 100px; */
  position: relative;
  @media screen and (max-width: 786px) {
    padding: 20px 0;
  }
`;

type SliderContainerProps = {
  $slideitemwidth?: number;
};

export const ProularContentContainer = styled.div<SliderContainerProps>`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  overflow: hidden;
`;

type PropularSliderListProps = {
  $slideindex: number;
  $slideListWidth?: number;
  $slideitemwidth?: number;
};

export const PopularContentsList = styled.ul<PropularSliderListProps>`
  width: ${(props) =>
    props.$slideListWidth ? `${props.$slideListWidth}px` : `3000px`};
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  list-style: none;
  gap: 16px;

  transform: ${(props) =>
    props.$slideitemwidth
      ? `translateX(${props.$slideindex * (props.$slideitemwidth + 4) * -1}px)`
      : 'translateX(0px)'};
  transition: all 0.3s ease-in-out;
`;

type SliderProps = {
  $slideItemWidth?: number;
};

export const PopularContentItem = styled.li<SliderProps>`
  width: ${(props) =>
    props.$slideItemWidth ? `${props.$slideItemWidth - 12}px` : `25px`};
`;

export const SlideButtonBox = styled.div`
  width: 100%;
  padding: 0 50px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 50%;
  left: 0;
  @media screen and (max-width: 786px) {
    top: 100%;
  }
`;

type hashtagNavbarProps = {
  $isClick: boolean;
};

//hashtag navbar style
export const HashtagNavBarLayout = styled.nav<hashtagNavbarProps>`
  width: 100%;
  border-radius: 30px 30px 0 0;
  transform: translateY(-95%);
  position: relative;
  z-index: 10;
  font-size: 10px;
  color: #fff;
  overflow: hidden;
  .background {
    width: 100%;
    padding: 0px 24px 20px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.22) 80%,
      #fff 90%,
      #fff 95%,
      rgba(255, 255, 255, 0.1) 100%
    );
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  @media screen and (min-width: 768px) {
    transform: translateY(-100%);
    .background {
      width: 100%;
      padding: 0px 24px 35px;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.22) 80%,
        #fff 90%,
        #fff 95%,
        rgba(255, 255, 255, 0.1) 100%
      );
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
`;

export const HashtagList = styled.ul`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 12px;
  list-style: none;

  /* @media screen and (max-width: 786px) {
    gap: 2%;
  } */
`;

export const HashtagItem = styled.li`
  /* width: 100px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 9px;
  /* text-align: center; */
  cursor: pointer;
  figure {
    position: relative;
    width: 100px;
    height: 100px;
    margin-bottom: 2px;
    overflow: hidden;
    border-radius: 8px;
    width: 44px;
    height: 44px;
    /* border: 2px solid #fff; */
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  @media screen and (min-width: 768px) {
    font-size: 12px;
    font-weight: 500;
    figure {
      width: 120px;
      height: 100px;
    }
  }
`;
