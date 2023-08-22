import { ImageContainer } from '@/styles/write';
import React from 'react';
import Form from 'react-bootstrap/Form';

const musicOptions = [
  {
    name: 'Alan Walker - Dreamer (BEAUZ & Heleen Remix)',
    url: 'https://hapoomimagebucket.s3.ap-northeast-2.amazonaws.com/publicMusic/1.Alan+Walker+-+Dreamer+(BEAUZ+%26+Heleen+Remix)+%5BNCS+Release%5D.webm',
  },
  {
    name: 'Arcando & Maazel - To Be Loved (feat. Salvo)',
    url: 'https://hapoomimagebucket.s3.ap-northeast-2.amazonaws.com/publicMusic/2.Arcando+%26+Maazel+-+To+Be+Loved+(feat.+Salvo)+%5BNCS+Release%5D.webm',
  },
  {
    name: 'AX.EL - In Love With a Ghost',
    url: 'https://hapoomimagebucket.s3.ap-northeast-2.amazonaws.com/publicMusic/3.AX.EL+-+In+Love+With+a+Ghost+%5BNCS+Release%5D.webm',
  },
  {
    name: 'Idle Days - Over It',
    url: 'https://hapoomimagebucket.s3.ap-northeast-2.amazonaws.com/publicMusic/4.Idle+Days+-+Over+It+%5BNCS+Release%5D.webm',
  },
  {
    name: 'ROY KNOX - Closer',
    url: 'https://hapoomimagebucket.s3.ap-northeast-2.amazonaws.com/publicMusic/5.ROY+KNOX+-+Closer+%5BNCS+Release%5D.webm',
  },
];

interface MusicSelectorProps {
  musicURL: string | undefined;
  setMusicURL: (url: string) => void;
  setIsShow: (state: boolean) => void;
  setSelectedTitle: React.Dispatch<React.SetStateAction<string>>;
  setAudioSubmit: React.Dispatch<React.SetStateAction<boolean>>;
}

const MusicSelector: React.FC<MusicSelectorProps> = ({
  musicURL,
  setMusicURL,
  setIsShow,
  setSelectedTitle,
  setAudioSubmit,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = e.target.selectedIndex; // 옵션 인덱스에서 1을 뺀다. (첫 번째 옵션을 고려)
    const selectedOption = musicOptions[selectedIndex];
    setMusicURL(selectedOption.url);
    setSelectedTitle(selectedOption.name); // 현재 선택된 음악의 이름을 설정
    setAudioSubmit(true);
  };

  return (
    <>
      <Form.Select
        aria-label="Select NCS MUSIC"
        onChange={handleChange}
        value={musicURL}
      >
        {musicOptions.map((option, index) => (
          <option key={index} value={option.url}>
            {index + 1}.{option.name}
          </option>
        ))}
      </Form.Select>
    </>
  );
};

export default MusicSelector;
