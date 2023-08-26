import React from 'react';
import {
  LikePostSuggestionBox,
  ImageBox,
  InfoContainer,
  InfoText,
  InfoNumber,
} from '@/styles/user';
import { UserPageData } from './UserUi';

interface postsCountProps {
  data: UserPageData | undefined;
}

const UserLikePostSuggestion: React.FC<postsCountProps> = ({ data }) => {
  return (
    <LikePostSuggestionBox>
      <ImageBox>
        <InfoContainer>
          <InfoText>게시물</InfoText>
          <InfoNumber>{data?.postsCount}</InfoNumber>
        </InfoContainer>
      </ImageBox>
      <ImageBox>
        <InfoContainer>
          <InfoText>좋아요</InfoText>
          <InfoNumber>{data?.likePostsCount}</InfoNumber>
        </InfoContainer>
      </ImageBox>
    </LikePostSuggestionBox>
  );
};
export default UserLikePostSuggestion;
