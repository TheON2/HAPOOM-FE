import Image from 'next/image';
import { useCallback, useState } from 'react';

interface ImagePreviewProps {
  images: File[];
  imageURLs: string[];
  removeImage: (index: number) => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  images,
  imageURLs,
  removeImage,
}) => {
  const [isMouseOver, setIsMouseOver] = useState<{ [key: number]: boolean }>(
    {}
  );

  const handleMouseOver = useCallback(
    (index: number) => {
      setIsMouseOver((prev) => ({ ...prev, [index]: true }));
    },
    [setIsMouseOver]
  );

  const handleMouseOut = useCallback(
    (index: number) => {
      setIsMouseOver((prev) => ({ ...prev, [index]: false }));
    },
    [setIsMouseOver]
  );

  return (
    <>
      {imageURLs.map((image, index) => (
        <div
          key={index + 1}
          style={{ position: 'relative', border: 'solid 1px', margin: '10px' }}
          onClick={() => removeImage(index)}
          onMouseOver={() => handleMouseOver(index)}
          onMouseOut={() => handleMouseOut(index)}
        >
          <Image
            src={image}
            alt={`Upload preview ${index + 2}`}
            width={50}
            height={50}
          />
          {isMouseOver[index] && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <p>Click to remove</p>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default ImagePreview;
