// Detail 페이지 컴포넌트
import React from 'react';
import DetailComments from '@/components/Detail/DetailComments';
import DetailMapComponent from '@/components/Detail/DetailMapComponent';
import DetailUserPost from '@/components/Detail/DetailUserPost';
import DetailYoutubePlayer from '@/components/Detail/DetailYoutubePlayer';
import { DetailSection } from '@/styles/detail';

type Props = {
  data: any;
};

const Detail: React.FC<Props> = ({ data }) => {
  return (
    <DetailSection>
      <DetailUserPost data={data} />
      <DetailYoutubePlayer />
      <DetailMapComponent />
      <DetailComments />
    </DetailSection>
  );
};

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3001/api/main');
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data }, // will be passed to the page component as props
  };
}

export default Detail;
