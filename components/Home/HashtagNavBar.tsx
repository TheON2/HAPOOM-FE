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
  setHashTag,
}) => {
  const onClickhashtagHandler = (hashtag: string) => {
    setHashTag(hashtag);
  };
  return (
    <HashtagNavBarLayout $isClick={$isClick}>
      <div className="background">
        <ScrollBar onClick={onClickEvent}>
          <span></span>
        </ScrollBar>

        <HashtagList>
          {data.map((hashtag, index) => {
            return (
              <HashtagItem
                key={index}
                onClick={() => onClickhashtagHandler('#해시태그')}
              >
                <figure>
                  <Image
                    src={hashtag.image}
                    alt="v13 image"
                    width={200}
                    height={200}
                    loading="eager"
                  />
                </figure>
                {/* <figcaption>{hashtag.hashtag}</figcaption> */}
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
