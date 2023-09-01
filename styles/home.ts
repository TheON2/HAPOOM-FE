import Link from 'next/link';
import styled, { createGlobalStyle } from 'styled-components';

export const TrendGlobalStyle = createGlobalStyle`
  body{
    overflow: hidden;
  }
  `;

export const HomePageLayout = styled.div`
  width: 100%;
  height: 100vh;
  height: 100svh;
  overflow: hidden;
  /* @media screen and (min-width: 768px) {
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  } */
`;

export const MainLayout = styled.main`
  width: 100%;
  height: calc(100vh - 230px);
  height: calc(100svh - 230px);
  overflow-y: auto;
  transform: translateY(-103px);
  background-color: var(--bg-color);
  padding: 0;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  @media screen and (min-width: 768px) {
    height: calc(100vh - 240px);
    transform: translateY(0);
  }
  .center {
    margin: 0 auto;
    max-width: 768px;
    width: 100%;
  }
`;

// main comment section styled
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
`;

// main banner style
type mainBannerProps = {
  $isClick: boolean;
};

export const MainBannerContainer = styled.div<mainBannerProps>`
  width: 100%;
  height: ${(props) => (props.$isClick ? '230px' : 'calc(100svh - 58px)')};
  background-color: ${(props) =>
    props.$isClick ? 'var(--point-bg)' : 'var(--bg-color)'};
  transition: all 0.8s ease-in-out;
  position: relative;
  @media screen and (min-width: 768px) {
    height: ${(props) => (props.$isClick ? '120px' : '100vh')};
    p {
      bottom: ${(props) => (props.$isClick ? '6px' : '12vh')};
      max-width: 768px;
      font-size: ${(props) => (props.$isClick ? '14px' : '16px')};
      line-height: ${(props) => (props.$isClick ? '18px' : '36px')};
    }
  }
`;
export const RandomContentContainer = styled.div<mainBannerProps>`
  width: 100%;
  transition: all 0.3s ease-in-out;
  opacity: ${(props) => (props.$isClick ? '0' : '1')};
  animation: ${(props) => (props.$isClick ? 'out' : 'on')} 0.3s ease-in-out
    forwards;
  @keyframes off {
    0% {
      opacity: 1;
    }
    99% {
      opacity: 0;
    }
    100% {
      display: none;
    }
  }
  @keyframes on {
    0% {
      display: none;
      opacity: 0;
    }

    100% {
      opacity: 1;
      display: block;
    }
  }
`;
export const IntroduceText = styled.p`
  color: var(--primary-color);
  font-weight: 500;
  font-size: 16px;
  text-align: center;
  padding: 12px 0;
  width: 100%;
`;
export const NewContentBox = styled.div`
  max-width: 560px;
  width: 86%;
  height: 73vh;
  height: 73svh;
  margin: 0 auto;
  padding: 0 12px 60px;
  background-color: #fff;
  box-shadow: var(--shadow-color);
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  figure {
    width: 100%;
    height: 75%;
    /* margin: 0 auto; */
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: all 0.8s ease-in-out;
    }
  }
  @media screen and (min-width: 768px) {
    height: 75vh;
    height: 75svh;
    padding: 0 12px 80px;
    bottom: 50%;
    transform: translate(-50%, 50%);
    figure {
      height: 86%;
    }
  }
`;
export const ProfileLink = styled(Link)`
  align-items: center;
  gap: 8px;
  display: flex;
`;
export const MainCardInfo = styled.div`
  padding: 12px 0;
  margin: 4px 0 0 0;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  a {
    display: flex;
  }
  img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }
  p {
    font-weight: 400;
    font-size: 14px;
    color: #777;
    .nickname-hightlight {
      /* color: #333; */
      font-weight: 700;
    }
  }
  @media screen and (min-width: 768px) {
    margin: 0;
    .heart {
      top: 13px;
      right: 0;
    }
  }
`;
export const MainBannerBox = styled.div<mainBannerProps>`
  max-width: 768px;
  width: 100%;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  gap: 46px;
  align-items: center;
  position: absolute;
  bottom: 90px;
  left: 50%;
  transform: translateX(-50%);
  transition: all 0.3s ease-in-out;
  color: #fff;

  @media screen and (min-width: 768px) {
    padding: 0;
    justify-content: flex-start;
    gap: 16px;
    bottom: ${(props) => (props.$isClick ? '12px' : '12vh')};
  }
