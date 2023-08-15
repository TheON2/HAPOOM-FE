import React from 'react';
import styled from 'styled-components';
import ImageContent from '@/components/Home/ImageContent';
import {
  SectionTitle,
  HashtagContentsLayout,
  HashtagContentsContainer,
} from '@/styles/home';
import { ImageContentsContainer } from '@/styles/imageContainer';
type Props = {
  data: Post[];
};
interface Post {
  postId: number;
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
  image: string;
}

const HashtagContents: React.FC<Props> = ({ data }) => {
  return (
    <HashtagContentsLayout>
      <SectionTitle>#랜덤글</SectionTitle>
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
    </HashtagContentsLayout>
  );
};

export default HashtagContents;
