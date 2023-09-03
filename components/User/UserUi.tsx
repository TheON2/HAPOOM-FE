import { UserPageContainer, UserPageSection } from '@/styles/user';
import UserProfileCard from './UserProfileCard';
import PostLike from './PostLike';
import { useQuery } from 'react-query';
import { getMyProfile, getUserProfile } from '@/api/user';
import FollowButton from './FollowButton';

interface UserUiProps {
  userId: string;
  loggedInEmail: string | null | undefined;
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
  preset: number;
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
  const isOwnProfile = userId === loggedInEmail;
  if (loggedInEmail === null) {
    isOwnProfile === false;
  }

  const {
    data,
    error,
    isSuccess,
  }: { data: UserPageData | undefined; error: any; isSuccess: any } =
    useQuery<UserPageData>(
      ['users', userId], // 쿼리 키를 배열로 설정하여 userId를 포함시킵니다.
      () =>
        isOwnProfile ? getMyProfile() : getUserProfile({ UserId: userId }),
      {
        // refetchOnWindowFocus: false,
      }
    );

  if (error) {
    return <div>Error loading user data.</div>;
  }

  return (
    <>
      {isSuccess && (
        <UserPageSection>
          <UserPageContainer>
            <UserProfileCard data={data} userId={userId} />
            <FollowButton profileUserId={data?.user?.userId} />
            <PostLike data={data} />
          </UserPageContainer>
        </UserPageSection>
      )}
    </>
  );
};

export default UserUi;
