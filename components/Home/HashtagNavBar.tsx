import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { SliderImage } from '@/public/data';

const HashtagNavBarLayout = styled.nav`
  width: 100%;
  height: 200px;
  /* padding: 54px 0; */
  /* height: 10vh; */
  background-color: #efefef;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 54px;
  position: sticky;
  top: 0;
  z-index: 999;
`;

const HashtagList = styled.ul`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 46px;
  background: #fff;
  list-style: none;
`;

const HashtagItem = styled.li`
  width: 100px;
  text-align: center;
  figure {
    position: relative;
    width: 100px;
    height: 100px;
    margin-bottom: 12px;
    overflow: hidden;
    border-radius: 8px;
    img {
      object-fit: cover;
    }
  }
`;
type Props = {
  data: SliderImage[];
};
const HashtagNavBar: React.FC<Props> = ({ data }) => {
  return (
    <HashtagNavBarLayout>
      <HashtagList>
        {data.map((hashtag, index) => {
          return (
            <HashtagItem key={index}>
              <figure>
                <Image
                  src={hashtag.src}
                  alt="v13 image"
                  fill
                  sizes="(max-width: 100px) 100vw"
                  loading="eager"
                  placeholder="blur"
                  blurDataURL={hashtag.src}
                />
              </figure>
              <figcaption>#해시태그다</figcaption>
            </HashtagItem>
          );
        })}
      </HashtagList>
    </HashtagNavBarLayout>
  );
};

export default HashtagNavBar;
