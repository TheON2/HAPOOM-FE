import { UserPageContainer, UserPageSection } from '@/styles/user';
import UserProfileCard from './UserProfileCard';
import UserLikePostSuggestion from './UserLikePostSuggestion';
import PostLike from './PostLike';
import { useQuery } from 'react-query';
import { getUserProfile, getUsers } from '@/api/user';

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
  user: UserProfile;
  posts: UserPost[];
  likePosts: UserPost[];
}

const UserUi = () => {
  const { data } = useQuery<UserPageData>('users', getUserProfile);

  return (
    <UserPageSection>
      <UserPageContainer>
        <p>프로필</p>

        <UserProfileCard data={data} />
        <UserLikePostSuggestion />
        <PostLike data={data} />
      </UserPageContainer>
    </UserPageSection>
  );
};

export default UserUi;
