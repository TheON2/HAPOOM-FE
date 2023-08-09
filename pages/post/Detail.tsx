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
  console.log(data.videoId);
  return (
    <DetailSection>
      <DetailUserPost data={data} />
      <DetailYoutubePlayer videoId={data.posts[0].musicUrl} />
      <DetailMapComponent
        location={{ name: '서울특별시 강남구', x: 127.02761, y: 37.495826 }}
      />

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
