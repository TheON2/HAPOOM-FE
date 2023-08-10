import React, { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { NextPage } from 'next';
import { likePost } from '@/api/post';
import { useMutation } from 'react-query';
import Link from 'next/link';
// import HeartIcon from './HeartIcon';
const ImageContentLayout = styled.div`
  padding-bottom: 100%;
  width: 100%;
  border: 1px solid black;
  position: relative;
  img {
    object-fit: cover;
  }
`;

type iconType = {
  $isLike: boolean;
};

const ImageBox = styled(Link)`
  display: block;
`;

const HeartIcon = styled.div<iconType>`
  width: 36px;
  height: 36px;
  background-color: ${(props) => (props.$isLike ? `black` : `white`)};
  border-radius: 50%;
  border: 2px solid black;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

type Props = {
  src: string;
  alt: string;
  postId: number;
};

const ImageContent: NextPage<Props> = ({ src, alt, postId }) => {
  const [isLike, setIsLike] = useState<boolean>(false);
  const mutation = useMutation((postId: number) => likePost(postId));
  const onClickHeartHandler = (postId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setIsLike(!isLike);
    mutation.mutate(postId);
  };
  return (
    <ImageContentLayout>
      <ImageBox href={`/detail/${postId}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1440px) 288px"
          // placeholder="blur"
          // blurDataURL={src}
        />
      </ImageBox>
      <HeartIcon
        onClick={(event) => onClickHeartHandler(postId, event)}
        $isLike={isLike}
      ></HeartIcon>
    </ImageContentLayout>
  );
};

export default ImageContent;
