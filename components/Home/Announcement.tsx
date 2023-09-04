import React, { useEffect, useState } from 'react';
import { RandomText } from '@/styles/home';
const sentences = [
  '힘들고 지칠 땐 하늘을 바라봐요',
  '당신의 하늘을 공유해주세요',
  '하늘 사진이 아닌 경우 게시글이 삭제될 수 있습니다',
  '✨무한한 우주 속에서',
  '당신의 주옥 같은 피드백을 만나게 된 것은',
  '별들 사이의 우연이 아닐까요?',
  '당신의 소중한 말 한마디가 별빛처럼 저희를 밝히고',
  '더 넓은 하늘로 나아가게 합니다.',
  '또한 하늘의 별이 아물아물 빛나듯',
  '저희도 더 나은 모습으로 반짝일 것을 약속드립니다✨',
];
type AnnouncementProps = {
  $isClick?: any;
};
const Announcement = ({ $isClick }: AnnouncementProps) => {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number>(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSentenceIndex(
        (prevIndex) => (prevIndex + 1) % sentences.length
      );
    }, 8000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <RandomText $isClick={$isClick}>
      {sentences[currentSentenceIndex]}
    </RandomText>
  );
};

export default Announcement;
