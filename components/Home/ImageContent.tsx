import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { NextPage } from 'next';

const IMAGE_SIZE = 288;

const ImageContentLayout = styled.div`
  padding-bottom: 100%;
  width: 100%;
  /* width: ${IMAGE_SIZE}px;
  height: ${IMAGE_SIZE}px; */
  background-color: pink;
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
  return (
    <ImageContentLayout>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1440px) 288px"
        placeholder="blur"
        blurDataURL={src}
      />
      <HeartIcon></HeartIcon>
    </ImageContentLayout>
  );
};

export default ImageContent;
