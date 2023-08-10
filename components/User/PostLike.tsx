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
import { UserPost, UserPageData } from './UserUi';
import { useMutation, useQueryClient } from 'react-query';
import { likePost } from '@/api/post';

interface PostLike {
  data: UserPageData | undefined;
}

interface PostProps {
  imageUrl: string;
  postId: number;
  showLikeIcon?: boolean;
}

const Post: React.FC<PostProps> = ({ imageUrl, postId, showLikeIcon }) => (
  <div style={{ position: 'relative', display: 'inline-block' }}>
    <Image
      src={imageUrl}
      alt="게시물 이미지"
      width={232}
      height={228}
      objectFit="cover"
    />
    {showLikeIcon && (
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
);

const PostLike: React.FC<PostLike> = ({ data }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
  const [displayedPosts, setDisplayedPosts] = useState<UserPost[] | null>(null);

  useEffect(() => {
    if (data) {
      setDisplayedPosts(data.posts);
    }
  }, [data]);

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

  const handleTabClick =
    (index: number) => (e: React.MouseEvent<HTMLDivElement>) => {
      const { offsetWidth, offsetLeft } = e.currentTarget;
      setSelectedTab(index);
      setIndicatorStyle({ width: offsetWidth, left: offsetLeft });
      if (index === 0) {
        setDisplayedPosts(data?.posts ?? null);
      } else {
        setDisplayedPosts(data?.likePosts ?? null);
      }
    };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (postId: number) => likePost(postId.toString()),
    {
      onSuccess: (data) => {
        console.log('API call succeeded:', data);
        queryClient.invalidateQueries('likePosts');
      },
      onError: (error) => {
        console.log('API call failed:', error);
      },
    }
  );

  const handleLikeToggle = (postId: number) => {
    console.log('Toggling like for postId:', postId);
    mutation.mutate(postId);
    setDisplayedPosts(
      (prevPosts) => prevPosts?.filter((post) => post.id !== postId) || null
    );
  };

  return (
    <PostBox>
      <PostContentBox>
        <TabButton
          className="tab-button"
          onClick={handleTabClick(0)}
          style={selectedTab === 0 ? { color: '#333' } : undefined}
        >
          게시물
        </TabButton>
        <TabButton
          className="tab-button"
          onClick={handleTabClick(1)}
          style={selectedTab === 1 ? { color: '#333' } : undefined}
        >
          좋아요
        </TabButton>
        <TabIndicator width={indicatorStyle.width} left={indicatorStyle.left} />
      </PostContentBox>
      <Line />
      <PostImageBox>
        {displayedPosts?.map((post) => (
          <div key={post.id} onClick={() => handleLikeToggle(post.id)}>
            <Post
              imageUrl={post.image.url}
              postId={post.id}
              showLikeIcon={selectedTab === 1}
            />
          </div>
        ))}
      </PostImageBox>
    </PostBox>
  );
};

export default PostLike;
