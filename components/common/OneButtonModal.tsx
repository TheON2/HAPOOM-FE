import {
  ModalBackground,
  ModalButtons,
  ModalContainer,
  WarningContainer,
} from '@/styles/modal';
import React, { ReactNode, useState } from 'react';
import ReactDOM from 'react-dom';
import { ModalWarning } from './SVG';
import Button from '@/components/common/Button';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: any;
  children: ReactNode;
  onClickEvent?: (() => void) | null;
}

const OneButtonModal: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  children,
  onClickEvent,
}) => {
  const onClickCloseHandler = () => {
    if (onClickEvent) onClickEvent();
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen &&
        ReactDOM.createPortal(
          <ModalBackground onClick={onClickCloseHandler}>
            <ModalContainer>
              <WarningContainer>
                <ModalWarning />
              </WarningContainer>
              <p className="modalTitle">{children}</p>
              <ModalButtons>
                <Button onClick={onClickCloseHandler}>확인</Button>
              </ModalButtons>
            </ModalContainer>
          </ModalBackground>,
          document.getElementById('modal-root') as HTMLDivElement
        )}
    </>
  );
};

export default OneButtonModal;
