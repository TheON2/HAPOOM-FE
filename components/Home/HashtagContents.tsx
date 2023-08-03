import React from 'react';
import styled from 'styled-components';
import { SliderImage } from '@/public/data';
import ImageContent from '@/components/Home/ImageContent';
const SectionTitle = styled.h2`
  max-width: 1200px;
  margin: 0 auto 30px;
`;

const HashtagContentsLayout = styled.section`
  width: 100%;
  padding: 50px 100px;
  /* height: 100vh; */
  background-color: #aaa;
`;

const HashtagContentsContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  /* height: 100vh; */
  margin: 0 auto;
  background-color: #fff;
  /* display: flex;
  flex-wrap: wrap; */
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  /* justify-items: center; */
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

type Props = {
  data: SliderImage[];
};

const HashtagContents: React.FC<Props> = ({ data }) => {
  return (
    <HashtagContentsLayout>
      <SectionTitle>#랜덤글</SectionTitle>
      <HashtagContentsContainer>
        {data.map((content, index) => {
          return (
            <ImageContent key={index} src={content.src} alt={content.alt} />
          );
        })}
      </HashtagContentsContainer>
    </HashtagContentsLayout>
  );
};

export default HashtagContents;
