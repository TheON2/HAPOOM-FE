import { ImageContainer } from '@/styles/write';
import React from 'react';
import Form from 'react-bootstrap/Form';

interface MusicSelectorProps {
  musicURL: string;
  setMusicURL: (url: string) => void;
}

const MusicSelector: React.FC<MusicSelectorProps> = ({
  musicURL,
  setMusicURL,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setMusicURL(value);
  };

  return (
    <>
      <Form.Select
        aria-label="Select NCS MUSIC"
        onChange={handleChange}
        value={musicURL}
      >
        <option>Select NCS MUSIC</option>
        <option value="1">
          1.Alan Walker - Dreamer (BEAUZ & Heleen Remix)
        </option>
        <option value="2">
          2.Arcando & Maazel - To Be Loved (feat. Salvo)
        </option>
        <option value="3">3.AX.EL - In Love With a Ghost</option>
        <option value="4">4.Idle Days - Over It</option>
        <option value="5">5.ROY KNOX - Closer</option>
      </Form.Select>
    </>
  );
};

export default MusicSelector;
