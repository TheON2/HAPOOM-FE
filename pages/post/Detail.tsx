import React from 'react';
import DetailComments from '@/components/Detail/DetailComments';
import DetailMapComponent from '@/components/Detail/DetailMapComponent';
import DetailUserPost from '@/components/Detail/DetailUserPost';
import DetailYoutubePlayer from '@/components/Detail/DetailYoutubePlayer';
import { DetailSection } from '@/styles/detail';

type Props = {
  data: IData;
};

const Detail: React.FC<Props> = ({ data }) => {
  return (
    <DetailSection>
      <DetailUserPost data={data} />
      <DetailYoutubePlayer />
      <DetailMapComponent
        location={{ name: data.placeName, x: data.longitude, y: data.latitude }}
      />

      <DetailComments />
    </DetailSection>
  );
};

export async function getServerSideProps() {
  try {
    const res = await fetch('http://localhost:3001/test/post/1');

    if (!res.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await res.json();

    return {
      props: { data }, // will be passed to the page component as props
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      notFound: true,
    };
  }
}

export default Detail;
