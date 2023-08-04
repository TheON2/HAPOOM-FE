import DetailComments from '@/components/Detail/DetailComments';
import DetailMapComponent from '@/components/Detail/DetailMapComponent';
import DetailUserPost from '@/components/Detail/DetailUserPost';
import DetailYoutubePlayer from '@/components/Detail/DetailYoutubePlayer';
import { DetailSection } from '@/styles/detail';
import React from 'react';

const Detail = () => {
  return (
    <DetailSection>
      <DetailUserPost />
      <DetailYoutubePlayer />
      <DetailMapComponent />
      <DetailComments />
    </DetailSection>
  );
};

export default Detail;
