import styled from 'styled-components';

// main banner style
export const MainBannerLayout = styled.section`
  width: 100%;
  overflow: hidden;
`;

type SliderListProps = {
  $slideindex: number;
  width?: number;
  $sliedsum: number;
};

export const SliderList = styled.ul<SliderListProps>`
  width: ${(props) =>
    props.width ? `${props.width * props.$sliedsum}px` : `500vw`};
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
  height: 70vh;
  position: relative;
  padding: 50px 100px;
  border: 1px solid #000;
  img {
    object-fit: cover;
  }
  p {
    position: absolute;
    font-size: 3rem;
    color: #fff;
  }
  @media screen and (max-width: 786px) {
    height: 40vh;
    padding: 100px 30px;
  }
`;

export const SlideDotBox = styled.div`
  width: 100%;
  height: 10px;
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 20px 0;
  span {
    display: block;
    width: 20px;
    height: 20px;
    background-color: gray;
    cursor: pointer;
    &.active {
      background-color: #000;
    }
  }
`;

//------hashtag contents styles--------

export const HashtagContentsLayout = styled.section`
  width: 100%;
  padding: 50px 100px;
  @media screen and (max-width: 786px) {
    padding: 20px 30px;
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
  grid-gap: 16px;
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
  max-width: 1200px;
  margin: 0 auto 30px;
`;

export const PopularContentsLayout = styled.section`
  width: 100%;
  padding: 50px 100px;
  position: relative;
  @media screen and (max-width: 786px) {
    padding: 20px 30px;
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

//hashtag navbar style
export const HashtagNavBarLayout = styled.nav`
  width: 100%;
  height: 200px;
  /* padding: 54px 0; */
  /* height: 10vh; */
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 54px;
  position: sticky;
  top: 10vh;
  z-index: 10;
`;

export const HashtagList = styled.ul`
  /* width: 100%; */
  display: flex;
  justify-content: center;
  gap: 46px;
  /* background: #fff; */
  list-style: none;
  @media screen and (max-width: 786px) {
    gap: 2%;
  }
`;

export const HashtagItem = styled.li`
  /* width: 100px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  /* text-align: center; */
  button {
    border: none;
    background: none;
    cursor: pointer;
  }
  figure {
    position: relative;
    width: 100px;
    height: 100px;
    margin-bottom: 12px;
    overflow: hidden;
    border-radius: 8px;
    border: 2px solid #fff;
    @media screen and (max-width: 786px) {
      width: 60px;
      height: 60px;
    }
    img {
      object-fit: cover;
    }
  }
`;
