import {
  CancelButton,
  DeleteButton,
  ModalBackground,
  ModalButtons,
  ModalContainer,
} from '@/styles/modal';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {isOpen &&
        ReactDOM.createPortal(
          <ModalBackground onClick={handleCloseModal}>
            <ModalContainer>
              <div>해당 게시물을 삭제하시겠습니까?</div>
              <ModalButtons>
                <CancelButton
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  취소
                </CancelButton>
                <DeleteButton>삭제</DeleteButton>
              </ModalButtons>
            </ModalContainer>
          </ModalBackground>,
          document.getElementById('modal-root')
        )}
    </>
  );
};

export default Modal;
