import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from 'react-query';
import { likePost } from '@/api/post';
import { LikeCloud } from './SVG';
type iconType = {
  $isLike: boolean;
};

const HeartIconBox = styled.div<iconType>`
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: ${(props) => (props.$isLike ? `black` : `white`)}; */
  /* border-radius: 50%; */
  /* border: 2px solid black; */
  position: absolute;
  top: 0px;
  right: 0px;
  cursor: pointer;
  svg {
    transform: scale();
    path:nth-child(2) {
      fill: ${(props) => (props.$isLike ? `#2B66FF` : `#fff`)};
    }
  }
`;

type Props = {
  postId: number;
};

const HeartIcon = ({ postId }: Props) => {
  const [isLike, setIsLike] = useState<boolean>(false);
  const mutation = useMutation((postId: string) => likePost(postId));
  const onClickHeartHandler = (postId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setIsLike(!isLike);
    mutation.mutate(postId.toString());
  };
  return (
    <HeartIconBox
      onClick={(event) => onClickHeartHandler(postId, event)}
      $isLike={isLike}
    >
      <LikeCloud />
    </HeartIconBox>
  );
};

export default HeartIcon;
