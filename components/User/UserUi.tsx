import { UserPageContainer, UserPageSection } from '@/styles/user';
import UserProfileCard from './UserProfileCard';
import UserLikePostSuggestion from './UserLikePostSuggestion';
import PostLike from './PostLike';

const UserUi = () => {
  return (
    <UserPageSection>
      <UserPageContainer>
        <p>프로필</p>

        <UserProfileCard />
        <UserLikePostSuggestion />
        <PostLike />
      </UserPageContainer>
    </UserPageSection>
  );
};

export default UserUi;
