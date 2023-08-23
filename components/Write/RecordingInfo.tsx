import { ImageContainer } from '@/styles/write';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { styled } from 'styled-components';

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

// const MusicSelector: React.FC<MusicSelectorProps> = ({
//   musicURL,
//   setMusicURL,
//   setIsShow,
//   setSelectedTitle,
//   setAudioSubmit,
// }) => {
//   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedIndex = e.target.selectedIndex; // 옵션 인덱스에서 1을 뺀다. (첫 번째 옵션을 고려)
//     const selectedOption = musicOptions[selectedIndex];
//     setMusicURL(selectedOption.url);
//     setSelectedTitle(selectedOption.name); // 현재 선택된 음악의 이름을 설정
//     setAudioSubmit(true);
//   };

//   return (
//     <>
//       <Form.Select
//         aria-label="Select NCS MUSIC"
//         onChange={handleChange}
//         value={musicURL}
//       >
//         {musicOptions.map((option, index) => (
//           <option key={index} value={option.url}>
//             {index + 1}.{option.name}
//           </option>
//         ))}
//       </Form.Select>
//     </>
//   );
// };

// type selectProps = {
//   selectOption: { value: string; text: string }[];
//   setOption: any;
// };

export const Selecter = ({
  musicURL,
  setMusicURL,
  setAudioSubmit,
  setSelectedTitle,
}: MusicSelectorProps) => {
  const [isShow, setIsShow] = useState(true);
  const [selectText, setSelectText] = useState(musicOptions[0].name);

  const SelectClick = () => {
    setIsShow(!isShow);
  };

  const OptionClick = (value: string, url: string) => {
    setSelectText(value);
    setIsShow(!isShow);
    // setOption(value);
    setSelectedTitle(value); // 현재 선택된 음악의 이름을 설정
    setMusicURL(url);
    setAudioSubmit(true);
  };

  return (
    <SelectBox $show={isShow}>
      <SelectBarButton
        type="button"
        onClick={SelectClick}
        aria-label="Select NCS MUSIC"
      >
        {selectText}
      </SelectBarButton>
      {isShow && (
        <SelectList>
          {musicOptions.map((option, idx) => {
            return (
              <SelectItem
                key={idx}
                value={option.name}
                onClick={() => OptionClick(option.name, option.url)}
              >
                {idx + 1}.{option.name}
              </SelectItem>
            );
          })}
        </SelectList>
      )}
    </SelectBox>
  );
};

const WIDTH = '100%';

const SelectBarButton = styled.button`
  /* width: 250px; */
  width: ${WIDTH};
  height: 40px;
  padding: 0px 16px;
  background-color: #e8eef3;
  border: none;
  border-radius: 8px 8px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* gap: 16px; */
  color: #1b3255;
  font-size: 14px;
  font-weight: 700;
  transition: all 0.3s ease-in-out;

  svg {
    transform: scale(0.8) rotate(90deg);
    path {
      fill: #fff;
    }
  }
  &:hover {
    background-color: #efefef;
  }
`;
const SelectList = styled.ul`
  width: ${WIDTH};
  /* border: 2px solid #e8eef3; */
  /* border-radius: 0 0 8px 8px; */
`;
const SelectItem = styled.li`
  width: 100%;
  /* height: 40px; */
  padding: 12px 16px;
  /* border-radius: 8px; */
  color: #777;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  background-color: #fff;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #f3f9ff;
  }
`;

type Props = {
  $show: boolean;
};

const SelectBox = styled.div<Props>`
  width: ${WIDTH};
  height: ${(props) => (props.$show ? 'calc(40px * 6)' : '40px')};
  margin-top: 12px;
  /* background-color: #f0efef; */
  border-radius: ${(props) => (props.$show ? '15px' : '20px')};
  border-radius: 8px;
  overflow: hidden;
  position: absolute;
  z-index: 14;
  transition: all 0.3s ease-in-out;
  border-left: 2px solid #e8eef3;
  border-right: 2px solid #e8eef3;
  border-bottom: 2px solid #e8eef3;
  /* top: 4px; */
  /* left: 12px; */
  /* transform: translateY(-50%); */
`;

export default Selecter;
