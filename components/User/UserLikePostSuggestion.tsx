import React from 'react';
import {
  LikePostSuggestionBox,
  ImageBox,
  InfoContainer,
  InfoText,
  InfoNumber,
} from '@/styles/user';
import cloud from '../../public/🦆 icon _cloud_.svg';
import square from '../../public/🦆 icon _image_.svg';
import star from '../../public/🦆 icon _star_.svg';
import Image from 'next/image';
import { UserPageData } from './UserUi';

interface postsCountProps {
  data: UserPageData | undefined;
}

const UserLikePostSuggestion: React.FC<postsCountProps> = ({ data }) => {
  console.log(data);
  return (
    <LikePostSuggestionBox>
      <ImageBox>
        <Image
          src={cloud}
          alt="좋아요"
          width={40}
          height={40}
          objectFit="cover"
        />
        <InfoContainer>
          <InfoText>좋아요</InfoText>
          <InfoNumber>{data?.likePostsCount}</InfoNumber>
        </InfoContainer>
      </ImageBox>
      <ImageBox>
        <Image
          src={square}
          alt="게시물"
          width={40}
          height={40}
          objectFit="cover"
        />
        <InfoContainer>
          <InfoText>게시물</InfoText>
          <InfoNumber>{data?.postsCount}</InfoNumber>
        </InfoContainer>
      </ImageBox>
      <ImageBox>
        <Image
          src={star}
          alt="추천아이콘"
          width={40}
          height={40}
          objectFit="cover"
        />
        <InfoContainer>
          <InfoText>북마크</InfoText>
          <InfoNumber>99</InfoNumber>
        </InfoContainer>
      </ImageBox>
    </LikePostSuggestionBox>
  );
};
export default UserLikePostSuggestion;
