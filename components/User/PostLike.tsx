import React, { useEffect, useState } from 'react';
import {
  Line,
  PostBox,
  PostContentBox,
  PostImageBox,
  TabButton,
  TabIndicator,
} from '@/styles/user';
import cloud from '../../public/🦆 icon _cloud_.svg';
import Image from 'next/image';
import { Post, UserData } from './UserUi';

interface PostLike {
  data: UserData | undefined;
}

const PostLike: React.FC<PostLike> = ({ data }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
  const [displayedPosts, setDisplayedPosts] = useState<Post[] | null>(null);

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
      setDisplayedPosts(data?.posts ?? null);
    } else {
      setDisplayedPosts(data?.likePosts ?? null);
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
        <TabIndicator width={indicatorStyle.width} left={indicatorStyle.left} />
      </PostContentBox>
      <Line></Line>

      <PostImageBox>
        {selectedTab === 0 &&
          data?.posts?.map((post) => (
            <div
              key={post.id}
              style={{ position: 'relative', display: 'inline-block' }}
            >
              <Image
                src={post.image.url}
                alt={'게시물 이미지'}
                width={232}
                height={228}
                objectFit={'cover'}
              />
            </div>
          ))}
        {selectedTab === 1 &&
          data?.likePosts?.map((post) => (
            <div
              key={post.id}
              style={{ position: 'relative', display: 'inline-block' }}
            >
              <Image
                src={post.image.url}
                alt={'게시물 이미지'}
                width={232}
                height={228}
                objectFit={'cover'}
              />
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
            </div>
          ))}
      </PostImageBox>
    </PostBox>
  );
};

export default PostLike;