`;
export const RandomText = styled.p<mainBannerProps>`
  width: 100%;
  display: flex;
  padding: 8px 24px;
  border-radius: 30px;
  flex-direction: column;
  word-wrap: break-word;
  font-size: 14px;
  font-weight: 700;
  line-height: 28px;
  text-align: center;
  background-color: var(--random-text-color);
  color: #fff;
  transition: all 0.3s ease-in-out;
  @media screen and (min-width: 768px) {
    padding: 0;
    background: none;
    text-align: start;
    max-width: 768px;
    font-size: ${(props) => (props.$isClick ? '14px' : '28px')};
    flex-direction: ${(props) => (props.$isClick ? 'row' : 'column')};
    line-height: ${(props) => (props.$isClick ? '18px' : '36px')};
  }
`;

export const ButtonTouchBox = styled.div<mainBannerProps>`
  text-align: center;
  display: none;
  flex-direction: column;
  align-items: center;
  /* position: absolute; */
  bottom: 120px;
  right: 50%;
  color: #fff;
  transition: all 0.3s ease-in-out;

  button {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background: none;
    border: 2px solid #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: rotate(90deg);
    transition: all 0.3s ease-in-out;

    cursor: pointer;
    svg {
      animation: bounce 1.2s ease-in-out infinite;
      /* transform: scale(60%); */
    }
    path {
      fill: #fff;
    }
    @keyframes bounce {
      0% {
        transform: scale(60%) translateX(10%);
      }
      50% {
        transform: scale(60%) translateX(-10%);
      }
      100% {
        transform: scale(60%) translateX(10%);
      }
    }
  }
  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: ${(props) => (props.$isClick ? 'row' : 'column')};
    color: ${(props) => (props.$isClick ? '#fff' : '#52acff')};
    gap: 4px;
    button {
      width: 26px;
      height: 26px;
      border: ${(props) =>
        props.$isClick ? '2px solid #fff' : '2px solid #52acff'};
      transform: ${(props) =>
        props.$isClick ? 'rotate(-90deg)' : 'rotate(90deg)'};
      path {
        fill: ${(props) => (props.$isClick ? '#fff' : '#52acff')};
      }
    }
  }
`;
// main banner slide style
interface SliderListProps {
  $slideindex: number;
  width?: number;
  $sliedsum: number;
}

type WidthOnly = Pick<SliderListProps, 'width'>;

export const MainBannerLayout = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  background-color: var(--detail-img-bg-color);
  .sigle-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

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

export const SliderItem = styled.li<WidthOnly>`
  width: ${(props) => (props.width ? `${props.width}px` : `100vw`)};
  height: 100%;
  position: relative;

  /* padding: 50px 100px; */
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    /* box-shadow: 0 0 20px rgba(0, 0, 0, 1); */
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
export const SlideSum = styled.div`
  padding: 4px 8px 2px;
  border-radius: 12px;
  background-color: #ffffff99;
  color: #538cc0;
  svg {
    margin-right: 4px;
    path {
      fill: #538cc0;
    }
  }
  @media screen and (min-width: 786px) {
    margin-right: 12px;
  }
`;
export const SlideDotBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
  gap: 4px;
  position: absolute;
  bottom: 12px;
  span {
    display: block;
    width: 8px;
    height: 8px;
    background-color: #ffffff99;
    border-radius: 50%;
    cursor: pointer;
    &.active {
      background-color: #0084ff99;
    }
  }
  @media screen and (max-width: 786px) {
    gap: 12px;
    opacity: 0.8;
    justify-content: flex-start;

    span {
      width: 20px;
      height: 20px;
    }
  }
`;

//------hashtag contents styles--------

export const HashtagContentsLayout = styled.section`
  width: 100%;
  min-height: 30vh;
  @media screen and (min-width: 786px) {
    min-height: 40vh;
  }
`;

export const ScrollBar = styled.div`
  width: 100%;
  padding: 8px 0 10px;
  cursor: pointer;
  span {
    display: block;
    background-color: #e4e1e1;
    width: 30px;
    height: 4px;
    margin: 0 auto 1px;
    border-radius: 2px;
  }
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

//popular contents section style
interface PropularSliderListProps {
  $slideindex: number;
  $slideListWidth?: number;
  $slideItemWidth?: number;
}
type Slideitemwidth = Pick<PropularSliderListProps, '$slideItemWidth'>;
type hashtagNavbarProps = {
  $isClick?: boolean;
};
export const PopularContentsLayout = styled.section`
  width: 100%;
  position: relative;
  @media screen and (max-width: 786px) {
    padding: 20px 0;
  }
`;

