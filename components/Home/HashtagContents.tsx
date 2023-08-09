import React from 'react';
import styled from 'styled-components';
import ImageContent from '@/components/Home/ImageContent';
import {
  SectionTitle,
  HashtagContentsLayout,
  HashtagContentsContainer,
} from '@/styles/home';

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

const HashtagContents: React.FC<Props> = ({ data }) => {
  return (
    <HashtagContentsLayout>
      <SectionTitle>#랜덤글</SectionTitle>
      <HashtagContentsContainer>
        {data.map((content, index) => {
          return (
            <ImageContent key={index} src={content.image?.url} alt={'date'} />
          );
        })}
      </HashtagContentsContainer>
    </HashtagContentsLayout>
  );
};

export default HashtagContents;
