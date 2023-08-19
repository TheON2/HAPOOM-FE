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
  actionText: string;
  onClickEvent: () => void | null;
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
                {onClickEvent !== null ? (
                  <>
                    <Button className="secondary" onClick={onClickCloseHandler}>
                      취소
                    </Button>
                    <Button onClick={onClickEvent}>{actionText}</Button>
                  </>
                ) : (
                  <Button onClick={onClickCloseHandler}>확인</Button>
                )}
              </ModalButtons>
            </ModalContainer>
          </ModalBackground>,
          document.getElementById('modal-root') as HTMLDivElement
        )}
    </>
  );
};

export default Modal;
