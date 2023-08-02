import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { useCallback } from 'react';

interface DropzoneProps {
  images: string[];
  setImages: (images: string[]) => void;
}

const MAX_IMAGES = 5;

const Dropzone: React.FC<DropzoneProps> = ({ images, setImages }) => {
  const onDrop = useCallback(
    (acceptedFiles: any) => {
      let newImages: string[] = [];
      for (let file of acceptedFiles) {
        if (newImages.length >= MAX_IMAGES) {
          alert(`You can only upload ${MAX_IMAGES} images.`);
          setImages([]);
          return;
        }
        newImages.push(URL.createObjectURL(file));
      }
      setImages(newImages);
    },
    [setImages]
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
        position: 'relative', // position 속성을 추가해야 Image 컴포넌트를 절대 위치로 설정할 수 있습니다.
        overflow: 'hidden', // 컨테이너를 벗어나는 이미지 부분을 숨깁니다.
      }}
    >
      <input {...getInputProps()} />
      {images[0] ? (
        <Image
          src={images[0]}
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
        <h1>이미지를 여따가 올려라 인마</h1>
      )}
    </div>
  );
};

export default Dropzone;
