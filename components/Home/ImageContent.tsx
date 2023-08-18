import React, { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { NextPage } from 'next';
import { likePost } from '@/api/post';
import { useMutation } from 'react-query';
import Link from 'next/link';
import HeartIcon from '@/components/common/HeartIcon';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
const ImageContentLayout = styled.div`
  /* padding-bottom: 100%; */
  width: 100%;
  /* border: 1px solid black; */
  position: relative;
`;

type iconType = {
  $isLike: boolean;
};

const ImageBox = styled(Link)`
  display: block;
  position: relative;

  width: 100%;
  padding-bottom: 100%;
  img {
    object-fit: cover;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    user-select: none;
  }
`;

type Props = {
  src: string;
  alt: string;
  postId: number;
};

const ImageContent: NextPage<Props> = ({ src, alt, postId }) => {
  const router = useRouter();

  const handleImageBoxClick = (e: React.MouseEvent) => {
    e.preventDefault(); // 링크 기본 동작 방지
    setCookie(null, 'updateId', JSON.stringify(postId), { path: '/' });
    setCookie(null, 'update', '3', { path: '/' });
    router.push(`/detail/${postId}`);
  };
  return (
    <ImageContentLayout>
      <ImageBox href={`/detail/${postId}`} onClick={handleImageBoxClick}>
        <Image src={src} alt={alt} fill sizes="(max-width: 1440px) 288px" />
      </ImageBox>
      <HeartIcon postId={postId} />
    </ImageContentLayout>
  );
};

export default ImageContent;
