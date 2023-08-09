import styled from 'styled-components';

interface PlayerWrapperProps {
  videoId: string | null;
}

export const PlayButton = styled.button`
  background: transparent;
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

export const Title = styled.div`
  width: 100%;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: white;
  padding: 5px;
  font-size: 16px;
`;

export const SeekSlider = styled.input`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  background: #444;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
  height: 5px;
  border-radius: 3px;
  margin: 5px 0;

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
  background-color: #333;
  color: white;
  padding: 10px;
`;

export const ControlGroup = styled.div`
  display: flex;
  align-items: center;
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 30px;
  top: 5px;
  background: transparent;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  display: none;
  &:hover {
    color: #ff0000;
  }
`;

export const PlayerWrapper = styled.div<PlayerWrapperProps>`
  position: relative;
  width: 600px;
  display: ${({ videoId }) =>
    videoId ? 'flex' : 'none'}; // videoId가 있으면 flex, 없으면 none
  flex-direction: column;
  align-items: center;
  background: #222;
  border-radius: 45px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  &:hover ${CloseButton} {
    display: block;
  }
  margin: 10px;
`;

export const PlayButtonGroup = styled(ControlGroup)`
  flex: 1; // 10%의 공간을 차지
`;

export const SeekSliderGroup = styled(ControlGroup)`
  flex: 7; // 70%의 공간을 차지
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
  color: white;
  padding: 5px;
  margin-top: 5px;
`;

export const TimeLabel = styled.span`
  color: white;
  font-size: 12px;
  margin: 0 5px;
`;
