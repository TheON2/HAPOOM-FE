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
  // console.log(data);
  return (
    <HashtagNavBarLayout $isClick={$isClick}>
      <div className="background">
        <ScrollBar onClick={onClickEvent}>
          <span></span>
        </ScrollBar>

        <HashtagList>
          {data?.map((hashtag, index) => {
            return (
              <HashtagItem
                key={index}
                onClick={() => onClickhashtagHandler(hashtag.tag)}
              >
                <figure>
                  <Image
                    src={hashtag.image}
                    alt="v13 image"
                    width={100}
                    height={100}
                    loading="eager"
                  />
                </figure>
                <figcaption>{`#${hashtag.tag}`}</figcaption>
              </HashtagItem>
            );
          })}
        </HashtagList>
      </div>
    </HashtagNavBarLayout>
  );
};

export default HashtagNavBar;
