import styled from 'styled-components';
import Link from 'next/link';

export const ImageContentsContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  place-items: center;
  justify-content: center;
  align-items: center;
  grid-gap: 4px;
  @media screen and (min-width: 460px) {
    grid-template-columns: repeat(3, 1fr);
  }
  /* @media screen and (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  } */
`;

export const ImageContentLayout = styled.div`
  width: 100%;
  position: relative;
`;

export const ImageBox = styled(Link)`
  display: block;
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  img {
    object-fit: cover;
    /* -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    user-select: none; */
  }
`;
