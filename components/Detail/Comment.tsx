import React, { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/common/Button';
import IconButton from '@/components/common/IconButton';
import {
  CommentIcon,
  DeleteComment,
  EditComment,
} from '@/components/common/SVG';
import styled from 'styled-components';
import { addComment, deleteComment, updateComment } from '@/api/post';
import { useMutation, useQueryClient } from 'react-query';
import UpAndDownTab from '../common/UpAndDownTab';
import Modal from '../common/Modal';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
const CommentsContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid #ddd;
`;
const CommentBox = styled.div`
  width: 100%;
  padding: 16px 0;
  .comment-profile {
    display: flex;
    gap: 12px;
  }
  .comment-image {
    width: 36px;
    height: 36px;
    border-radius: 18px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .comment {
    width: calc(100% - 48px);
    margin: 4px 0 0 auto;
    color: #737373;
    font-size: 12px;
    height: 70px;

    p {
      padding: 14px 12px 12px;
      line-height: 20px;
    }

    textarea {
      resize: none;
      width: 100%;
      height: 70px;
      padding: 14px 12px 12px;
      font-size: 12px;
      line-height: 20px;
      color: #737373;
      border: none;
      background-color: #f0efef;
      border-radius: 3px;
    }
  }
`;
const CommentInfomation = styled.div`
  width: calc(100% - 48px);
  display: flex;
  justify-content: space-between;
  .comment-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    p {
      font-weight: 700;
      font-size: 12px;
      line-height: 12px;
      margin-bottom: 6px;
    }
    span {
      color: #b7b4b4;
      font-size: 8px;
      line-height: 8px;
    }
  }
  .comment-button-box {
    display: flex;
    &.active button:nth-child(1) svg path {
      fill: #369dfe;
    }
  }
`;

type styleProps = {
  $up: boolean;
};

const CreateComment = styled.div<styleProps>`
  width: 100%;
  /* height: 80vh; */
  padding: 20px 24px;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 15;
  border-radius: 25px 25px 0 0;
  background-color: #fff;
  box-shadow: 0px -5px 10px rgba(0, 0, 0, 0.2);
  transform: ${(props) => (props.$up ? `translateY(0)` : `translateY(70%)`)};
  transition: all 0.8s ease-in-out;
  span {
    display: block;
    width: 23px;
    height: 3px;
    margin: 0 auto 25px;
    border-radius: 2px;
    background-color: #ddd;
  }
`;

const CommentForm = styled.form`
  width: 100%;
  padding: 8px 0;
  textarea {
    width: 100%;
    height: 141px;
    padding: 16px 12px;
    margin-top: 8px;
    resize: none;
    border: 1px solid #0084ff;
    border-radius: 3px;
    ::placeholder {
      color: #b3b3b3;
    }
  }
`;

const DetialContentSection = styled.section`
  margin-bottom: 40px;
  h3 {
    width: 100%;
    padding-bottom: 8px;
    border-bottom: 1px solid #cdcdcd;
    font-size: 16px;
    line-height: 16px;
    &::after {
      content: '';
      display: block;
      position: relative;
      bottom: -10px;
      width: 60px;
      height: 3px;
      background-color: #0084ff;
    }
  }
  .comments-header {
    display: flex;
    gap: 8px;
    h3 {
      width: 60%;
    }
    button {
      width: 40%;
      padding: 4px 22px 2px;
    }
  }
  .button-box {
    width: 100%;
    display: flex;
    gap: 8px;
    button {
      width: 50%;
      /* padding: 4px 4px 2px; */
    }
  }
  & > div:last-child {
    border: none;
  }
`;

const CommentButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2px 0 0;
  gap: 2px;
  color: #fff;
  font-size: 10px;
  position: fixed;
  right: 24px;
  bottom: 20vh;
  background-color: #52acff;
  border: none;
  z-index: 15;
`;

type Props = {
  onClickUpdateEvent: (commentId: number, preComment: string) => void;
  onClickDeleteEvent: (commentId: number) => void;
  updateButtonActive: (commentId: number) => void;
  active: number | null;
  data: any;
  loggedUser: any;
};
type CommentData = {
  formData: FormData;
  id: string;
};

type CommentUpdateData = {
  formData: FormData;
  id: string;
  commentId: number;
};

type CommentDelete = {
  id: string;
  commentId: number;
};
const Comment = ({
  onClickUpdateEvent,
  onClickDeleteEvent,
  updateButtonActive,
  active,
  data,
  loggedUser,
}: Props) => {
  const updateButtonHandler = (commentId: number, comment: string) => {
    onClickUpdateEvent(commentId, comment);
    updateButtonActive(commentId);
  };
  console.log(loggedUser);
  const timeSince = (date: string) => {
    const now: any = new Date();
    const inputDate: any = new Date(date);
    const seconds = Math.floor((now - inputDate) / 1000);

    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return days + '일 전';
    } else if (hours > 0) {
      return hours + '시간 전';
    } else if (minutes > 0) {
      return minutes + '분 전';
    } else {
      return '방금 전';
    }
  };
  const timeAgo = timeSince(data.createdAt);
  return (
    <>
      <CommentsContainer>
        <CommentBox>
          <div className="comment-profile">
            <div className="comment-image">
              <Image src={data.userImage} alt="" width={100} height={100} />
            </div>
            <CommentInfomation>
              <div className="comment-info">
                <p>{data.nickname}</p>
                <span>{timeAgo}</span>
              </div>
              {data.nickname === loggedUser?.nickname ? (
                <div
                  className={
                    active === data.commentId
                      ? 'active comment-button-box'
                      : 'comment-button-box'
                  }
                >
                  <IconButton
                    onClick={() =>
                      updateButtonHandler(data.commentId, data.comment)
                    }
                  >
                    <EditComment />
                  </IconButton>
                  <IconButton
                    onClick={() => onClickDeleteEvent(data.commentId)}
                  >
                    <DeleteComment />
                  </IconButton>
                </div>
              ) : null}
            </CommentInfomation>
          </div>
          <div className="comment">
            <p>{data.comment}</p>
          </div>
        </CommentBox>
      </CommentsContainer>
    </>
  );
};

