import styled from 'styled-components';

interface PlayerWrapperProps {
  videoId: string | null;
}

export const PlayButton = styled.button`
  background: #349eff;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    color: #ffdd57;
  }
`;

export const VolumeSlider = styled.input`
  -webkit-appearance: none;
  appearance: none;
  width: 100px;
  background: #444;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
  height: 5px;
  border-radius: 3px;

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15px;
    height: 15px;
    background: #fff;
    cursor: pointer;
    border-radius: 50%;
  }

  &::-moz-range-thumb {
    width: 15px;
    height: 15px;
    background: #fff;
    cursor: pointer;
    border-radius: 50%;
  }
`;
export const PlayHeader = styled.div`
  width: 100%;
  padding: 8px 8px 20px;
  display: flex;
  align-items: center;
  background-color: #eff7ff;
  border: 2px solid #dfefff;
  border-radius: 30px 30px 0 0;
`;
export const TitleBox = styled.div`
  width: 100%;
  text-align: start;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #174172;
  padding: 5px;
  font-size: 16px;
`;

export const SeekSlider = styled.input`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  background: #2797ff;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
  height: 14px;
  /* border-radius: 3px; */
  /* margin: 5px 0; */

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15px;
    height: 15px;
    background: #fff;
    border: 1px solid #2797ff;
    cursor: pointer;
    border-radius: 50%;
  }

  &::-moz-range-thumb {
    width: 15px;
    height: 15px;
    background: #fff;
    cursor: pointer;
    border-radius: 50%;
  }
`;

export const VolumeControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #333;
  color: white;
  padding: 5px;
`;
export const PlayerControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  /* background-color: #eff7ff;
  border: 2px solid #dfefff; */
  /* border-radius: 30px; */
  color: white;
  /* padding: 10px; */
`;

export const ControlGroup = styled.div`
  display: flex;
  align-items: center;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: #174172;
  font-size: 20px;
  cursor: pointer;
`;

export const PlayerWrapper = styled.div<PlayerWrapperProps>`
  position: relative;
  width: 400px;
  display: ${({ videoId }) =>
    videoId ? 'flex' : 'none'}; // videoId가 있으면 flex, 없으면 none
  flex-direction: column;
  align-items: center;
  background: #222;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  &:hover ${CloseButton} {
    display: block;
  }
  margin: 15px 0;
`;

export const CustomPlayerWrapper = styled.div`
  position: relative;
  max-width: 360px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background: #0084ff; */
  border-radius: 12px;
  /* overflow: hidden; */
  /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); */
  &:hover ${CloseButton} {
    display: block;
  }
  /* margin: 10px; */
`;

export const PlayButtonGroup = styled(ControlGroup)`
  flex: 1; // 10%의 공간을 차지
`;

export const SeekSliderGroup = styled(ControlGroup)`
  flex: 7; // 70%의 공간을 차지
  position: relative;
`;

export const VolumeSliderGroup = styled(ControlGroup)`
  flex: 2; // 20%의 공간을 차지
`;

export const TimeControls = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const SeekControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #333;
  color: black;
  padding: 5px;
  margin-top: 5px;
`;

export const TimeLabel = styled.span`
  color: black;
  font-size: 12px;
  margin: 0 5px;
  position: absolute;
  &.end {
    right: 0;
  }
`;
