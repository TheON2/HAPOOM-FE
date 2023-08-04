import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { useCallback } from 'react';
import plus from '../../public/addImage.png';

interface DropzoneProps {
  images: File[];
  setImages: (images: any) => void;
}

const MAX_IMAGES = 5;

const Dropzone: React.FC<DropzoneProps> = ({ images, setImages }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length + images.length > MAX_IMAGES) {
        alert(`You can only upload ${MAX_IMAGES} images.`);
        return;
      }
      setImages((prev: any) => [...prev, ...acceptedFiles]);
    },
    [images, setImages]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={{
        height: '200px',
        width: '600px',
        border: 'dashed 1px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <input {...getInputProps()} />
      {images[0] ? (
        <Image
          src={URL.createObjectURL(images[0])}
          alt={`Upload preview 1`}
          layout="fill"
          objectFit="contained"
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
