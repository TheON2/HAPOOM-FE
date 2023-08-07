import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { NextPage } from 'next';
import { likePost } from '@/api/post';
import { useMutation } from 'react-query';
import Link from 'next/link';

const ImageContentLayout = styled(Link)`
  display: block;
  padding-bottom: 100%;
  width: 100%;
  border: 1px solid black;
  position: relative;
  img {
    object-fit: cover;
  }
`;
const HeartIcon = styled.div`
  width: 36px;
  height: 36px;
  background-color: black;
  border-radius: 50%;
  position: absolute;
  top: 10px;
  right: 10px;
`;

type Props = {
  src: string;
  alt: string;
};

const ImageContent: NextPage<Props> = ({ src, alt }) => {
  const mutation = useMutation((postId: string) => likePost(postId));
  const onClickHeartHandler = async (postId: string) => {
    await mutation.mutateAsync(postId);
  };
  return (
    <ImageContentLayout href={'/home/Home'}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1440px) 288px"
        placeholder="blur"
        blurDataURL={src}
      />
      <HeartIcon onClick={() => onClickHeartHandler(`1`)}></HeartIcon>
    </ImageContentLayout>
  );
};

export default ImageContent;
