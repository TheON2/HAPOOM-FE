import React from 'react';
import {
  LikePostSuggestionBox,
  ImageBox,
  InfoContainer,
  InfoText,
  InfoNumber,
} from '@/styles/user';
import Image from 'next/image';
import { UserPageData } from './UserUi';
import { Star, UserLike, UserPost } from '../common/SVG';

interface postsCountProps {
  data: UserPageData | undefined;
}

const UserLikePostSuggestion: React.FC<postsCountProps> = ({ data }) => {
  return (
    <LikePostSuggestionBox>
      <ImageBox>
        <UserLike />
        <InfoContainer>
          <InfoText>좋아요</InfoText>
          <InfoNumber>{data?.likePostsCount}</InfoNumber>
        </InfoContainer>
      </ImageBox>
      <ImageBox>
        <UserPost />
        <InfoContainer>
          <InfoText>게시물</InfoText>
          <InfoNumber>{data?.postsCount}</InfoNumber>
        </InfoContainer>
      </ImageBox>
      <ImageBox>
        <Star />
        <InfoContainer>
          <InfoText>북마크</InfoText>
          <InfoNumber>99</InfoNumber>
        </InfoContainer>
      </ImageBox>
    </LikePostSuggestionBox>
  );
};
export default UserLikePostSuggestion;
