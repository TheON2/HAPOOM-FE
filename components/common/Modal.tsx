import {
  CancelButton,
  DeleteButton,
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
  actionText: string;
  onClickEvent: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  actionText,
  onClickEvent,
  children,
}) => {
  // const [isShow, setIsShow] = useState<boolean>(isOpen);
  const onClickCloseHandler = () => {
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
                <Button onClick={onClickCloseHandler}>취소</Button>
                <Button onClick={onClickEvent}>{actionText}</Button>
              </ModalButtons>
            </ModalContainer>
          </ModalBackground>,
          document.getElementById('modal-root') as HTMLDivElement
        )}
    </>
  );
};

export default Modal;
