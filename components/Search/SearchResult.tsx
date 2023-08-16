import React from 'react';
import ImageContent from '@/components/Home/ImageContent';
import { ImageContentsContainer } from '@/styles/imageContainer';
import { NoneSearchResult } from '@/styles/search';
type searchProps = {
  option: string;
  data: any[];
};
const SearchResult = ({ option, data }: searchProps) => {
  switch (option) {
    case 'user':
      return <NoneSearchResult>user search result</NoneSearchResult>;
    case 'content':
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
    case 'tag':
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
