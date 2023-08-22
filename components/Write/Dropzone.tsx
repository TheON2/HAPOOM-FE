import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { useCallback } from 'react';
import plus from '../../public/addImage.png';

interface DropzoneProps {
  images: File[];
  setImages: (images: any) => void;
  imageURLs: string[];
  setImageURLs: (imageURLs: any) => void;
}

const MAX_IMAGES = 5;

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
    <div
      {...getRootProps()}
      style={{
        height: '200px',
        width: '400px',
        border: ' #0084ff dashed 2px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <input {...getInputProps()} />
      {imageURLs[0] ? (
        <Image
          src={imageURLs[0]}
          alt={`Upload preview 1`}
          width={100}
          height={100}
          style={{
            position: 'absolute',
          }}
        />
      ) : isDragActive ? (
        <h1>그렇지 이미지를 여기다가 드랍해</h1>
      ) : (
        <>
          <Image src={plus} alt={`Upload preview 1`} width={50} height={50} />
          <h1>이미지 업로드</h1>
          <h4>jpg,png/5개 까지 업로드됩니다.</h4>
        </>
      )}
    </div>
  );
};

export default Dropzone;
