import Image from 'next/image';
import React, { useState } from 'react';
import { HashtagNavBarProps } from '@/types/home';
import {
  HashtagNavBarLayout,
  HashtagList,
  HashtagItem,
  ScrollBar,
  HashtagListContainer,
  HashtagListOther,
} from '@/styles/home';

const HashtagNavBar: React.FC<HashtagNavBarProps> = ({
  data,
  onClickEvent,
  $isClick,

  hashTag,
  setHashTag,
  setTagCategory,
  undefindeTagThumbnail,
  allTagThumbnail,
}) => {
  const [active, setActive] = useState<number>(0);
  const otherIndex = data.length + 1;
  const onClickAllTagHandler = () => {
    setHashTag('');
    setTagCategory('전체');
    setActive(0);
  };
  const onClickhashtagHandler = (hashtag: string, index: number) => {
    setHashTag(hashtag);
    setTagCategory('unique');
    setActive(index);
  };
  const onClickOtherHandler = () => {
    setTagCategory('기타');
    setActive(otherIndex);
  };

  return (
    <HashtagNavBarLayout $isClick={$isClick}>
      <div className="background">
        <ScrollBar onClick={onClickEvent}>
          <span></span>
        </ScrollBar>
        <HashtagListContainer>
          <HashtagListOther>
            <HashtagItem
              onClick={onClickAllTagHandler}
              className={active === 0 ? 'active' : ''}
            >
              <figure>
                <Image
                  src={allTagThumbnail}
                  alt="v13 image"
                  width={100}
                  height={100}
                  loading="eager"
                />
              </figure>
              <figcaption>#전체</figcaption>
            </HashtagItem>
            <span className="line"></span>
          </HashtagListOther>
          <HashtagList>
            {data?.map((hashtag, index) => {
              return (
                <HashtagItem
                  key={index}
                  onClick={() => onClickhashtagHandler(hashtag.tag, index + 1)}
                  className={active === index + 1 ? 'active' : ''}
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
            <HashtagItem
              onClick={onClickOtherHandler}
              className={active === otherIndex ? 'active' : ''}
            >
              <figure>
                <Image
                  src={undefindeTagThumbnail}
                  alt="v13 image"
                  width={100}
                  height={100}
                  loading="eager"
                />
              </figure>
              <figcaption>#기타</figcaption>
            </HashtagItem>
          </HashtagList>
        </HashtagListContainer>
      </div>
    </HashtagNavBarLayout>
  );
};

export default HashtagNavBar;
