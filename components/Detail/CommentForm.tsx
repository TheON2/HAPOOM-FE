import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Button from '@/components/common/Button';
import IconButton from '@/components/common/IconButton';
import Comment from '@/components/Detail/Comment';
import {
  CommentIcon,
  DeleteComment,
  EditComment,
} from '@/components/common/SVG';
import { addComment, deleteComment, updateComment } from '@/apis/post';
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
  TextareaBox,
  LimitNumBox,
} from '@/styles/detail';
import {
  CommentUpdateData,
  CommentUploadData,
  CommentFormProps,
  modalState,
} from '@/types/comment';
import useModal from '@/hooks/useModal';

const CommentFormWrapper = ({
  isOpen,
  closeForm,
  closeComment,
  comment,
  setComment,
  commentEdit,
  editTitle,
  editButton,
  id,
  setIsShow,
  setActive,
}: CommentFormProps) => {
  const queryClient = useQueryClient();
  const [editComment, setEditComment] = useState(comment ? comment : '');
  const [isMaxLength, setIsMaxLength] = useState<boolean>(false);
  const maxLength = 140;
  const onChangeCommentHandler = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (event.currentTarget.value.length <= maxLength) {
        setEditComment(event.currentTarget.value);
      }
    },
    [setComment]
  );
  useEffect(() => {
    if (editComment.length >= maxLength) {
      setIsMaxLength(true);
    } else {
      setIsMaxLength(false);
    }
  }, [editComment]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessge, setModalMessge] = useState<modalState>({
    actionText: '',
    modalMessge: '',
    onClickEvent: null,
  });
  const { mutate: commentCreate } = useMutation<void, Error, CommentUploadData>(
    (comment) => addComment(comment),
    {
      onSuccess: () => {
        setIsShow(false);
        setComment('');
        queryClient.invalidateQueries(['comment']);
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
        queryClient.invalidateQueries(['comment']);
      },
    }
  );

  const onClickCreateCommentHandler = () => {
    const formData = new FormData();
    formData.append('comment', editComment);
    commentCreate({ formData, id });
  };

  const onClickUpdateCommentHandler = () => {
    const formData = new FormData();
    formData.append('comment', editComment);
    const commentId = commentEdit.commentId;
    commentUpdate({ formData, id, commentId });
  };

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (editComment === '') {
      setModalMessge({
        actionText: '확인',
        modalMessge: '댓글에 내용을 입력해주세요.',
        onClickEvent: null,
      });
      setIsModalOpen(true);
      return;
    }
    if (commentEdit.action === 'create') {
      return onClickCreateCommentHandler();
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
      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        actionText={modalMessge.actionText}
        onClickEvent={modalMessge.onClickEvent}
      >
        {modalMessge.modalMessge}
      </Modal>
      <UpAndDownTab onClickEvent={closeForm} $isUp={isOpen}>
        <DetialContentSection $marginTop={'0'}>
          <CommentForm onSubmit={onSubmitHandler}>
            <h3>{editTitle}</h3>
            <TextareaBox>
              <textarea
                name=""
                id=""
                placeholder="댓글을 입력해주세요"
                value={editComment}
                onChange={onChangeCommentHandler}
              />
              <LimitNumBox $color={isMaxLength}>
                {editComment.length}/{maxLength}
              </LimitNumBox>
            </TextareaBox>
            <div className="button-box">
              <Button onClick={closeComment} className="secondary">
                닫기
              </Button>
              <Button type="submit">{editButton}</Button>
            </div>
          </CommentForm>
        </DetialContentSection>
      </UpAndDownTab>
    </>
  );
};

export default CommentFormWrapper;
