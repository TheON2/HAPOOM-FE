import React, { MouseEventHandler, useEffect, useState } from 'react';
import {
  Line,
  PostBox,
  PostContentBox,
  TabButton,
  TabContainer,
  TabIndicator,
  UserImageContainer,
} from '@/styles/user';
import Image from 'next/image';
import { UserPost, UserPageData } from './UserUi';
import { useMutation } from 'react-query';
import { getPost, likePost } from '@/api/post';
import ImageContent from '../Home/ImageContent';
import { ImageContentsContainer } from '@/styles/imageContainer';

interface PostLike {
  data: UserPageData | undefined;
}

interface PostProps {
  image: string;
  postId: number;
  showLikeIcon?: boolean;
  handleLikeClick: (postId: number) => void;
}
const Posts: React.FC<PostProps> = ({
  image,
  postId,
  showLikeIcon,
  handleLikeClick,
}) => {
  const [isLike, setIsLike] = useState<boolean>(false);
  

  const onLikeClickHandler = (postId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setIsLike(!isLike);
    handleLikeClick(postId);
  };

  return (
    <UserImageContainer onClick={(event) => onLikeClickHandler(postId, event)}>
      <ImageContent src={image} alt="게시물 이미지" postId={postId} />
    </UserImageContainer>
  );
};

const PostLike: React.FC<PostLike> = ({ data }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
  const [displayedPosts, setDisplayedPosts] = useState<UserPost[] | null>(null);
  const [likedPosts, setLikedPosts] = useState<UserPost[]>(data?.likePosts || []);


  const mutation = useMutation(likePost, {
    onSuccess: (data, variables) => {
      console.log('Success');
      const likedPost = displayedPosts?.find(
        (post) => post.postId.toString() === variables
      );

      if (likedPost) {
        // Check if post is already liked
        const isAlreadyLiked = likedPosts.some(
          (post) => post.postId === likedPost.postId
        );

        setLikedPosts((prev) => {
          if (isAlreadyLiked) {
            return prev.filter((post) => post.postId !== likedPost.postId);
          } else {
            return [...prev, likedPost];
          }
        });
      }
    },
    onError: (error) => {
      console.error('Failed to like the post', error);
    },
  });

  const handleLikeClick = (postId: number) => {
    if (postId) {
      mutation.mutate(postId);
    }
  };

  useEffect(() => {
    console.log("Data received:", data);  // <- 여기에 로깅을 추가합니다.
    console.log('Liked Posts:', likedPosts);
    if (selectedTab === 0) {
      setDisplayedPosts(data?.posts ?? null);
    } else if (selectedTab === 1) {
      setDisplayedPosts(likedPosts);
    }
  }, [data, selectedTab, likedPosts]);


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
      }
    };
  return (
    <PostBox>
      <PostContentBox>
        <TabContainer>
          <TabButton
            className="tab-button"
            onClick={handleTabClick(0)}
            style={selectedTab === 0 ? { color: '#000000' } : undefined}
          >
            게시물
          </TabButton>
          <TabButton
            className="tab-button"
            onClick={handleTabClick(1)}
            style={selectedTab === 1 ? { color: '#000000' } : undefined}
          >
            좋아요
          </TabButton>
        </TabContainer>

        <TabIndicator width={indicatorStyle.width} left={indicatorStyle.left} />
      </PostContentBox>
      <Line />
      <ImageContentsContainer>
      {(selectedTab === 0 ? data?.posts : data?.likedPosts ?? [])?.map((post) => {
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
      </ImageContentsContainer>
    </PostBox>
  );
};

export default PostLike;
