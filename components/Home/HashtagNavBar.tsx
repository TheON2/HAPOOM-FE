import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { SliderImage } from '@/public/data';
import { HashtagNavBarLayout, HashtagList, HashtagItem } from '@/styles/home';

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
                  sizes="(max-width: 1440px) 100px"
                  loading="eager"
                  // placeholder="blur"
                  // blurDataURL={hashtag.src}
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
