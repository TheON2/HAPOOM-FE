import { useDropzone } from 'react-dropzone';
import NextImage from 'next/image';
import { useCallback } from 'react';
import styled from 'styled-components';
import useModal from '@/hooks/useModal';
import Modal from '../common/Modal';
import { DropzoneIcon } from '../common/SVG';

interface DropzoneProps {
  images: File[];
  setImages: (images: any) => void;
  imageURLs: string[];
  setImageURLs: (imageURLs: any) => void;
}

const MAX_IMAGES = 5;

const DropContainer = styled.div`
  height: 200px;
  width: 100%;
  padding: 12px;
  border: 2px dashed var(--primary-color);
  /* border-radius: 12px; */
  /* background-color: var(--input-bg-color); */
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  color: var(--color);
  text-align: center;
  font-size: 8px;
  .bold {
    font-size: 16px;
    font-weight: 700;
    margin: 12px 0 8px;
  }
  img.upload {
    position: absolute;
    width: auto;
    height: 90%;
    object-fit: contain;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
`;

const Dropzone: React.FC<DropzoneProps> = ({
  images,
  setImages,
  imageURLs,
  setImageURLs,
}) => {
  const { isModalOpen, modalMessge, openModal, closeModal } = useModal();

  const resizeImage = (imageFile: File, callback: (file: File) => void) => {
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = (event) => {
      const img = new window.Image();
      if (typeof reader.result === 'string') {
        img.src = reader.result;
      }
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        if (ctx) {
          ctx.drawImage(img, 0, 0);
        }

        let quality = 0.8; // start with 0.8
        let dataUrl;

        // Keep reducing quality until the size is below 5MB or quality goes too low
        do {
          dataUrl = canvas.toDataURL('image/jpeg', quality);
          quality -= 0.1;
        } while (dataUrl.length * 0.75 > MAX_SIZE && quality > 0.2);

        if (dataUrl.length * 0.75 > MAX_SIZE) {
          // If the size is still above 5MB after all reductions, return an error or handle as you wish
          openModal({
            actionText: '확인',
            modalMessge: '이미지 크기를 5MB 미만으로 줄일 수 없습니다.',
          });
          return;
        }

        const byteString = atob(dataUrl.split(',')[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: 'image/jpeg' });

        const newFileName = `${imageFile.name
          .split('.')
          .slice(0, -1)
          .join('.')}.jpg`;
        callback(new File([blob], newFileName, { type: 'image/jpg' }));
      };
    };
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length + images.length > MAX_IMAGES) {
        openModal({
          actionText: '확인',
          modalMessge: '업로드 이미지는 최대 5장 입니다.',
        });
        return;
      }

      // 이미지 리사이징
      Promise.all(
        acceptedFiles.map((file) => {
          return new Promise<{ resizedFile: File }>((resolve) => {
            resizeImage(file, (resizedFile) => {
              resolve({ resizedFile });
            });
          });
        })
      ).then((results) => {
        // 리사이징된 파일을 images와 imageURLs 상태에 추가
        setImages([...images, ...results.map((result) => result.resizedFile)]);
        const newImageURLs = results.map((result) =>
          URL.createObjectURL(result.resizedFile)
        );
        setImageURLs([...imageURLs, ...newImageURLs]);

        // 각 파일의 크기 출력
        results.forEach((result) => {
          console.log(`File Name: ${result.resizedFile.name}`);
        });
      });
    },
    [images, imageURLs, setImages, setImageURLs]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          setIsOpen={closeModal}
          actionText={modalMessge.actionText}
          onClickEvent={modalMessge.onClickEvent || null}
        >
          {modalMessge.modalMessge}
        </Modal>
      )}
      <DropContainer {...getRootProps()}>
        <input {...getInputProps()} />
        {imageURLs[4] ? (
          <>
            <NextImage
              src={imageURLs[0]}
              alt={`Upload preview 1`}
              width={100}
              height={100}
              className="upload"
            />
          </>
        ) : isDragActive ? (
          <>
            <DropzoneIcon />
            <p className="bold">이미지를 드래그앤 드랍 해주세요.</p>
          </>
        ) : imageURLs[0] ? (
          <>
            <DropzoneIcon />
            <p className="bold">이미지를 추가로 등록할 수 있습니다.</p>
            <p>
              jpg,png 형식의 파일로 <br /> 5개까지 업로드 하실 수 있습니다.
            </p>
          </>
        ) : (
          <>
            <DropzoneIcon />
            <p className="bold">이미지 업로드</p>
            <p>
              jpg,png 형식의 파일로 <br /> 5개까지 업로드 하실 수 있습니다.
            </p>
          </>
        )}
      </DropContainer>
    </>
  );
};

export default Dropzone;
