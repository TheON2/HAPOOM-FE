import { ModalBackground } from '@/styles/modal';
import Image from 'next/image';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const ZoomBackground = styled.div`
  width: 100%;
  height: 100vh;
  height: 100svh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  img {
    max-width: 768px;
    width: 90%;
    height: 90%;
    object-fit: contain;
    box-shadow: 0 0px 20px rgba(0, 0, 0, 0.2);
  }
`;

type Props = {
  imageUrl: string;
  closeZoomImage: () => void;
};

const ZoomImage = ({ imageUrl, closeZoomImage }: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const onClickBackground = () => {
    setIsOpen(false);
  };
  return (
    <>
      {isOpen &&
        ReactDOM.createPortal(
          <ZoomBackground onClick={closeZoomImage}>
            <Image
              src={imageUrl}
              alt={'zoom image'}
              width={768}
              height={800}
              quality={100}
            />
          </ZoomBackground>,
          document.getElementById('modal-root') as HTMLDivElement
        )}
    </>
  );
};

export default ZoomImage;
