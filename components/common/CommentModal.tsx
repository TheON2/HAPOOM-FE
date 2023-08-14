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
  onClose?: () => void;
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
    console.log('Post comment:', comment);
    setComment('');
  };

  const handleUpdateComment = () => {
    console.log('Update comment:', comment);
    setComment('');
  };
  // const handlePostComment = async () => {
  //   try {
  //     const response = await fetch('YOUR_SERVER_API_ENDPOINT', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ comment }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to post comment');
  //     }

  //     // 서버로부터의 응답 처리 (예: 새로운 댓글 목록 가져오기)
  //     setIsOpen(false);
  //     setComment('');
  //   } catch (error) {
  //     console.error('Error posting comment:', error);
  //   }
  // };

  // const handleUpdateComment = async () => {
  //   try {
  //     const response = await fetch('YOUR_SERVER_API_ENDPOINT', {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ comment }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to update comment');
  //     }

  //     // 서버로부터의 응답 처리
  //     setIsOpen(false);
  //     setComment('');
  //   } catch (error) {
  //     console.error('Error updating comment:', error);
  //   }
  // };

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
