import React, { ChangeEvent, useCallback, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/common/Button';
import IconButton from '@/components/common/IconButton';
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

const timeSince = (date: string) => {
  const now: Date = new Date();
  const inputDate: Date = new Date(date);
  const seconds: number = Math.floor(
    (now.getTime() - inputDate.getTime()) / 1000
  );
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

const Comment = ({
  onClickUpdateEvent,
  onClickDeleteEvent,
  updateButtonActive,
  active,
  data,
  loggedUser,
}: CommentBoxProps) => {
  const updateButtonHandler = (commentId: number, comment: string) => {
    onClickUpdateEvent(commentId, comment);
    updateButtonActive(commentId);
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
  console.log(data);
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
