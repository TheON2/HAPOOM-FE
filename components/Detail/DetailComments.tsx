import React, { ChangeEvent, useCallback, useState } from 'react';
import Button from '@/components/common/Button';
import IconButton from '@/components/common/IconButton';
import Comment from '@/components/Detail/Comment';
import {
  CommentIcon,
  DeleteComment,
  EditComment,
} from '@/components/common/SVG';
import { addComment, deleteComment, updateComment } from '@/api/post';
import { useMutation, useQueryClient } from 'react-query';
import UpAndDownTab from '../common/UpAndDownTab';
import Modal from '../common/Modal';
import { useRouter } from 'next/router';
import {
  CommentsContainer,
  CommentBox,
  CommentInfomation,
  CommentButton,
  DetialContentSection,
  CommentForm,
  NoneComment,
} from '@/styles/detail';
import {
  CommentUpdateData,
  CommentUploadData,
  CommentDelete,
  CommentData,
  CommentBoxProps,
  CommentFormProps,
  commentProps,
  commentEditState,
  modalState,
} from '@/types/comment';

const CommentFormWrapper = ({
  isOpen,
  onSubmitHandler,
  closeForm,
  closeComment,
  comment,
  onChangeCommentHandler,
  editTitle,
  editButton,
}: CommentFormProps) => (
  <UpAndDownTab onClickEvent={closeForm} $isUp={isOpen}>
    <DetialContentSection>
      <CommentForm onSubmit={onSubmitHandler}>
        <h3>{editTitle}</h3>
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
          <Button onClick={closeComment} className="secondary">
            닫기
          </Button>
          <Button type="submit">{editButton}</Button>
        </div>
      </CommentForm>
    </DetialContentSection>
  </UpAndDownTab>
);

const LOGIN_MODAL_MESSAGE = {
  actionText: '로그인',
  modalMessge: '로그인이 필요한 서비스입니다. 로그인 하시겠습니까?',
};

const CommentLayout = ({ data, id, userData }: commentProps) => {
  const [active, setActive] = useState<number | null>(null);
  const updateButtonActive = (idx: number) => {
    setActive(idx);
  };
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

  const onChangeCommentHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(e.target.value);
  };
  const { mutate: commentCreate } = useMutation<void, Error, CommentUploadData>(
    (comment) => addComment(comment),
    {
      onSuccess: () => {
        setIsShow(false);
        setComment('');
        queryClient.invalidateQueries(['comment', id]);
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
        queryClient.invalidateQueries(['comment', id]);
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
        queryClient.invalidateQueries(['comment', id]);
      },
    }
  );

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

      {isShow && (
        <CommentFormWrapper
          isOpen={commentEdit.show}
          onSubmitHandler={onSubmitHandler}
          closeForm={handleCommentShowHandler}
          closeComment={handleCommentExitHandler}
          comment={comment}
          onChangeCommentHandler={onChangeCommentHandler}
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
