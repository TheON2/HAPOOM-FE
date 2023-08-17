import { UserPageContainer, UserPageSection } from '@/styles/user';
import UserProfileCard from './UserProfileCard';
import UserLikePostSuggestion from './UserLikePostSuggestion';
import PostLike from './PostLike';
import { useQuery } from 'react-query';
import { getMyProfile, getUserProfile } from '@/api/user';
import { useState } from 'react';
import FollowButton from './FollowButton';
import { parseCookies } from 'nookies';

interface Post {}

// setCookie(null, 'update', '2', { path: '/' }); 쿠키를 저장하는법

//const cookies = parseCookies(null); // 클라이언트 측에서 실행되는 경우 null 사용
// const tabIndexCookie = cookies.tabIndex; // 'myCookie'의 값을 가져옴

interface UserUiProps {
  userId: string | number;
  loggedInEmail: string | null;
}

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

const UserUi: React.FC<UserUiProps> = ({ userId, loggedInEmail }) => {
  const isOwnProfile = userId === loggedInEmail;
  const { data, error } = useQuery<UserPageData>('users', (userId) =>
    isOwnProfile ? getMyProfile() : getUserProfile(userId)
  );

  const cookies = parseCookies();
  const savedUserId = cookies.userId;
  const savedEmail = cookies.email;

  console.log(isOwnProfile);
  console.log(userId);
  console.log(loggedInEmail);

  if (error) {
    return <div>Error loading user data.</div>; // or any other error handling component or UI
  }

  return (
    <>
      <UserPageSection>
        <UserPageContainer>
          <UserProfileCard data={data} />
          <FollowButton />
          <UserLikePostSuggestion data={data} />
          <PostLike data={data} />
        </UserPageContainer>
      </UserPageSection>
    </>
  );
};

export default UserUi;
