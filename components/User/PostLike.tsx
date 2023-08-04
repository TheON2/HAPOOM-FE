import React, { useEffect, useState } from 'react';
import {
  Line,
  PostBox,
  PostContentBox,
  PostImage,
  PostImageBox,
  TabButton,
  TabIndicator,
} from '@/styles/user';
import cloud from '../../public/🦆 icon _cloud_.svg';
import c1 from '../../public/c1.jpeg';
import c2 from '../../public/c2.jpeg';
import c3 from '../../public/c3.jpeg';
import c4 from '../../public/c4.jpeg';
import c5 from '../../public/c5.jpeg';
import Image, { StaticImageData } from 'next/image';

interface CloudImage {
  id: number;
  src: StaticImageData;
  alt: string;
}
const cloudImage: CloudImage[] = [
  {
    id: 1,
    src: c1,
    alt: 'c1',
  },
  {
    id: 2,
    src: c2,
    alt: 'c2',
  },
  {
    id: 3,
    src: c3,
    alt: 'c3',
  },
  {
    id: 4,
    src: c4,
    alt: 'c4',
  },
  {
    id: 5,
    src: c5,
    alt: 'c5',
  },
];
const cloudLikeImage: CloudImage[] = [
  {
    id: 1,
    src: c1,
    alt: 'c1',
  },
  {
    id: 2,
    src: c1,
    alt: 'c1',
  },
  {
    id: 3,
    src: c1,
    alt: 'c1',
  },
  {
    id: 4,
    src: c1,
    alt: 'c1',
  },
  {
    id: 5,
    src: c1,
    alt: 'c1',
  },
];

const PostLike = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
  const [displayedPosts, setDisplayedPosts] =
    useState<CloudImage[]>(cloudImage);

  useEffect(() => {
    const updateIndicator = () => {
      const element = document.querySelectorAll('.tab-button')[
        selectedTab
      ] as HTMLDivElement;
      if (element) {
        const { offsetWidth, offsetLeft } = element;
        setIndicatorStyle({ width: offsetWidth, left: offsetLeft });
      }
    };
    updateIndicator();
  }, [selectedTab]);

  const handleTabClick = (index: number, width: number, left: number) => {
    setSelectedTab(index);
    setIndicatorStyle({ width, left });
    if (index === 0) {
      setDisplayedPosts(cloudImage);
    } else {
      setDisplayedPosts(cloudLikeImage);
    }
  };

  return (
    <PostBox>
      <PostContentBox>
        <TabButton
          className="tab-button"
          onClick={(e) => {
            handleTabClick(
              0,
              e.currentTarget.offsetWidth,
              e.currentTarget.offsetLeft
            );
          }}
          style={selectedTab === 0 ? { color: '#333' } : undefined}
        >
          게시물
        </TabButton>
        <TabButton
          className="tab-button"
          onClick={(e) => {
            handleTabClick(
              1,
              e.currentTarget.offsetWidth,
              e.currentTarget.offsetLeft
            );
          }}
          style={selectedTab === 1 ? { color: '#333' } : undefined}
        >
          좋아요
        </TabButton>
      </PostContentBox>
      <TabIndicator width={indicatorStyle.width} left={indicatorStyle.left} />
      <Line></Line>
      <PostImageBox>
        {displayedPosts.map((image) => (
          <div
            key={image.id}
            style={{ position: 'relative', display: 'inline-block' }}
          >
            <PostImage src={image.src} alt={image.alt} />
            {selectedTab === 1 && (
              <Image
                src={cloud}
                alt="좋아요"
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  cursor: 'pointer',
                }}
              />
            )}
          </div>
        ))}
      </PostImageBox>
    </PostBox>
  );
};

export default PostLike;
