import { useCallback, useState } from 'react';

interface TagProps {
  tag: string;
  onDelete: (tag: string) => void;
}

const Tag: React.FC<TagProps> = ({ tag, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseOver = useCallback(() => setIsHovered(true), []);
  const handleMouseOut = useCallback(() => setIsHovered(false), []);
  const color = isHovered ? 'red' : ' #0084ff';

  return (
    <div
      style={{
        color: color,
        cursor: 'pointer',
        display: 'inline-block',
        padding: '5px 10px', // 내부 패딩
        borderRadius: '20px', // 타원형 테두리
        border: '2px solid', // 테두리
        borderColor: color, // 테두리 색상
        textAlign: 'center',
      }}
      onClick={() => onDelete(tag)}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      #{tag}
    </div>
  );
};

export default Tag;
