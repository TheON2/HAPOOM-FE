// hooks/useModal.ts
import { useState, ReactNode } from 'react';

interface ModalMessage {
  actionText: string;
  modalMessge: string;
  onClickEvent?: () => void;
}

const useModal = (): {
  isModalOpen: boolean;
  modalMessge: ModalMessage;
  openModal: (message: ModalMessage) => void;
  closeModal: () => void;
} => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<ModalMessage>({
    actionText: '',
    modalMessge: '',
    onClickEvent: undefined,
  });

  const openModal = (message: ModalMessage) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return {
    isModalOpen,
    modalMessge: modalMessage,
    openModal,
    closeModal,
  };
};

export default useModal;