type commentProps = {
  data: any;
  id: string;
  userData: any;
  writeUser: any;
};

const CommentLayout = ({ data, id, userData, writeUser }: commentProps) => {
  // console.log(data);
  // console.log(writeUser);
  const [active, setActive] = useState<number | null>(null);
  const updateButtonActive = (idx: number) => {
    setActive(idx);
  };
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');
  const queryClient = useQueryClient();
  const router = useRouter();
  const [commentEdit, setCommentEdit] = useState<any>({
    show: false,
    action: '',
    uiTitle: '',
    buttonText: '',
    postId: '',
  });
  const [modalMessge, setModalMessge] = useState<any>({
    actionText: '',
    modalMessge: '',
    onClickEvent: '',
  });
  const handleCommentEditHandler = (commentId: number, preComment: string) => {
    if (userData === null || userData === undefined) {
      setModalMessge({
        actionText: '로그인',
        modalMessge: '로그인이 필요한 서비스입니다. 로그인 하시겠습니까?',
        onClickEvent: () => router.push('/auth/SignIn'),
      });
      return setIsModalOpen(true);
    } else {
      setIsShow(true);
      setCommentEdit({
        show: true,
        action: 'edit',
        uiTitle: '댓글 수정',
        buttonText: '수정',
        commentId: commentId,
      });
      setComment(preComment);
    }
  };

  const handleCommentCreateHandler = () => {
    if (userData === null || userData === undefined) {
      setModalMessge({
        actionText: '로그인',
        modalMessge: '로그인이 필요한 서비스입니다. 로그인 하시겠습니까?',
        onClickEvent: () => router.push('/auth/SignIn'),
      });
      return setIsModalOpen(true);
    } else {
      setIsShow(true);
      setCommentEdit({
        show: true,
        action: 'create',
        uiTitle: '댓글 생성',
        buttonText: '업로드',
        commentId: '',
      });
    }
  };
  const handleCommentShowHandler = () => {
    setCommentEdit((pre: any) => ({
      ...pre,
      show: !commentEdit.show,
    }));
  };
  const handleCommentExitHandler = () => {
    setIsShow(!isShow);
    setActive(null);
  };

  const onChangeCommentHandler = (e: any) => {
    setComment(e.target.value);
  };
  const { mutate: commentCreate } = useMutation<void, Error, CommentData>(
    (comment) => addComment(comment),
    {
      onSuccess: () => {
        setIsShow(false);
        setComment('');
        queryClient.invalidateQueries('comments');
      },
    }
  );
  const { mutate: commentUpdate } = useMutation<void, Error, CommentUpdateData>(
    (comment) => updateComment(comment),
    {
      onSuccess: () => {
        setIsShow(false);
        setComment('');
        setActive(null);
        queryClient.invalidateQueries('comments');
      },
    }
  );

  const { mutate: commentDelete } = useMutation<void, Error, CommentDelete>(
    (comment) => deleteComment(comment),
    {
      onSuccess: () => {
        setModalMessge({
          actionText: '확인',
          modalMessge: '댓글이 삭제되었습니다.',
          onClickEvent: null,
        });
        setIsModalOpen(true);
        queryClient.invalidateQueries('comments');
      },
    }
  );

  const onClickDeleteCommentHandler = (commentId: number) => {
    if (userData === null || userData === undefined) {
      setModalMessge({
        actionText: '로그인',
        modalMessge: '로그인이 필요한 서비스입니다. 로그인 하시겠습니까?',
        onClickEvent: () => router.push('/auth/SignIn'),
      });
      return setIsModalOpen(true);
    } else {
      setModalMessge({
        actionText: '삭제',
        modalMessge: '댓글을 삭제하시겠습니까?',
        onClickEvent: () => commentDelete({ id, commentId }),
      });
      setIsModalOpen(true);
    }
  };

  const onClickCreateCommentHandler = () => {
    const formData = new FormData();
    formData.append('comment', comment);
    commentCreate({ formData, id });
  };

  const onClickUpdateCommentHandler = () => {
    const formData = new FormData();
    formData.append('comment', comment);
    const commentId = commentEdit.commentId;
    commentUpdate({ formData, id, commentId });
  };

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment === '') {
      return alert('입력된 내용이 없습니다.');
    }
    if (commentEdit.action === 'create') {
      setModalMessge({
        actionText: '저장',
        modalMessge: '댓글을 저장하시겠습니까?',
        onClickEvent: onClickCreateCommentHandler,
      });
    } else if (commentEdit.action === 'edit') {
      setModalMessge({
        actionText: '수정',
        modalMessge: '댓글을 수정하시겠습니까?',
        onClickEvent: onClickUpdateCommentHandler,
      });
    }
    setIsModalOpen(true);
  };
  return (
    <>
      <CommentButton onClick={handleCommentCreateHandler}>
        <CommentIcon />
        댓글
      </CommentButton>
      {data?.comments.map((comment: any, idx: number) => (
        <Comment
          key={idx}
          onClickUpdateEvent={handleCommentEditHandler}
          onClickDeleteEvent={onClickDeleteCommentHandler}
          updateButtonActive={updateButtonActive}
          active={active}
          data={comment}
          loggedUser={userData}
        />
      ))}
      {isShow ? (
        <UpAndDownTab
          onClickEvent={handleCommentShowHandler}
          $isUp={commentEdit.show}
        >
          <DetialContentSection>
            <CommentForm onSubmit={onSubmitHandler}>
              <h3>{commentEdit.uiTitle}</h3>

              <div>
                <textarea
                  name=""
                  id=""
                  placeholder="댓글을 입력해주세요"
                  value={comment}
                  onChange={onChangeCommentHandler}
                />
              </div>
              <div className="button-box">
                <Button
                  onClick={handleCommentExitHandler}
                  className="secondary"
                >
                  닫기
                </Button>
                <Button type="submit">{commentEdit.buttonText}</Button>
              </div>
            </CommentForm>
          </DetialContentSection>
        </UpAndDownTab>
      ) : null}
      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        actionText={modalMessge.actionText}
        onClickEvent={modalMessge.onClickEvent}
      >
        {modalMessge.modalMessge}
      </Modal>
    </>
  );
};

export default CommentLayout;
