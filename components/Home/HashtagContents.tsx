import React from 'react';
import styled from 'styled-components';
import ImageContent from '@/components/Home/ImageContent';
import { SectionTitle, HashtagContentsLayout } from '@/styles/home';
import { ImageContentsContainer } from '@/styles/imageContainer';
import { MainPageDataProps } from '@/types/home';

type Props = {
  data: MainPageDataProps[];
};

const HashtagContents: React.FC<Props> = ({ data }) => {
  return (
    <HashtagContentsLayout>
      <SectionTitle>#랜덤글</SectionTitle>
      <HashtagContentsContainer>
        {data.map((content, index) => {
          return (
            <ImageContent
              key={index}
              src={content.image}
              alt={'date'}
              postId={content.postId}
            />
          );
        })}
      </HashtagContentsContainer>
    </HashtagContentsLayout>
  );
};

export default HashtagContents;
