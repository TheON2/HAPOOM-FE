import React, { MouseEventHandler, useEffect, useState } from 'react';
import {
  Line,
  PostBox,
  PostContentBox,
  PostImageBox,
  TabButton,
  TabContainer,
  TabIndicator,
  UserImageContainer,
} from '@/styles/user';
import Image from 'next/image';
import { UserPost, UserPageData } from './UserUi';
import { useMutation } from 'react-query';
import { getPost, likePost } from '@/api/post';
import HeartIcon from '../common/HeartIcon';
import ImageContent from '../Home/ImageContent';

interface PostLike {
  data: UserPageData | undefined;
}

interface PostProps {
  image: string;
  postId: number;
  showLikeIcon?: boolean;
  handleLikeClick: MouseEventHandler<HTMLImageElement>;
}
const Posts: React.FC<PostProps> = ({
  image,
  postId,
  showLikeIcon,
  handleLikeClick,
}) => {
  const [isLike, setIsLike] = useState<boolean>(false);
  const mutation = useMutation((postId: string) => likePost(postId));

  const onLikeClickHandler = (postId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setIsLike(!isLike);
    mutation.mutate(postId.toString());
  };

  return (
    <UserImageContainer>
      <ImageContent src={image} alt="게시물 이미지" postId={postId} />
      {showLikeIcon && <HeartIcon postId={postId} />}
    </UserImageContainer>
  );
};

const PostLike: React.FC<PostLike> = ({ data }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
  const [displayedPosts, setDisplayedPosts] = useState<UserPost[] | null>(null);
  const [likedPosts, setLikedPosts] = useState<UserPost[]>([]);

  const mutation = useMutation(likePost, {
    onSuccess: (data, variables) => {
      console.log('Success');
      const newPost = displayedPosts?.find(
        (post) => post.postId.toString() === variables
      );
      if (newPost) {
        setLikedPosts((prev) => [...prev, newPost]);
      }
    },
    onError: (error) => {
      console.error('Failed to like the post', error);
    },
  });

  const handleLikeClick: React.MouseEventHandler<HTMLImageElement> = (
    event
  ) => {
    const postId = event.currentTarget.getAttribute('data-post-id');
    if (postId) {
      mutation.mutate(postId);
    }
  };

  useEffect(() => {
    if (data) {
      setDisplayedPosts(data.posts);
    }
  }, [data, displayedPosts]);

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
      } else if (index === 1) {
        setDisplayedPosts(likedPosts);
      } else {
        // ... 다른 탭에 대한 로직 ...
      }
    };
  return (
    <PostBox>
      <PostContentBox>
        <TabContainer>
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
          <TabButton
            className="tab-button"
            onClick={handleTabClick(2)}
            style={selectedTab === 2 ? { color: '#333' } : undefined}
          >
            북마크
          </TabButton>
        </TabContainer>

        <TabIndicator width={indicatorStyle.width} left={indicatorStyle.left} />
      </PostContentBox>
      <Line />
      <PostImageBox>
        {displayedPosts?.map((post) => {
          return (
            <Posts
              key={post.postId}
              image={post.image}
              postId={post.postId}
              showLikeIcon={selectedTab === 1}
              handleLikeClick={handleLikeClick}
            />
          );
        })}
      </PostImageBox>
    </PostBox>
  );
};

export default PostLike;