export const ProularContentContainer = styled.div<Slideitemwidth>`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  overflow: hidden;
`;

export const PopularContentsList = styled.ul<PropularSliderListProps>`
  width: ${(props) =>
    props.$slideListWidth ? `${props.$slideListWidth}px` : `3000px`};
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  list-style: none;
  gap: 16px;

  transform: ${(props) =>
    props.$slideItemWidth
      ? `translateX(${props.$slideindex * (props.$slideItemWidth + 4) * -1}px)`
      : 'translateX(0px)'};
  transition: all 0.3s ease-in-out;
`;

export const PopularContentItem = styled.li<Slideitemwidth>`
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
export const HashtagNavBarLayout = styled.nav<hashtagNavbarProps>`
  width: 100%;
  border-radius: 30px 30px 0 0;
  transform: translateY(-93%);
  position: relative;
  z-index: 110;
  font-size: 10px;
  font-weight: 700;
  color: ${(props) => (props.$isClick ? '#fff' : 'var(--primary-color)')};
  box-shadow: ${(props) =>
    props.$isClick ? '0 -5px 16px agba(0,0,0,0.5)' : 'var(--shadow-color)'};
  overflow: hidden;
  .button-wrap {
    max-width: 768px;
    width: 100%;
    margin: 0 auto;
    position: relative;
  }
  .background {
    width: 100%;
    padding: 0px 24px 8px;
    /* background: var(--hashtag-bg-gradient); */
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.22) 86%,

      #fff 95%,
      rgba(255, 255, 255, 0.1) 98%,
      rgba(255, 255, 255, 0) 100%
    );
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  @media screen and (min-width: 768px) {
    transform: translateY(0);
    border-radius: 0;
    color: #aaa;
    overflow: visible;

    .background {
      width: 100%;
      padding: 12px 24px 12px;
      background: var(--bg-color);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      z-index: -2;
    }
  }
`;
export const HashtagListContainer = styled.div`
  max-width: 768px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
  gap: 8px;
`;
export const HashtagList = styled.ul`
  flex: 7;
  max-width: 768px;
  width: 100%;
  padding: 6px 8px 4px;
  border-radius: 12px;
  display: flex;
  justify-content: flex-start;
  gap: 12px;
  list-style: none;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
export const HashtagListOther = styled.div`
  padding: 6px 20px 4px 0px;
  display: flex;
  justify-content: center;
  position: relative;
  .line {
    width: 2px;
    height: 52px;
    border-radius: 1px;
    background-color: #deefff90;
    position: absolute;
    top: 2px;
    right: -1px;
    @media screen and (min-width: 768px) {
      height: 72px;
    }
  }
`;
export const HashtagAll = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  font-size: 9px;
  cursor: pointer;
  /* width: 44px; */
  figure {
    position: relative;
    margin-bottom: 8px;
    overflow: hidden;
    border-radius: 12px;
    width: 44px;
    height: 44px;
    /* box-shadow: 0 1px 2px #17417280; */
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &.active {
    /* color: #52acff; */
    font-weight: 700;
  }
  &.active::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 52px;
    height: 52px;
    transform: translate(-50%, -69%);
    border-radius: 16px;
    border: 5px solid transparent;
    background-image: var(--hashtag-active);
    background-origin: border-box;
    background-clip: content-box, border-box;
    box-sizing: border-box;
    z-index: -1;
  }

  @media screen and (min-width: 768px) {
    font-size: 12px;
    font-weight: 500;
    figure {
      width: 90px;
      height: 64px;
      box-shadow: 0 2px 3px #33476550;
    }
    &.active::after {
      content: '';
      position: absolute;
      transform: translate(-50%, -66%);
      width: 98px;
      height: 72px;
      border-radius: 16px;
    }
  }
  &:hover {
    /* filter: brightness(0.8); */
  }
