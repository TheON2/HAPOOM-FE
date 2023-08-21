import React, { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { NextPage } from 'next';
import { likePost } from '@/api/post';
import { useMutation } from 'react-query';
import HeartIcon from '@/components/common/HeartIcon';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import { ImageProps } from '@/types/home';
import { ImageContentLayout, ImageBox } from '@/styles/imageContainer';

const ImageContent = ({ src, alt, postId }: ImageProps) => {
  const router = useRouter();

  const handleImageBoxClick = (e: React.MouseEvent) => {
    e.preventDefault();
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
