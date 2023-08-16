import {
  CancelButton,
  DeleteButton,
  ModalBackground,
  ModalButtons,
  ModalContainer,
  WarningContainer,
} from '@/styles/modal';
import React from 'react';
import ReactDOM from 'react-dom';
import { ModalWarning } from './SVG';

interface ModalProps {
  isOpen: boolean;
  action: 'delete' | 'edit';
  onClose: () => void;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  action,
  onConfirm,
}) => {
  const handleCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {isOpen &&
        ReactDOM.createPortal(
          <ModalBackground onClick={handleCloseModal}>
            <ModalContainer>
              <WarningContainer>
                <ModalWarning />
              </WarningContainer>
              <p className="modalTitle">
                해당 게시물을{' '}
                <span>{action === 'delete' ? '삭제' : '수정'}</span>
                하시겠습니까?
              </p>
              <ModalButtons>
                <CancelButton onClick={onClose}>취소</CancelButton>
                <DeleteButton onClick={onConfirm}>
                  {action === 'delete' ? '삭제' : '수정'}
                </DeleteButton>
              </ModalButtons>
            </ModalContainer>
          </ModalBackground>,
          document.getElementById('modal-root')
        )}
    </>
  );
};

export default Modal;
