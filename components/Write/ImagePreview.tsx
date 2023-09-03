import Image from 'next/image';
import styled from 'styled-components';
import { Xmark } from '@/components/common/SVG';

interface ImagePreviewProps {
  images: File[];
  imageURLs: string[];
  removeImage: (index: number) => void;
}
const ImagePreviewList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  margin: 16px 0 0;
  /* justify-content: space-between; */
`;
const ImagePreviewItem = styled.div`
  width: 100%;
  padding-bottom: 100%;
  position: relative;
  /* border: solid 2px #fefefe; */

  cursor: pointer;
  /* transition: all 0.3s ease-in-out; */
  /* overflow: hidden; */
  &:hover {
    animation: HoverRotateAni 0.4s ease-in-out infinite;
    /* transform: rotate(20deg); */
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
    position: absolute;
    top: 0;
    left: 0;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  }
  .remove {
    width: 20px;
    height: 20px;
    border-radius: 10px;
    text-align: center;
    background-color: #f0efef;
    border: 2px solid #e8e8e8;
    position: absolute;
    top: -6px;
    right: -6px;
    overflow: hidden;
    svg {
      transform: translate(-2px, -2px);
    }
  }
  @keyframes HoverRotateAni {
    0% {
      transform: rotate(4deg);
    }
    50% {
      transform: rotate(-4deg);
    }
    100% {
      transform: rotate(4deg);
    }
  }
`;

const ImagePreview: React.FC<ImagePreviewProps> = ({
  images,
  imageURLs,
  removeImage,
}) => {
  return (
    <ImagePreviewList>
      {imageURLs.map((image, index) => (
        <ImagePreviewItem key={index + 1} onClick={() => removeImage(index)}>
          <Image
            src={image}
            alt={`Upload preview ${index + 2}`}
            width={50}
            height={50}
          />
          <span className="remove">
            <Xmark />
          </span>
        </ImagePreviewItem>
      ))}
    </ImagePreviewList>
  );
};

export default ImagePreview;
