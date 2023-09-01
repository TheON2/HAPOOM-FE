import { useDropzone } from 'react-dropzone';
import NextImage from 'next/image';
import { useCallback } from 'react';
import plus from '../../public/addImage.png';
import styled from 'styled-components';
import useModal from '@/hooks/useModal';
import Modal from '../common/Modal';
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
  border: var(--input-border);
  border-radius: 12px;
  background-color: var(--input-bg-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  color: var(--color);
  .bold {
    font-size: 20px;
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

  const resizeImage = (
    imageFile: File,
    callback: (file: File, size: number) => void
  ) => {
    // if (
    //   imageFile.type !== 'image/jpeg' &&
    //   imageFile.type !== 'image/png' &&
    //   imageFile.type !== 'image/JPEG' &&
    //   imageFile.type !== 'image/PNG' &&
    //   imageFile.type !== 'image/heic' &&
    //   imageFile.type !== 'image/HEIC'
    // ) {
    //   //alert('Only JPEG and PNG files are allowed.');
    //   openModal({
    //     actionText: '확인',
    //     modalMessge: 'JPEG / PNG 파일만 업로드 가능합니다.',
    //   });
    //   return;
    // }
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

        // 최대 너비와 높이 설정
        const maxWidth = 1920;
        const maxHeight = 1080;
        let width = img.width;
        let height = img.height;

        // 원본 비율 계산
        const originalRatio = width / height;

        // 최대 너비와 비율에 맞게 높이 조정
        if (width > maxWidth) {
          width = maxWidth;
          height = width / originalRatio;
        }

        // 최대 높이와 비율에 맞게 너비 조정
        if (height > maxHeight) {
          height = maxHeight;
          width = height * originalRatio;
        }

        canvas.width = width;
        canvas.height = height;
        if (ctx) {
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, width, height);
        }

        // JPEG 형식으로 base64 문자열로 변환, 품질은 0.8로 설정
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);

        // data URL을 Blob으로 변환
        const byteString = atob(dataUrl.split(',')[1]);
        const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeString });
        const size = blob.size;

        const newFileName = `${imageFile.name
          .split('.')
          .slice(0, -1)
          .join('.')}.jpg`;

        callback(new File([blob], newFileName, { type: 'image/jpg' }), size);
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
          return new Promise<{ resizedFile: File; size: number }>((resolve) => {
            resizeImage(file, (resizedFile, size) => {
              resolve({ resizedFile, size });
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
          console.log(
            `File Name: ${result.resizedFile.name}, Size: ${result.size} bytes`
          );
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
        {imageURLs[0] ? (
          <NextImage
            src={imageURLs[0]}
            alt={`Upload preview 1`}
            width={100}
            height={100}
            className="upload"
          />
        ) : isDragActive ? (
          <p className="bold">이미지를 드래그앤 드랍 해주세요.</p>
        ) : (
          <>
            <NextImage
              src={plus}
              alt={`Upload preview 1`}
              width={50}
              height={50}
            />
            <p className="bold">이미지 업로드</p>
            <p>jpg,png/5개 까지 업로드됩니다.</p>
          </>
        )}
      </DropContainer>
    </>
  );
};

export default Dropzone;
