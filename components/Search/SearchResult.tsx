import React from 'react';
import ImageContent from '@/components/Home/ImageContent';
import { ImageContentsContainer } from '@/styles/imageContainer';
import { NoneSearchResult } from '@/styles/search';
import UserSearchResult from '@/components/Search/UserSearchResult';
type searchProps = {
  option: string;
  data: any[];
};

const userData = [
  {
    userImage: '/b1.png',
    preset: 1,
    nickname: '닉네임',
    email: 'aaa@gmail.com',
  },
  {
    userImage: '/b1.png',
    preset: 2,
    nickname: '닉네임',
    email: 'aaa@gmail.com',
  },
  {
    userImage: '/b1.png',
    preset: 3,
    nickname: '닉네임',
    email: 'aaa@gmail.com',
  },
  {
    userImage: '/b1.png',
    preset: 4,
    nickname: '닉네임',
    email: 'aaa@gmail.com',
  },
  {
    userImage: '/b1.png',
    preset: 5,
    nickname: '닉네임',
    email: 'aaa@gmail.com',
  },
  {
    userImage: '/b1.png',
    preset: 1,
    nickname: '닉네임',
    email: 'aaa@gmail.com',
  },
];

const SearchResult = ({ option, data }: searchProps) => {
  switch (option) {
    case 'users':
      return (
        <>
          {data.map((user, idx) => {
            return (
              <UserSearchResult
                key={idx}
                userImage={user.userImage}
                nickname={user.nickname}
                email={user.email}
                preset={user.preset}
                userId={user.userId}
              />
            );
          })}
        </>
      );
    case 'posts':
      return (
        <ImageContentsContainer>
          {data.map((result, idx) => {
            return (
              <ImageContent
                key={idx}
                src={result.src}
                alt={result.alt}
                postId={idx}
              />
            );
          })}
        </ImageContentsContainer>
      );
    case 'tags':
      return (
        <ImageContentsContainer>
          {data.map((result, idx) => {
            return (
              <ImageContent
                key={idx}
                src={result.src}
                alt={result.alt}
                postId={idx}
              />
            );
          })}
        </ImageContentsContainer>
      );
    default:
      return <NoneSearchResult>검색 결과가 없습니다</NoneSearchResult>;
  }
};

export default SearchResult;
