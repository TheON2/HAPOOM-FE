import React, { useState } from 'react';
import {
  Buttons,
  CancelButton,
  ConfirmButton,
  Content,
  ModalBackground,
  ModalContainer,
  Title,
  TitleContainer,
} from '@/styles/commentModal';

interface CommentModalProps {
  initialMode: 'create' | 'edit';
  isOpen: boolean;
  initialComment?: string;
  onSubmit?: (comment: string) => void;
  onClose?: (e: any) => void;
  onCommentChange?: (comment: string) => void;
}

const CommentModal = ({
  initialMode,
  isOpen,
  initialComment,
  onSubmit,
  onClose,
}: CommentModalProps) => {
  const [comment, setComment] = useState(
    initialMode === 'edit' ? initialComment : ''
  );

  const handlePostComment = () => {
    // console.log('Post comment:', comment);
    setComment('');
  };

  const handleUpdateComment = () => {
    // console.log('Update comment:', comment);
    setComment('');
  };

  return (
    <>
      {isOpen && (
        <ModalBackground onClick={(e) => (onClose ? onClose(e) : null)}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <TitleContainer>
              <Title>
                {initialMode === 'create' ? '댓글 입력' : '댓글 수정'}
              </Title>
              <Buttons>
                <CancelButton
                  onClick={(e) => {
                    onClose?.(e);
                    setComment('');
                  }}
                >
                  닫기
                </CancelButton>
                <ConfirmButton
                  onClick={
                    initialMode === 'create'
                      ? handlePostComment
                      : handleUpdateComment
                  }
                >
                  {initialMode === 'create' ? '올리기' : '수정하기'}
                </ConfirmButton>
              </Buttons>
            </TitleContainer>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="댓글을 입력하세요..."
            />
          </ModalContainer>
        </ModalBackground>
      )}
    </>
  );
};

export default CommentModal;
