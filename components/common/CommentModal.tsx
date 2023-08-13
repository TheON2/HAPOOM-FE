import React, { useState } from 'react';
import {
  Buttons,
  CancelButton,
  ConfirmButton,
  Content,
  ModalBackground,
  ModalContainer,
  Title,
} from '@/styles/commentModal';

const TextModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState('');

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <button onClick={handleOpenModal}>모달 열기</button>

      {isOpen && (
        <ModalBackground onClick={handleCloseModal}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <Title>댓글 입력</Title>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="댓글을 입력하세요..."
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
            <Buttons>
              <CancelButton
                onClick={() => {
                  setIsOpen(false);
                  setComment(''); // 댓글 초기화
                }}
              >
                닫기
              </CancelButton>
              <ConfirmButton>올리기</ConfirmButton>
            </Buttons>
          </ModalContainer>
        </ModalBackground>
      )}
    </>
  );
};

export default TextModal;
