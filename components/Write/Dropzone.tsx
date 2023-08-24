import { useDropzone } from 'react-dropzone';
import NextImage from 'next/image';
import { useCallback } from 'react';
import plus from '../../public/addImage.png';
import styled from 'styled-components';
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
  border: 2px solid #e8e8e8;
  border-radius: 12px;
  background-color: #f0efef;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  color: #334765;
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
  const resizeImage = (imageFile: File, callback: (file: File) => void) => {
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

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);

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

        callback(new File([blob], imageFile.name, { type: 'image/jpeg' }));
      };
    };
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length + images.length > MAX_IMAGES) {
        alert(`You can only upload ${MAX_IMAGES} images.`);
        return;
      }

      // 이미지 리사이징
      Promise.all(
        acceptedFiles.map((file) => {
          return new Promise<File>((resolve) => {
            resizeImage(file, (resizedFile) => {
              resolve(resizedFile);
            });
          });
        })
      ).then((resizedFiles) => {
        // 리사이징된 파일을 images와 imageURLs 상태에 추가
        setImages([...images, ...resizedFiles]);
        const newImageURLs = resizedFiles.map((file) =>
          URL.createObjectURL(file)
        );
        setImageURLs([...imageURLs, ...newImageURLs]);
      });
    },
    [images, imageURLs, setImages, setImageURLs]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
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
        <p className="bold">그렇지 이미지를 여기다가 드랍해</p>
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
  );
};

export default Dropzone;
