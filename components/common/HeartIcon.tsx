import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from 'react-query';
import { likePost } from '@/api/post';
import { LikeCloud } from './SVG';
import { UserState } from '@/redux/reducers/userSlice';
import { RootState } from '@/redux/config/configStore';
import { useSelector } from 'react-redux';
import Modal from './Modal';
import { useRouter } from 'next/router';
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
  postId: number | string;
};

const HeartIcon = ({ postId }: Props) => {
  const [isLike, setIsLike] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const { user }: { user: UserState['user'] } = useSelector(
    (state: RootState) => state.user
  );
  const mutation = useMutation((postId: string) => likePost(postId));
  const modalHandler = () => {
    router.push('/auth/SignIn');
  };
  const onClickHeartHandler = (
    postId: number | string,
    event: React.MouseEvent
  ) => {
    event.stopPropagation();
    if (user.email === null) {
      setIsOpen(!isOpen);
      // return alert(
      //   '로그인 후 이용할 수 있는 서비스 입니다. 로그인 하시겠습니까?'
      // );
    } else {
      setIsLike(!isLike);
      mutation.mutate(postId.toString());
    }
  };
  return (
    <>
      <HeartIconBox
        onClick={(event) => onClickHeartHandler(postId, event)}
        $isLike={isLike}
        className="heart"
      >
        <LikeCloud />
      </HeartIconBox>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        actionText={'로그인'}
        onClickEvent={modalHandler}
      >
        로그인 후 이용할 수 있는 서비스 입니다.
        <br /> 로그인 하시겠습니까?
      </Modal>
    </>
  );
};

export default HeartIcon;
