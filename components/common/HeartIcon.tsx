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
  /* border: 2px solid black; */
  background-color: ${(props) => (props.$isLike ? `#0084FF` : `#538cc080`)};

  /* background-color: #538cc0; */
  border-radius: 50%;
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  svg {
    transform: translate(-1px, -1px);
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
      className="heart"
    >
      <LikeCloud />
    </HeartIconBox>
  );
};

export default HeartIcon;
