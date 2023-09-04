import React, { ChangeEvent, useCallback, useState } from 'react';
import Comment from '@/components/Detail/Comment';
import { CommentIcon } from '@/components/common/SVG';
import { addComment, deleteComment, updateComment } from '@/api/post';
import { useMutation, useQueryClient } from 'react-query';
import Modal from '../common/Modal';
import { useRouter } from 'next/router';
import { CommentButton, NoneComment } from '@/styles/detail';
import {
  CommentDelete,
  CommentData,
  commentProps,
  commentEditState,
  modalState,
} from '@/types/comment';
import CommentFormWrapper from '@/components/Detail/CommentForm';

const LOGIN_MODAL_MESSAGE = {
  actionText: '로그인',
  modalMessge: '로그인이 필요한 서비스입니다. 로그인 하시겠습니까?',
};

const CommentLayout = ({ data, id, userData }: commentProps) => {
  const [active, setActive] = useState<number | null>(null);

  const [isShow, setIsShow] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');
  const queryClient = useQueryClient();
  const router = useRouter();
  const [commentEdit, setCommentEdit] = useState<commentEditState>({
    show: false,
    action: '',
    uiTitle: '',
    buttonText: '',
    commentId: 0,
  });
  const [modalMessge, setModalMessge] = useState<modalState>({
    actionText: '',
    modalMessge: '',
    onClickEvent: null,
  });
  const requireLogin = () => {
    setModalMessge({
      ...LOGIN_MODAL_MESSAGE,
      onClickEvent: () => router.push('/auth/SignIn'),
    });
    setIsModalOpen(true);
  };
  //comment
  const updateButtonActive = (idx: number) => {
    setActive(idx);
  };
  //comment
  const handleCommentEditHandler = (commentId: number, preComment: string) => {
    if (userData === null || userData === undefined) {
      return requireLogin();
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
  //comment
  const onClickDeleteCommentHandler = (commentId: number) => {
    if (userData === null || userData === undefined) {
      return requireLogin();
    } else {
      setModalMessge({
        actionText: '삭제',
        modalMessge: '댓글을 삭제하시겠습니까?',
        onClickEvent: () => commentDelete({ id, commentId }),
      });
      setIsModalOpen(true);
    }
  };

  const handleCommentCreateHandler = () => {
    if (userData === null || userData === undefined) {
      return requireLogin();
    } else {
      setIsShow(true);
      setCommentEdit({
        show: true,
        action: 'create',
        uiTitle: '댓글 생성',
        buttonText: '업로드',
        commentId: 0,
      });
    }
  };
  const handleCommentShowHandler = () => {
    setCommentEdit((pre: commentEditState) => ({
      ...pre,
      show: !commentEdit.show,
    }));
  };
  const handleCommentExitHandler = () => {
    setIsShow(!isShow);
    setComment('');
    setActive(null);
  };

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
        queryClient.invalidateQueries(['comment']);
      },
    }
  );

  return (
    <>
      {data?.length !== 0 ? (
        data?.map((comment: CommentData, idx: number) => (
          <Comment
            key={idx}
            onClickUpdateEvent={handleCommentEditHandler}
            onClickDeleteEvent={onClickDeleteCommentHandler}
            updateButtonActive={updateButtonActive}
            active={active}
            data={comment}
            loggedUser={userData}
          />
        ))
      ) : (
        <NoneComment>
          댓글이 없습니다.
          <br /> 첫번째 댓글을 남겨보세요.
        </NoneComment>
      )}
      <CommentButton onClick={handleCommentCreateHandler}>
        <CommentIcon />
        댓글
      </CommentButton>
      {isShow && (
        <CommentFormWrapper
          isOpen={commentEdit.show}
          closeForm={handleCommentShowHandler}
          closeComment={handleCommentExitHandler}
          comment={comment}
          setComment={setComment}
          commentEdit={commentEdit}
          id={id}
          setIsShow={setIsShow}
          setActive={setActive}
          editTitle={commentEdit.uiTitle}
          editButton={commentEdit.buttonText}
        />
      )}
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
