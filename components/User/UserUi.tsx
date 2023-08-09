import { UserPageContainer, UserPageSection } from '@/styles/user';
import UserProfileCard from './UserProfileCard';
import UserLikePostSuggestion from './UserLikePostSuggestion';
import PostLike from './PostLike';
import { useQuery } from 'react-query';
import { getUsers } from '@/api/user';

const UserUi = () => {
  const { data } = useQuery('users', getUsers);
  console.log('data', data);
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