`;
export const HashtagItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  font-size: 9px;
  cursor: pointer;
  /* width: 44px; */
  figure {
    position: relative;
    margin-bottom: 8px;
    overflow: hidden;
    border-radius: 12px;
    width: 44px;
    height: 44px;
    /* box-shadow: 0 1px 2px #17417280; */
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &.active {
    /* color: #52acff; */
    font-weight: 700;
  }
  &.active::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 52px;
    height: 52px;
    transform: translate(-50%, -69%);
    border-radius: 16px;
    border: 5px solid transparent;
    background-image: var(--hashtag-active);
    background-origin: border-box;
    background-clip: content-box, border-box;
    box-sizing: border-box;
    z-index: -1;
  }

  @media screen and (min-width: 768px) {
    font-size: 12px;
    font-weight: 500;
    figure {
      width: 90px;
      height: 64px;
      box-shadow: 0 2px 5px #33476550;
    }
    &.active::after {
      content: '';
      position: absolute;
      transform: translate(-50%, -66%);
      width: 98px;
      height: 72px;
      border-radius: 16px;
    }
  }
  &:hover {
    /* filter: brightness(0.8); */
  }
`;

// popular contents carousel styles
interface CarouselStyleprops {
  $active: number;
  $i: number;
}
const MAX_VISIBILITY = 3;

export const HomeMainSection = styled.section`
  background-color: var(--section-gray);
  margin-top: 24px;
  padding-bottom: 36px;
  @media screen and (min-width: 786px) {
    padding-top: 24px;
    padding-bottom: 60px;
  }
`;

export const PopularContentsContainer = styled.div`
  width: 100%;
  padding: 24px 24px 56px;
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

export const CarouselStyle = styled.div`
  --size: 210px;
  position: relative;
  width: var(--size);
  height: var(--size);

  perspective: 500px;
  transform-style: preserve-3d;
  & > div {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  @media screen and (min-width: 460px) {
    --size: 260px;
  }
  @media screen and (min-width: 768px) {
    --size: 320px;
  }
`;
export const CarouselHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const ButtonBox = styled.div`
  /* width: 100%; */
  display: flex;
  padding: 0 24px;
  gap: 12px;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff80;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    border: 2px solid #fff;
    cursor: pointer;
    &.left {
      transform: rotate(180deg);
    }
    &:hover {
      path {
        fill: var(--slide-button-fill-color);
      }
    }
  }
  &.hash {
    display: none;
    @media screen and (min-width: 768px) {
      max-width: calc(100% - 110px);
      width: 100%;
      position: absolute;
      right: 0;
      top: calc(50% - 26px);
      padding: 0 4px;
      padding-bottom: 22px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 114;
      button {
        width: 32px;
        height: 32px;
        background-color: #fff;
        border: none;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
        svg {
          transform: scale(70%);
        }
        path {
          fill: var(--primary-color);
        }
        &:hover path {
          fill: #2797ff;
        }
      }
    }
  }
`;
export const CardContainer = styled.div<CarouselStyleprops>`
  position: absolute;
  width: 100%;
  /* height: 100%; */
  border-radius: 8px;
  overflow: hidden;
  pointer-events: auto;
  --max-visibility: 3;
  --active: ${({ $active, $i }) => ($i === $active ? 1 : 0)};
  --offset: ${({ $active, $i }) => ($active - $i) / 3};
  --direction: ${({ $active, $i }) => $active - $i};
  --abs-offset: ${({ $active, $i }) => Math.abs($active - $i) / 3};

  opacity: ${({ $active, $i }) =>
    Math.abs($active - $i) / MAX_VISIBILITY >= 1 ? 0 : 1};
  display: ${({ $active, $i }) =>
    Math.abs($active - $i) / MAX_VISIBILITY > 1 ? 'none' : 'block'};
  transform: rotateY(calc(0 * 50deg)) scaleY(calc(1 + var(--abs-offset) * -0.4))
    translateZ(calc(var(--abs-offset) * -30rem))
    translateX(calc(var(--direction) * -5.5rem));
  transition: all 0.3s ease-out;
  .heart {
    display: ${({ $active, $i }) => ($i === $active ? 'flex' : 'none')};
  }
  @media screen and (min-width: 460px) {
    transform: rotateY(calc(0 * 50deg))
      scaleY(calc(1 + var(--abs-offset) * -0.4))
      translateZ(calc(var(--abs-offset) * -30rem))
      translateX(calc(var(--direction) * -8rem));
  }
  @media screen and (min-width: 768px) {
    transform: rotateY(calc(0 * 50deg))
      scaleY(calc(1 + var(--abs-offset) * -0.4))
      translateZ(calc(var(--abs-offset) * -30rem))
      translateX(calc(var(--direction) * -14rem));
  }
`;
