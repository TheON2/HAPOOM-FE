import { UserPageContainer, UserPageSection } from '@/styles/user';
import UserProfileCard from './UserProfileCard';
import UserLikePostSuggestion from './UserLikePostSuggestion';
import PostLike from './PostLike';
import { useQuery } from 'react-query';
import { getUserProfile, getUsers } from '@/api/user';
import Header from '../common/Header';
import Footer from '../common/Footer';
import FollowButton from './FollowButton';
import { useState } from 'react';
import Modal from '../common/Modal';

interface Post {}

interface PostImage {
  url: string;
}

interface UserProfile {
  createdAt: string;
  email: string;
  method: string;
  nickname: string;
  password: string;
  theme: number;
  updatedAt: string;
  userId: number;
  userImage: string;
  postsCount: number;
}

export interface UserPost {
  id: number;
  content: string;
  createdAt: string;
  image: PostImage;
  latitude: number;
  longitude: number;
  musicTitle: string;
  musicUrl: string;
  placeName: string;
  private: boolean;
  tag: string;
  updatedAt: string;
  userId: number;
}

export interface UserPageData {
  likePosts: Post[];
  likePostsCount: number;
  posts: Post[];
  postsCount: number;
  user: UserProfile;
}

const UserUi = () => {
  const { data } = useQuery<UserPageData>('users', getUserProfile);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFollowButtonClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Header />
      <UserPageSection>
        <UserPageContainer>
          <UserProfileCard data={data} />
          <FollowButton />
          <UserLikePostSuggestion data={data} />
          <PostLike data={data} />
        </UserPageContainer>
      </UserPageSection>
      <Footer />
    </>
  );
};

export default UserUi;
