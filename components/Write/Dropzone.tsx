import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
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
  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length + images.length > MAX_IMAGES) {
      alert(`You can only upload ${MAX_IMAGES} images.`);
      return;
    }
    setImages([...images, ...acceptedFiles]); // 기존 이미지와 새로 받은 이미지를 합칩니다.
    const newImageURLs = acceptedFiles.map((file) => URL.createObjectURL(file));
    setImageURLs([...imageURLs, ...newImageURLs]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <DropContainer {...getRootProps()}>
      <input {...getInputProps()} />
      {imageURLs[0] ? (
        <Image
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
          <Image src={plus} alt={`Upload preview 1`} width={50} height={50} />
          <p className="bold">이미지 업로드</p>
          <p>jpg,png/5개 까지 업로드됩니다.</p>
        </>
      )}
    </DropContainer>
  );
};

export default Dropzone;
