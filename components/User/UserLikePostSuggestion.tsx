import React from 'react';
import { LikePostSuggestionBox, IconImage, ImageBox } from '@/styles/user';
import cloud from '../../public/🦆 icon _cloud_.svg';
import square from '../../public/🦆 icon _image_.svg';
import star from '../../public/🦆 icon _star_.svg';
import Image from 'next/image';
import styled from 'styled-components';

const UserLikePostSuggestion = () => {
  return (
    <LikePostSuggestionBox>
      <ImageBox>
        <Image src={cloud} alt="좋아요" width={40} height={40} />
        <p style={{ fontSize: '16px', fontWeight: '300' }}>좋아요</p>
        <p style={{ fontSize: '30px', fontWeight: '900' }}>3</p>
      </ImageBox>
      <ImageBox>
        <Image src={square} alt="게시물" width={40} height={40} />
        <p style={{ fontSize: '16px', fontWeight: '300' }}>게시물</p>
        <p style={{ fontSize: '30px', fontWeight: '900' }}>3</p>
      </ImageBox>
      <ImageBox>
        <Image src={star} alt="추천" width={40} height={40} />
        <p style={{ fontSize: '16px', fontWeight: '300' }}>추천</p>
        <p style={{ fontSize: '30px', fontWeight: '900' }}>3</p>
      </ImageBox>
    </LikePostSuggestionBox>
  );
};
export default UserLikePostSuggestion;
