import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { SliderImage } from '@/public/data';
import { HashtagNavBarLayout, HashtagList, HashtagItem } from '@/styles/home';
// import { ScrollBar } from '@/components/common/SVG';

type Props = {
  data: SliderImage[];
  $isClick?: any;
  onClickEvent?: any;
};

const ScrollBar = styled.div`
  width: 30px;
  padding: 8px 0 10px;
  span {
    display: block;
    background-color: #e4e1e1;
    width: 100%;
    height: 4px;
    margin-bottom: 1px;
    border-radius: 2px;
  }
  @media screen and (min-width: 768px) {
    padding: 20px 0;
  }
`;

const HashtagNavBar: React.FC<Props> = ({ data, onClickEvent, $isClick }) => {
  // const onClickBottomNavHandler = () => {
  //   setIsClick(!isClick);
  // };
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

                    // placeholder="blur"
                    // blurDataURL={hashtag.src}
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
