import React, { useState } from 'react';
import styled from 'styled-components';

type iconType = {
  $isLike: boolean;
};

const HeartIconBox = styled.div<iconType>`
  width: 36px;
  height: 36px;
  background-color: ${(props) => (props.$isLike ? `black` : `white`)};
  border-radius: 50%;
  border: 2px solid black;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const HeartIcon = () => {
  const [isLike, setIsLike] = useState<boolean>(false);
  const onClickHeartHandler = (postId: string) => {
    setIsLike(!isLike);
  };
  return (
    <HeartIconBox onClick={() => onClickHeartHandler(`1`)} $isLike={isLike}>
      HeartIcon
    </HeartIconBox>
  );
};

export default HeartIcon;
