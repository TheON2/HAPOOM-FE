import React from 'react';
import styled from 'styled-components';
import ImageContent from '@/components/Home/ImageContent';
import { SectionTitle, HashtagContentsLayout } from '@/styles/home';
import { ImageContentsContainer } from '@/styles/imageContainer';
import { MainPageDataProps } from '@/types/home';
import { useQuery } from 'react-query';

type Props = {
  data: MainPageDataProps[];
  hashTag: string;
};

const HashtagContents: React.FC<Props> = ({ data, hashTag }) => {
  return (
    <HashtagContentsLayout>
      <div className="center">
        <SectionTitle>#{hashTag}</SectionTitle>
        <ImageContentsContainer>
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
        </ImageContentsContainer>
      </div>
    </HashtagContentsLayout>
  );
};

export default HashtagContents;
