import React, { useEffect, useState } from 'react';
import {
  Line,
  PostBox,
  PostContentBox,
  TabButton,
  TabContainer,
  TabIndicator,
  UserImageContainer,
} from '@/styles/user';
import { UserPost, UserPageData } from './UserUi';
import { useMutation } from 'react-query';
import { likePost } from '@/api/post';
import ImageContent from '../Home/ImageContent';
import { ImageContentsContainer } from '@/styles/imageContainer';
import { useInfiniteData } from '../../hooks/useInfiniteData';

interface PostLike {
  data: LocalUserPageData | undefined;
}

interface LocalUserPageData {
  likePosts: UserPost[];
  likedPosts: UserPost[];
  posts: UserPost[];
}

interface PostProps {
  image: string;
  postId: number;
  showLikeIcon?: boolean;
  handleLikeClick: (postId: number, isLiked: boolean) => void;
}
const Posts: React.FC<PostProps> = ({
  image,
  postId,
  showLikeIcon,
  handleLikeClick,
}) => {
  const [isLike, setIsLike] = useState<boolean>(false);
  const mutation = useMutation((postId: string) => likePost(postId));

  const onLikeClickHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    const newIsLike = !isLike;
    setIsLike(newIsLike);
    handleLikeClick(postId, newIsLike);
  };

  return (
    <UserImageContainer onClick={onLikeClickHandler}>
      <ImageContent src={image} alt="게시물 이미지" postId={postId} />
    </UserImageContainer>
  );
};

const PostLike: React.FC<PostLike> = ({
  data = { likePosts: [], likedPosts: [], posts: [] },
}) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
  const [displayedPosts, setDisplayedPosts] = useState<UserPost[] | null>(null);
  const [likedPosts, setLikedPosts] = useState<UserPost[]>(
    data?.likedPosts || []
  );

  const queryType = selectedTab === 0 ? 'post' : 'like';
  const { data: infiniteData } = useInfiniteData(queryType);

  useEffect(() => {
    if (selectedTab === 0) {
      setDisplayedPosts(infiniteData?.pages.flat() ?? []);
    } else if (selectedTab === 1) {
      setDisplayedPosts(
        infiniteData?.pages.flat().filter((p) => p.isLiked) ?? []
      );
    }
  }, [selectedTab, infiniteData]);

  useEffect(() => {
    if (selectedTab === 0) {
      setDisplayedPosts(data?.posts ?? null);
    } else if (selectedTab === 1) {
      setDisplayedPosts(data?.likedPosts);
    }
  }, [data, selectedTab]);

  const handleLikeClick = (postId: number, isLiked: boolean) => {
    if (isLiked) {
      const post = data?.posts.find((p) => p.postId === postId);
      if (post) {
        setLikedPosts((prevPosts) => [...prevPosts, post]);
      }
    } else {
      setLikedPosts((prevPosts) =>
        prevPosts.filter((p) => p.postId !== postId)
      );
    }
  };

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

        <TabIndicator
          width={indicatorStyle.width}
          $left={indicatorStyle.left}
        />
      </PostContentBox>
      <Line />
      <ImageContentsContainer>
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
      </ImageContentsContainer>
    </PostBox>
  );
};

export default PostLike;
