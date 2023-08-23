import { UserPageContainer, UserPageSection } from '@/styles/user';
import UserProfileCard from './UserProfileCard';
import UserLikePostSuggestion from './UserLikePostSuggestion';
import PostLike from './PostLike';
import { useQuery } from 'react-query';
import { getMyProfile, getUserProfile } from '@/api/user';
import FollowButton from './FollowButton';

interface UserUiProps {
  userId: string;
  loggedInEmail: string | null;
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
  image: string;
  latitude: number;
  longitude: number;
  musicTitle: string;
  musicUrl: string;
  placeName: string;
  private: boolean;
  tag: string;
  updatedAt: string;
  userId: number;
  postId: number;
}

export interface UserPageData {
  likePosts: UserPost[];
  likedPosts: UserPost[];
  likePostsCount: number;
  posts: UserPost[];
  postsCount: number;
  user: UserProfile;
  followerCount: number;
  followingCount: number;
}

export interface ParsedCookies {
  userId?: string;
  email?: string;
  [key: string]: string | undefined;
}

const UserUi: React.FC<UserUiProps> = ({ userId, loggedInEmail }) => {
  const isOwnProfile = loggedInEmail && userId === loggedInEmail;

  const { data, error }: { data: UserPageData | undefined; error: any } =
    useQuery<UserPageData>('users', () =>
      isOwnProfile ? getMyProfile() : getUserProfile({ UserId: userId })
    );

  if (error) {
    return <div>Error loading user data.</div>;
  }

  return (
    <>
      <UserPageSection>
        <UserPageContainer>
          <UserProfileCard data={data} />
          <FollowButton profileUserId={data?.user?.userId} />
          <UserLikePostSuggestion data={data} />
          <PostLike data={data} />
        </UserPageContainer>
      </UserPageSection>
    </>
  );
};

export default UserUi;
