import styled from 'styled-components';

export const ImageContentsContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;
  justify-content: center;
  align-items: center;
  grid-gap: 4px;
  @media screen and (max-width: 1260px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;