import { UserPageContainer, UserPageSection } from '@/styles/user';
import UserProfileCard from './UserProfileCard';
import UserLikePostSuggestion from './UserLikePostSuggestion';
import PostLike from './PostLike';
import { useQuery } from 'react-query';
import { getMyProfile, getUserProfile } from '@/api/user';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { useState } from 'react';
import FollowButton from './FollowButton';

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

const UserUi = (userId: number) => {
  const { data, error } = useQuery<UserPageData>('users', () => getMyProfile());
  console.log(data);

  if (error) {
    return <div>Error loading user data.</div>; // or any other error handling component or UI
  }

  return (
    <>
      <Header />
      <UserPageSection>
        <UserPageContainer>
          <UserProfileCard data={data} />
          <UserLikePostSuggestion data={data} />
          <PostLike data={data} />
        </UserPageContainer>
      </UserPageSection>
      <Footer />
    </>
  );
};

export default UserUi;
