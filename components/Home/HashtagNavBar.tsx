import Image from 'next/image';
import React from 'react';
import { HashtagNavBarProps } from '@/types/home';
import {
  HashtagNavBarLayout,
  HashtagList,
  HashtagItem,
  ScrollBar,
} from '@/styles/home';

const HashtagNavBar: React.FC<HashtagNavBarProps> = ({
  data,
  onClickEvent,
  $isClick,
}) => {
  return (
    <HashtagNavBarLayout onClick={onClickEvent} $isClick={$isClick}>
      <div className="background">
        <ScrollBar>
          <span></span>
        </ScrollBar>
        <HashtagList>
          {data.map((hashtag, index) => {
            return (
              <HashtagItem key={index}>
                <figure>
                  <Image
                    src={hashtag.src}
                    alt="v13 image"
                    width={200}
                    height={200}
                    loading="eager"
                  />
                </figure>
                <figcaption>#해시태그</figcaption>
              </HashtagItem>
            );
          })}
        </HashtagList>
      </div>
    </HashtagNavBarLayout>
  );
};

export default HashtagNavBar;
