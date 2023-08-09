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
};

const ImageContent: NextPage<Props> = ({ src, alt }) => {
  const [isLike, setIsLike] = useState<boolean>(false);
  const mutation = useMutation((postId: string) => likePost(postId));
  const onClickHeartHandler = (postId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setIsLike(!isLike);
  };
  return (
    <ImageContentLayout>
      <ImageBox href="/home/Home">
<<<<<<< HEAD
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1440px) 288px"
          // placeholder="blur"
          // blurDataURL={src}
        />
=======
        <Image src={src} alt={alt} fill sizes="(max-width: 1440px) 288px" />
>>>>>>> 22a7fedd2e32f471327fd8700c17a756e1ef1462
      </ImageBox>
      <HeartIcon
        onClick={(event) => onClickHeartHandler(`1`, event)}
        $isLike={isLike}
      ></HeartIcon>
    </ImageContentLayout>
  );
};

export default ImageContent;
