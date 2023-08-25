import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ImageContent from '@/components/Home/ImageContent';
import { SectionTitle, HashtagContentsLayout } from '@/styles/home';
import { ImageContentsContainer } from '@/styles/imageContainer';
import { MainPageDataProps } from '@/types/home';
import { useQuery } from 'react-query';
import { getSearch } from '@/api/post';

type Props = {
  serverPropData: any[];
  tagData: any[];
  undefindeTag: any[];
  hashTag?: string;
  tagCategory: string;
};

const HashtagContents: React.FC<Props> = ({
  serverPropData,
  tagData,
  undefindeTag,
  hashTag,
  tagCategory,
}) => {
  console.log(undefindeTag);
  return (
    <HashtagContentsLayout>
      <div className="center">
        <SectionTitle>
          #{tagCategory === 'unique' ? hashTag : tagCategory}
        </SectionTitle>
        <ImageContentsContainer>
          <HashtagCategory
            tagCategory={tagCategory}
            serverPropData={serverPropData}
            tagData={tagData}
            undefindeTag={undefindeTag}
          />
          {/* {isAll
            ? serverPropData.map((content, index) => {
                return (
                  <ImageContent
                    key={index}
                    src={content?.image}
                    alt={'date'}
                    postId={content?.postId}
                  />
                );
              })
            : tagData?.map((content, index) => {
                return (
                  <ImageContent
                    key={index}
                    src={content?.Images[0]?.url}
                    alt={'date'}
                    postId={content?.postId}
                  />
                );
              })} */}
        </ImageContentsContainer>
      </div>
    </HashtagContentsLayout>
  );
};

export default HashtagContents;

const HashtagCategory = ({
  tagCategory,
  serverPropData,
  tagData,
  undefindeTag,
}: Props) => {
  switch (tagCategory) {
    case '전체':
      return (
        <>
          {serverPropData.map((content, index) => {
            return (
              <ImageContent
                key={index}
                src={content?.image}
                alt={'date'}
                postId={content?.postId}
              />
            );
          })}
        </>
      );
    case 'unique':
      return (
        <>
          {tagData?.map((content, index) => {
            return (
              <ImageContent
                key={index}
                src={content?.Images[0]?.url}
                alt={'date'}
                postId={content?.postId}
              />
            );
          })}
        </>
      );
    case '기타':
      return (
        <>
          {undefindeTag?.map((content, index) => {
            return (
              <ImageContent
                key={index}
                src={content?.image}
                alt={'date'}
                postId={content?.postId}
              />
            );
          })}
        </>
      );
    default:
      return <div>검색 결과가 없습니다</div>;
  }
};
